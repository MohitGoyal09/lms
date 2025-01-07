"use client";
import Selectoption from "@/components/create/Selectoption";
import TopicInput from "@/components/create/TopicInput";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import Link from "next/link";

export default function Create() {
  const { user } = useUser();
  const router = useRouter();
  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState({
    studyType: "",
    topic: "",
    difficulty: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [userStatus, setUserStatus] = useState({
    isMember: false,
    courseCount: 0,
    isLoading: true
  });

  // Check user status on component mount
  useEffect(() => {
    const checkUserStatus = async () => {
      if (!user?.primaryEmailAddress?.emailAddress) {
        setUserStatus(prev => ({ ...prev, isLoading: false }));
        return;
      }

      try {
        // Get user membership status
        const email = user.primaryEmailAddress.emailAddress;
        const [membershipResponse, coursesResponse] = await Promise.all([
          axios.post("/api/user", { email }),
          axios.post("/api/courses", { createdBy: email })
        ]);

        const isMember = membershipResponse.data?.isMember || false;
        const courseCount = coursesResponse.data?.result?.length || 0;

        console.log("User status:", { isMember, courseCount });

        setUserStatus({
          isMember,
          courseCount,
          isLoading: false
        });

        // Redirect if limit reached
        if (!isMember && courseCount >= 5) {
          toast.error("You've reached the free plan limit. Please upgrade to continue.");
          router.push("/dashboard/upgrade");
        }
      } catch (error) {
        console.error("Error checking user status:", error);
        setUserStatus(prev => ({ ...prev, isLoading: false }));
        toast.error("Failed to check user status");
      }
    };

    checkUserStatus();
  }, [user, router]);

  const handleUserInput = (field: string, value: string) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const GenerateCourseOutline = async () => {
    // Double check the limit before generating
    if (!userStatus.isMember && userStatus.courseCount >= 5) {
      toast.error("You've reached the free plan limit. Please upgrade to continue.");
      router.push("/dashboard/upgrade");
      return;
    }

    try {
      const courseId = uuidv4();
      setLoading(true);

      await axios.post("/api/generate-course-outline", {
        courseId,
        ...form,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });

      router.replace(`/dashboard`);
      toast.success("Your Course Content is Generating");
    } catch (error) {
      console.error("Error generating course:", error);
      toast.error("Failed to generate course");
    } finally {
      setLoading(false);
    }
  };

  if (userStatus.isLoading) {
    return (
      <>
        <DashboardHeader />
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Checking account status...</p>
          </div>
        </div>
      </>
    );
  }

  // Show upgrade message if limit reached
  if (!userStatus.isMember && userStatus.courseCount >= 5) {
    return (
      <>
        <DashboardHeader />
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-5">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                You've Reached the Free Plan Limit
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                You've created {userStatus.courseCount} courses, which is the maximum allowed on the free plan.
                Upgrade to Pro to create unlimited courses and unlock more features!
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-xl">
              <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
                Pro Plan Benefits
              </h2>
              <ul className="space-y-3 text-left">
                <li className="flex items-center gap-2">
                  <Sparkle className="w-5 h-5 text-indigo-500" />
                  <span>Unlimited Course Generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Sparkle className="w-5 h-5 text-indigo-500" />
                  <span>Advanced Course Templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Sparkle className="w-5 h-5 text-indigo-500" />
                  <span>Priority Support</span>
                </li>
              </ul>
            </div>

            <Link href="/dashboard/upgrade">
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-6 rounded-full text-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                Upgrade to Pro
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <DashboardHeader />
      <div className="p-5 flex flex-col items-center md:px-24 lg:px-36 mt-20">
        <h2 className="font-bold text-3xl text-blue-600">
          Start Building Your Personal Study Material
        </h2>
        <p className="text-gray-500 ">
          Fill the details in order to generate study material for you
        </p>
        <div className="mt-10">
          {step === 0 ? (
            <Selectoption
              selectedStudyType={form.studyType}
              onSelect={(value) => handleUserInput("studyType", value)}
            />
          ) : (
            <div className="mt-10">
              <TopicInput
                setTopic={(value) => handleUserInput("topic", value)}
                setDifficulty={(value) => handleUserInput("difficulty", value)}
              />
            </div>
          )}
        </div>
        <div className="flex flex-row justify-between mt-10 items-center w-full ">
          <Button
            variant="outline"
            className="hover:bg-blue-50"
            disabled={step === 0}
            onClick={() => setStep((prev) => prev - 1)}
          >
            Previous
          </Button>
          {step === 0 ? (
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setStep((prev) => prev + 1)}
            >
              Next
            </Button>
          ) : (
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={GenerateCourseOutline}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Sparkle />
                  Generate
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

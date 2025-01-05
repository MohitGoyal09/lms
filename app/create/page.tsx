"use client";
import Selectoption from "@/components/create/Selectoption";
import TopicInput from "@/components/create/TopicInput";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";

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
  const handleUserInput = (field: string, value: string) => {
    setForm({
      ...form,
      [field]: value,
    });
    console.log(form);
  };

  const GenerateCourseOutline = async () => {
    const courseId = uuidv4();
    setLoading(true);
    const result = await axios.post("/api/generate-course-outline", {
      courseId,
      ...form,
      createdBy: user?.primaryEmailAddress?.emailAddress,
    });
    setLoading(false);
    router.replace(`/dashboard`);
    toast("Your Course Content is Generating");

    console.log(result.data);
  };

  return (
    <>
      {" "}
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

import { BookOpen, FileQuestion, Layers, ListChecks } from "lucide-react";
import React, { useEffect } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Course } from "@/Types/course";
import { toast } from "sonner";

export default function StudyMaterial({
  courseId,
  course,
}: {
  courseId: string;
  course: Course;
}) {
  const [studyTypeContent, setStudyTypeContent] = React.useState<
    Record<string, unknown>
  >({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const GenerateContent = async (type: string) => {
    try {
      setLoading(true);
      toast('Generating content, please wait...');
      setError(null);

      const chapters = course?.courseLayout.chapters.map((chapter) => ({
        title: chapter.chapter_title,
        content: chapter.topics,
      }));

      const result = await axios.post("/api/study-type-content", {
        courseId: course.courseId,
        type,
        chapters,
      });
      
      setStudyTypeContent((prev) => ({
        ...prev,
        [type]: result.data,
      }));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate content"
      );
    } finally {
      setLoading(false);
      toast('Content generated successfully');
    }
  };
  useEffect(() => {
    GetStudyMaterial();
  }, [courseId]);

  const MaterialList = [
    {
      name: "Notes",
      desc: "Chapter wise notes",
      icon: BookOpen,
      path: "/notes",
      type: "notes",
    },
    {
      name: "Flashcards",
      desc: "Chapter wise flashcards",
      icon: Layers,
      path: "/flashcards",
      type: "flashcards",
    },
    {
      name: "Quizzes",
      desc: "Chapter wise quizzes",
      icon: ListChecks,
      path: "/quizzes",
      type: "quizzes",
    },
    {
      name: "QA",
      desc: "Chapter wise QA",
      icon: FileQuestion,
      path: "/qa",
      type: "practice-questions",
    },
  ];

  const GetStudyMaterial = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await axios.post("/api/study-type", {
        courseId,
        studyType: "ALL",
      });
      setStudyTypeContent(result.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || error.message);
      } else {
        setError("Unexpected error occurred.");
      }
    }
  };

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-12 w-12 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-6 text-red-500">
        <div className="bg-red-100 dark:bg-red-900/20 rounded-lg p-4">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {MaterialList.map((item) => {
        const isAvailable =
          studyTypeContent[item.type] !== null &&
          studyTypeContent[item.type] !== undefined;
        return isAvailable ? (
          <Link href={`/course/${courseId}${item.path}`} key={item.type}>
            <Card className="transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:shadow-lg hover:scale-105">
              <CardHeader className="space-y-4">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-xl">{item.name}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {item.desc}
                  </CardDescription>
                </div>
                <Button className="w-full mt-2" variant="outline">
                  View
                </Button>
              </CardHeader>
            </Card>
          </Link>
        ) : (
          <Card
            key={item.type}
            className="opacity-70 bg-gray-50 dark:bg-gray-800"
          >
            <CardHeader className="space-y-4">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-xl">{item.name}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {item.desc}
                </CardDescription>
              </div>
              <Button
                className="w-full mt-2"
                variant="outline"
                onClick={() => GenerateContent(item.type)}
              >
                Generate
              </Button>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}

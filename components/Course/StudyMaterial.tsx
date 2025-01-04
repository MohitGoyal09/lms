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

export default function StudyMaterial({ courseId }: { courseId: string }) {
  const [studyTypeContent, setStudyTypeContent] = React.useState<Record<string, unknown>>({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

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
      desc: "Chapter wise practice questions",
      icon: FileQuestion,
      path: "/practice-questions",
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {MaterialList.map((item) => {
        const isAvailable = studyTypeContent[item.type] !== null && studyTypeContent[item.type] !== undefined;
        return isAvailable ? (
          <Link href={`/course/${courseId}${item.path}`} key={item.type}>
            <Card className="transition-all duration-300 hover:bg-slate-100 hover:shadow-lg hover:scale-105">
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
                  View {item.name}
                </Button>
              </CardHeader>
            </Card>
          </Link>
        ) : (
          <Card
            key={item.type}
            className="opacity-70 bg-gray-50 "
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
              <Button className="w-full mt-2" variant="outline" >
                Generate {item.name}
              </Button>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}

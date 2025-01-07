"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";

interface QAPair {
  question: string;
  answer: string;
}

interface ApiResponse {
  id: number;
  courseId: string;
  content: QAPair[];
  type: string;
  status: string;
}

export default function Qa() {
  const { courseId } = useParams();
  const [qaPairs, setQaPairs] = useState<QAPair[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchQA();
  }, [courseId]);

  const fetchQA = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "qa",
      });
      const data = result.data as ApiResponse;
      setQaPairs(data.content || []);
    } catch (error) {
      console.error("Error fetching Q&A:", error);
      setError("Failed to load Q&A content. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(qaPairs.length / itemsPerPage);
  const currentItems = qaPairs.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="w-full">
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (qaPairs.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Content</AlertTitle>
          <AlertDescription>
            No Q&A content is available for this course yet.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center mb-8">
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          ← Back to Course
        </Button>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 dark:text-white">
          Questions & Answers
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Page {currentPage + 1} of {totalPages}
        </p>
      </div>

      <div className="space-y-6">
        {currentItems.map((qa, index) => (
          <Card
            key={index}
            className="w-full transition-all duration-300 hover:shadow-lg dark:border-gray-700"
          >
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold dark:text-white">
                  Q: {qa.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                  A: {qa.answer}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-8">
        <Button
          variant="outline"
          onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
          disabled={currentPage === 0}
          className="dark:border-gray-700"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
          }
          disabled={currentPage === totalPages - 1}
          className="dark:border-gray-700"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

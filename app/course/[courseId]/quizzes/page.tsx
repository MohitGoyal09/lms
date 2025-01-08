"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Quiz, ApiResponse } from "@/Types/quiz";
import { toast } from "sonner";

export default function Quiz() {
  const { courseId } = useParams();
  const [quiz, setQuiz] = React.useState<Quiz[]>([]);

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [currentQuiz, setCurrentQuiz] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(
    null
  );
  const [correctAnswer, setCorrectAnswer] = React.useState<boolean | null>(
    null
  );

  useEffect(() => {
    GetQuiz();
    toast(
      "Please keep refreshing the page to see the changes while content is generating"
    );
  }, [courseId]);

  const GetQuiz = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "quizzes",
      });
      const data = result.data as ApiResponse;
      const quizKey = Object.keys(data.content)[0];
      const quizData = data.content[quizKey];
      if (Array.isArray(quizData)) {
        const validQuiz = quizData.filter(
          (q) =>
            typeof q === "object" &&
            q !== null &&
            "question" in q &&
            "options" in q &&
            "correctAnswer" in q
        );
        setQuiz(validQuiz as Quiz[]);
        
      } else {
        setError("Invalid quiz data received from API.");
      }
    } catch (error) {
      console.error("Error fetching quiz:", error);
      setError("Error fetching quiz.");
    } finally {
      setLoading(false);
    }
  };

  const checkAnswer = (selectedOption: string, correctAnswer: string) => {
    setSelectedAnswer(selectedOption);

    if (selectedOption === correctAnswer) {
      setCorrectAnswer(true);
    } else {
      setCorrectAnswer(false);
    }
  };
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-8 space-y-8">
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-10 w-24" />
        </div>
        
        <div className="text-center mb-8">
          <Skeleton className="h-8 w-48 mx-auto mb-4" /> 
          <Skeleton className="h-2 w-full rounded-full mb-2" /> 
          <Skeleton className="h-4 w-32 mx-auto" /> 
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <Skeleton className="h-6 w-full mb-6" /> 
          <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-14 w-full rounded-lg" /> 
        ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="p-4 bg-red-50 text-red-600 rounded-lg shadow">
          Error: {error}
        </div>
      </div>
    );
  }

  if (quiz.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="p-6 bg-gray-50 text-gray-600 rounded-lg shadow">
          No quiz questions available.
        </div>
      </div>
    );
  }

  const currentQuestion = quiz[currentQuiz];

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-8">
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
          Test your Learning
        </h1>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
          <div
            className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuiz + 1) / quiz.length) * 100}%` }}
          />
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Question {currentQuiz + 1} of {quiz.length}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <p className="text-xl font-semibold mb-6 dark:text-white">
          {currentQuestion.question}
        </p>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200
                            ${
                              selectedAnswer === option
                                ? correctAnswer
                                  ? "border-green-500 bg-green-50 dark:bg-green-900/30 dark:border-green-400"
                                  : "border-red-500 bg-red-50 dark:bg-red-900/30 dark:border-red-400"
                                : "border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 dark:text-white"
                            }`}
              onClick={() => checkAnswer(option, currentQuestion.correctAnswer)}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {selectedAnswer && correctAnswer !== null && (
        <div className="animate-fadeIn">
          {correctAnswer ? (
            <Alert className="border-2 border-green-500 bg-green-50 dark:bg-green-900/30 dark:border-green-400">
              <AlertTitle className="text-green-700 dark:text-green-400 font-semibold">
                Excellent! 🎉
              </AlertTitle>
              <AlertDescription className="text-green-600 dark:text-green-300">
                Great job on selecting the correct answer!
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="border-2 border-red-500 bg-red-50 dark:bg-red-900/30 dark:border-red-400">
              <AlertTitle className="text-red-700 dark:text-red-400 font-semibold">
                Not Quite Right
              </AlertTitle>
              <AlertDescription className="text-red-600 dark:text-red-300">
                <span className="block mb-2">
                  The correct answer is:{" "}
                  <span className="font-medium">
                    {currentQuestion.correctAnswer}
                  </span>
                </span>
                Keep going, you've got this!
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button
          className="transition-all duration-200"
          disabled={currentQuiz === 0}
          onClick={() => {
            setCurrentQuiz((prev) => prev - 1);
            setSelectedAnswer(null);
            setCorrectAnswer(null);
          }}
          variant="outline"
        >
          ← Previous
        </Button>
        <Button
          className="transition-all duration-200"
          disabled={currentQuiz === quiz.length - 1}
          onClick={() => {
            setCurrentQuiz((prev) => prev + 1);
            setSelectedAnswer(null);
            setCorrectAnswer(null);
          }}
          variant="default"
        >
          Next →
        </Button>
      </div>
    </div>
  );
}

"use client";
import { useParams } from "next/navigation";
import FlashCardflip from "@/components/Course/FlashCardflip";
import axios from "axios";
import { toast } from "sonner";
import React, { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
interface Flashcard {
  front: string;
  back: string;
}
interface ApiResponse {
  id: number;
  courseId: string;
  content: {
    [key: string]: any[];
  };
  type: string;
  status: string;
}

export default function Flashcards() {
  const { courseId } = useParams();
 const [flashcards, setFlashcards] = React.useState<Flashcard[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [currentFlashcard, setCurrentFlashcard] = React.useState(0);
  
  useEffect(() => {
    GetFlashcards();
    toast("Please keep refreshing the page to see the changes while content is generating" )
  }, [courseId]);
  const GetFlashcards = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "flashcards",
      });
      const data = result.data as ApiResponse;
      const flashcardsKey = Object.keys(data.content)[0];
      const flashcardsData = data.content[flashcardsKey];
      if (Array.isArray(flashcardsData)) {
        const validFlashcards = flashcardsData.filter(
          (fc) =>
            typeof fc === "object" &&
            fc !== null &&
            "front" in fc &&
            "back" in fc
        );
        setFlashcards(validFlashcards as Flashcard[]);
      } else {
        setError("Invalid flashcards data received from API.");
      }
    } catch (error) {
      console.error("Error fetching flashcards:", error);
      setError("Error fetching flashcards.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="flex justify-between items-center mb-12">
      <Link
        href={`/course/${courseId}`}
        className="flex items-center px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:opacity-90 transition-all duration-200 shadow-md hover:translate-x-[-4px]"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Back to Course
      </Link>
      <div className="text-center flex-grow">
        <h2 className="text-5xl font-bold mb-4  bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
        Flashcards
        </h2>
        <p className="text-gray-600 text-xl font-medium">
        The Ultimate Tool to Lock in Concepts!
        </p>
      </div>
      <div className="w-[100px]"></div>
      </div>

      {loading ? (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
      </div>
      ) : error ? (
      <div className="text-red-500 text-center p-6 bg-red-50 rounded-xl shadow-lg max-w-2xl mx-auto">
        {error}
      </div>
      ) : (
      <div className="max-w-4xl mx-auto">
        <Carousel
        className="w-full"
        opts={{
          startIndex: currentFlashcard
        }}
        >
        <CarouselContent>
          {flashcards.map((flashcard, index) => (
          <CarouselItem key={index} className="flex justify-center p-4">
            {typeof flashcard === "object" &&
            flashcard !== null &&
            "front" in flashcard &&
            "back" in flashcard ? (
            <FlashCardflip flashcard={flashcard} />
            ) : (
            <div className="text-red-500 p-6 bg-red-50 rounded-xl shadow-lg">
              Invalid flashcard data.
            </div>
            )}
          </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-8 mt-10">
          <CarouselPrevious className="relative hover:scale-110 transition-transform duration-200 shadow-md" />
          <CarouselNext className="relative hover:scale-110 transition-transform duration-200 shadow-md" />
        </div>
        </Carousel>
      </div>
      )}
    </div>
  );
}

"use client"
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useContext, useEffect , useState} from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { SkeletonCard } from './SkeletonCard';
import { RefreshCw } from 'lucide-react';
import Link from 'next/link';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CourseCountContext } from '@/app/_context/CourseCountContext';



export default function CourseList() {
    const { user } = useUser();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const courseContext = useContext(CourseCountContext);
    const courseCount = courseContext?.courseCount;
    const setCourseCount = courseContext?.setCourseCount;
    const itemsPerPage = 6;
    useEffect(() => {
        user&&GetCourseList();
    }, [user]);

    const GetCourseList = async () => {
        setLoading(true);
        try {
            const result = await axios.post("/api/courses", {
                createdBy: user?.primaryEmailAddress?.emailAddress,
            });
            if (result.data.error) {
                console.error("Failed to fetch study materials");
                return;
            }
            setCourses(result.data.result);
            console.log(result.data);
            setCourseCount && setCourseCount(result.data.result.length);
        } catch (error) {
            console.error("Error fetching study materials:", error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5 px-3">
              {[...Array(6)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
        );
    }

    if (courses.length === 0) {
        return (
            <div className="mt-10 flex flex-col items-center justify-center gap-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Create Your First Course</h2>
              <p className="text-gray-600 dark:text-gray-300">Get started by creating your first course material</p>
              <Button
                onClick={() => window.location.href = '/create'}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
              >
                Create Course
              </Button>
            </div>
        );
    }



    return (
      <div className="mt-10 px-3">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-100">
        Your Study Material
          </h2>
          <Button
        variant="outline"
        onClick={GetCourseList}
        className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
        <RefreshCw className="w-4 h-4" />
        <span>Refresh</span>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          {courses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((course: any) => (
        <Card
          key={course.id}
          className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 dark:border-gray-700"
        >
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
          {course.courseLayout.course_title}
            </CardTitle>
            <div className="flex justify-between items-center">
          {course.difficultyLevel === "easy" && (
            <div className="flex items-center group relative">
              <svg
            className="w-6 h-6 text-green-500 transition-transform duration-200 group-hover:scale-110"
            fill="currentColor"
            viewBox="0 0 20 20"
              >
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
              </svg>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Easy
              </span>
            </div>
          )}
          {course.difficultyLevel === "moderate" && (
            <div className="flex items-center group relative">
              <svg
            className="w-6 h-6 text-yellow-500 transition-transform duration-200 group-hover:scale-110"
            fill="currentColor"
            viewBox="0 0 20 20"
              >
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" />
              </svg>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Moderate
              </span>
            </div>
          )}
          {course.difficultyLevel === "hard" && (
            <div className="flex items-center group relative">
              <svg
            className="w-6 h-6 text-red-500 transition-transform duration-200 group-hover:scale-110"
            fill="currentColor"
            viewBox="0 0 20 20"
              >
            <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
              </svg>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Hard
              </span>
            </div>
          )}
            </div>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mt-2">
          {course.courseLayout.course_summary}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4">
            <p className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Total Chapters: {course.courseLayout.chapters.length || 0}
          </span>
          
            </p>
          </CardContent>
          <CardFooter className="px-4 pb-4">
            {course.status === "Generating" ? (
          <Button
            className="w-full bg-yellow-600 hover:bg-yellow-700 transition-colors flex items-center justify-center gap-2"
            disabled
          >
            <span className="animate-spin">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
              </svg>
            </span>
            Generating...
          </Button>
            ) : (
          <Link href={`/course/${course.courseId}`}>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors">
              View Course
            </Button>
          </Link>
            )}
          </CardFooter>
        </Card>
          ))}
        </div>
        <div className="mt-5 flex justify-center">
          <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            if (currentPage > 1) setCurrentPage(currentPage - 1);
          }}
          className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
          {[...Array(Math.ceil(courses.length / itemsPerPage))].map((_, index) => (
            <PaginationItem key={index}>
          <PaginationLink 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(index + 1);
            }}
            isActive={currentPage === index + 1}
          >
            {index + 1}
          </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            if (currentPage < Math.ceil(courses.length / itemsPerPage)) {
              setCurrentPage(currentPage + 1);
            }
          }}
          className={currentPage >= Math.ceil(courses.length / itemsPerPage) ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
          </Pagination>
        </div>
      </div>
    );
}


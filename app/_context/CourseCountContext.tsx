import { createContext } from "react";


interface CourseCountContextType {
  courseCount: number;

  setCourseCount: (count: number) => void;
}




export const CourseCountContext = createContext<CourseCountContextType | undefined>(undefined);
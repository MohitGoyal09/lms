export interface Chapter {
  chapter_number: number;
  chapter_title: string;
  chapter_summary: string;
  topics: string[];
}

export interface CourseLayout {
  course_title: string;
  course_summary: string;
  difficulty: string;
  chapters: Chapter[];
}

export interface Course {
  id: number;
  courseId: string;
  courseType: string;
  topic: string;
  difficultyLevel: string;
  courseLayout: CourseLayout;
  createdBy: string;
  status: string;
}

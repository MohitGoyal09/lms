import React from "react";
import Image from "next/image";
import { ClipboardList, Code,  Dumbbell, Folder,  Users } from 'lucide-react';
function Selectoption({ selectedStudyType, onSelect } : { selectedStudyType: string, onSelect: (value: string) => void }) {
  const Options = [
    {
      name: "Exam",
      icon: ClipboardList, 
    },
    {
      name: "Job Interview",
      icon: Users, 
    },
    {
      name: "Practice",
      icon: Dumbbell, 
    },
    {
      name: "Coding Prep",
      icon: Code, 
    },
    {
      name: "Other",
      icon: Folder, }
  ];

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto p-6">
      <h2 className="text-center mb-8 text-2xl font-semibold text-gray-800 dark:text-gray-100">
      For which purpose do you want to create your personal study material?
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
      {Options.map((option, index) => (
      <div
      key={index}
      className={`flex flex-col items-center border p-6 rounded-xl transition-all duration-300 cursor-pointer
          ${option.name === selectedStudyType
          ? "border-blue-500 bg-blue-100 dark:bg-blue-900 dark:border-blue-400"
          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-500 hover:shadow-lg hover:bg-blue-50 dark:hover:bg-gray-700"
          }`}
      onClick={() => {
        onSelect(option.name);
      }}
      >
      <option.icon
        size={48}
        className={`w-12 h-12 mb-3 ${
        option.name === selectedStudyType
          ? "text-blue-600 dark:text-blue-400"
          : "dark:text-gray-100"
        }`}
      />
      <p className={`text-center font-medium ${
        option.name === selectedStudyType
        ? "text-blue-700 dark:text-blue-300"
        : "text-gray-700 dark:text-gray-300"
      }`}>
        {option.name}
      </p>
      </div>
      ))}
      </div>
    </div>
  );
}

export default Selectoption;

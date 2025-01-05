import React from "react";
import Image from "next/image";
import { ClipboardList, Code,  Dumbbell, Folder,  Users } from 'lucide-react';
function Selectoption({ selectedStudyType, onSelect } : { selectedStudyType: string, onSelect: (value: string) => void }) {
  const Options = [
    {
      name: "Exam",
      icon: ClipboardList, // More relevant for exam/test-taking
    },
    {
      name: "Job Interview",
      icon: Users, // Represents interaction/meeting
    },
    {
      name: "Practice",
      icon: Dumbbell, // Better represents practice/exercise
    },
    {
      name: "Coding Prep",
      icon: Code, // More standard coding icon
    },
    {
      name: "Other",
      icon: Folder, // Generic container icon
    },
  ];

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto p-6">
      <h2 className="text-center mb-8 text-2xl font-semibold text-gray-800">
        For which purpose do you want to create your personal study material?
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
        {Options.map((option, index) => (
          <div
            key={index}
            className={`flex flex-col items-center border border-gray-200 p-6 rounded-xl 
                      ${
                        option.name === selectedStudyType
                          ? ""
                          : "hover:border-blue-500 hover:shadow-lg"
                      }
                      transition-all duration-300 cursor-pointer
                      bg-white ${
                        option.name === selectedStudyType
                          ? ""
                          : "hover:bg-blue-50"
                      }`}
            style={
              option.name === selectedStudyType
                ? { borderColor: "blue", backgroundColor: "#add8e6" }
                : {}
            }
            onClick={() => {
              onSelect(option.name);
            }}
          >
            <option.icon
              size={48}
              className="w-12 h-12 mb-3"
            />
            <p className="text-center font-medium text-gray-700">
              {option.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Selectoption;

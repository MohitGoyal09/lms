import React from 'react'
import Image from 'next/image'
function Selectoption({ selectedStudyType }: { selectedStudyType: (type: string) => void }) {
  const Options = [
    {
      name: "Exam",
      icon: "/exam_1.png",
    },
    {
      name: "Job Interview",
      icon: "/job.png",
    },
    {
      name: "Practice",
      icon: "/practice.png",
    },
    {
      name: "Coding Prep",
      icon: "/code.png",
    },
    {
      name: "Other",
      icon: "/knowledge.png",
    },
  ];
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
    null
  );
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
                    hover:border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer
                    bg-white hover:bg-blue-50
                    ${selectedOption === option.name ? "border-blue-500" : ""}`}
            onClick={() => {
              setSelectedOption(option.name);
              selectedStudyType(option.name);
            }}
          >
            <Image
              src={option.icon}
              alt={option.name}
              width={48}
              height={48}
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

export default Selectoption
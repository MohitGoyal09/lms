import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

interface FlashCardflipProps {
  flashcard: Flashcard;
}
interface Flashcard {
  front: string;
  back: string;
}

export default function FlashCardflip({ flashcard }: { flashcard: Flashcard }) {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div className="flex items-center justify-center min-h-[250px]">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <div
          className="p-6 bg-gray-800 text-white flex items-center justify-center rounded-xl cursor-pointer shadow-lg hover:bg-gray-700 transition-all duration-300 min-h-[250px] w-full sm:w-[300px] md:w-[350px]"
          onClick={() => setIsFlipped(true)}
        >
          <h2 className="text-xl font-semibold">
            {flashcard.front || "No front content"}
          </h2>
        </div>
        <div
          className="p-6 bg-gray-900 text-white flex flex-col items-center justify-center rounded-xl cursor-pointer shadow-lg hover:bg-gray-800 transition-all duration-300 min-h-[250px] w-full sm:w-[300px] md:w-[350px]"
          onClick={() => setIsFlipped(false)}
        >
          <p className="mb-4 text-lg">{flashcard.back || "No back content"}</p>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => setIsFlipped(false)}
          >
            Click to flip
          </button>
        </div>
      </ReactCardFlip>
    </div>
  );
}

"use client"
import React, { useEffect, useRef, useState } from "react";
import { Cover } from "./ui/cover";
export interface QuizQuestion {
    question: string;
    options: string[];
    answer: string;
  }
  
  interface QuizProps {
    quizData: QuizQuestion[];
  }
  
  const Quiz: React.FC<QuizProps> = ({ quizData }) => {
    // Destructure quizData from props
    const [selectedOptions, setSelectedOptions] = useState<
      Record<number, string | null>
    >(quizData.reduce((acc, _, index) => ({ ...acc, [index]: null }), {}));
    const [answers, setAnswers] = useState<Record<number, string | null>>(
      quizData.reduce((acc, _, index) => ({ ...acc, [index]: null }), {})
    );
  
    const handleOptionClick = (questionIndex: number, option: string) => {
      setSelectedOptions((prevState) => ({
        ...prevState,
        [questionIndex]: option,
      }));
  
      setAnswers((prevState) => ({
        ...prevState,
        [questionIndex]: quizData[questionIndex].answer,
      }));
    };
  
    return (
      <div className="p-6 bg-muted min-h-screen rounded-xl my-4">
        <h1 className="text-2xl md:text-2xl lg:text-4xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
          <Cover>Objective Questions</Cover>
        </h1>
        {quizData.map((item, index) => (
          <div key={index} className="mb-6 p-4 bg-neutral-700 shadow-lg rounded-lg ">
            <h3 className="text-lg font-semibold text-gray-100 mb-4">
              {item.question}
            </h3>
            <ul className="list-none pl-0">
              {item.options.map((option, idx) => (
                <li key={idx} className="mb-2">
                  <button
                    onClick={() => handleOptionClick(index, option)}
                    className={`w-full text-left p-3 rounded-lg focus:outline-none ${
                      selectedOptions[index] === option
                        ? item.answer === option.split(". ")[0]
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                        : "bg-blue-500 text-white"
                    } focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };
  
  export default Quiz
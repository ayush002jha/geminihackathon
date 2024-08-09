"use client";
import React, { useState } from "react";
import quizData from '../../component/TestData/quizData';

const Quiz: React.FC = () => {
    const [selectedOptions, setSelectedOptions] = useState<Record<number, string | null>>(
        quizData.reduce((acc, _, index) => ({ ...acc, [index]: null }), {})
    );
    const [answers, setAnswers] = useState<Record<number, string | null>>(
        quizData.reduce((acc, _, index) => ({ ...acc, [index]: null }), {})
    );

    const handleOptionClick = (questionIndex: number, option: string) => {
        setSelectedOptions(prevState => ({
            ...prevState,
            [questionIndex]: option
        }));
        
        setAnswers(prevState => ({
            ...prevState,
            [questionIndex]: quizData[questionIndex].answer
        }));
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {quizData.map((item, index) => (
                <div key={index} className="mb-6 p-4 bg-white shadow-lg rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">{item.question}</h3>
                    <ul className="list-none pl-0">
                        {item.options.map((option, idx) => (
                            <li key={idx} className="mb-2">
                                <button
                                    onClick={() => handleOptionClick(index, option)}
                                    className={`w-full text-left p-3 rounded-lg focus:outline-none ${
                                        selectedOptions[index] === option 
                                            ? (item.answer === option.split('. ')[0] ? 'bg-green-500 text-white' : 'bg-red-500 text-white') 
                                            : 'bg-blue-500 text-white'
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
}

export default Quiz;

interface QuizQuestion {
    question: string;
    options: string[];
    answer: string;
}

const quizData: QuizQuestion[] = [
    {
        question: "What is the capital of France?",
        options: ["A. London", "B. Paris", "C. Berlin", "D. Madrid"],
        answer: "B"
    },
    {
        question: "Which planet is closest to the Sun?",
        options: ["A. Earth", "B. Mars", "C. Venus", "D. Mercury"],
        answer: "D"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["A. Atlantic", "B. Indian", "C. Arctic", "D. Pacific"],
        answer: "D"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["A. Mark Twain", "B. Charles Dickens", "C. William Shakespeare", "D. Jane Austen"],
        answer: "C"
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["A. O2", "B. CO2", "C. H2O", "D. NaCl"],
        answer: "C"
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["A. China", "B. Japan", "C. Korea", "D. Thailand"],
        answer: "B"
    },
    {
        question: "How many continents are there on Earth?",
        options: ["A. 5", "B. 6", "C. 7", "D. 8"],
        answer: "C"
    },
    {
        question: "What is the smallest prime number?",
        options: ["A. 0", "B. 1", "C. 2", "D. 3"],
        answer: "C"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["A. Vincent van Gogh", "B. Pablo Picasso", "C. Leonardo da Vinci", "D. Michelangelo"],
        answer: "C"
    },
    {
        question: "Which element has the atomic number 1?",
        options: ["A. Helium", "B. Oxygen", "C. Hydrogen", "D. Carbon"],
        answer: "C"
    }
];

export default quizData;
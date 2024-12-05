import axios from "axios";
import QuizDetail from "./Detail";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const findQuizById = async (quizId: string) => {
    const response = await axios.get(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

export const findQuestionsForQuiz = async (quizId: string) => {
    const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
    return response.data;
}

export const findQuestionById = async (quizId: string, questionId: string) => {
    const response = await axios.get(`${QUIZZES_API}/${quizId}/questions/${questionId}`);
    return response.data;
}

export const createQuestion = async (quizId: string, question: any) => {
    console.log("client.ts createQuestion");
    const response = await axios.post(`${QUIZZES_API}/${quizId}/questions`, question);
    return response.data;
};
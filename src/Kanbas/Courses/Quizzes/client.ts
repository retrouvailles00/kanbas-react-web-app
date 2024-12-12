import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const RESPONSES_API = `${REMOTE_SERVER}/api/responses`;
const axiosWithCredentials = axios.create({ withCredentials: true });

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
    const response = await axios.post(`${QUIZZES_API}/${quizId}/questions`, question);
    return response.data;
};

export const createQuiz = async (quiz: any) => {
    const { data } = await axiosWithCredentials.post(`${QUIZZES_API}`, quiz);
    return data;
}

export const updateQuiz = async (quiz: any) => {
    const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return data;
}

export const deleteQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
}

export const createResponse = async (responsePayload: any) => {
    const response = await axiosWithCredentials.post(`${RESPONSES_API}`, responsePayload);
    return response.data;
}
export const findResponseById = async (responseId: string) => {
    const response = await axios.get(`${RESPONSES_API}/${responseId}`);
    return response.data;
}

export const checkifUserTakenQuiz = async (uid: string, quizId: string) => {
    const response = await axios.get(`${RESPONSES_API}/${uid}/${quizId}`);
    return response.data;
}
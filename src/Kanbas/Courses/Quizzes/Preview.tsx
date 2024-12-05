import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { useEffect, useState, useCallback } from "react";
import * as client from "./client";
import { setQuestions } from "./questionsReducer";
import QuestionContainer from "./QuestionContainer";

export default function QuizPreview() {
    const { cid, qid } = useParams();
    const dispatch = useDispatch();
    const { questions } = useSelector((state: any) => state.questionsReducer);
    const [quiz, setQuiz] = useState<any>({});
    
    const fetchQuestions = async () => {
        const questionsIds = await client.findQuestionsForQuiz(qid as string);
        const questionPromises = questionsIds.map((questionId: string) =>
            client.findQuestionById(qid as string, questionId)
        );
        const questions = (await Promise.all(questionPromises)).flat();
        dispatch(setQuestions(questions));
    };
    const fetchQuiz = async () => {
        if (!qid) return;
        const quiz = await client.findQuizById(qid);
        setQuiz(quiz);
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    useEffect(() => {
        if (qid) fetchQuiz();
    }, [qid]);
    if (!qid) return null;

    return (
    <div>
        <h1>Quiz Instruction</h1>
        <h2>This is a preview</h2>
        <h2>{quiz.quizTitle}</h2>
        <ul className="list-group rounded-0">
                {questions.map((question: any) => (
                    <li className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between align-items-center">
                        <QuestionContainer question={question}/>
                    </li>
                ))}
        </ul>

    </div>)
}
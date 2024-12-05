import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import * as client from "./client";

export default function QuizDetail() {
    
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState<any>({});


    const fetchQuiz= async () => {
        if (!qid) return;
        const quiz = await client.findQuizById(qid);
        setQuiz(quiz);
    };
    useEffect(() => {
        if (qid) fetchQuiz();
    }, [qid]);
    if (!qid) return null;


    return (
        <div className="container" id="wd-quiz-preview">
            <div className="d-flex mb-3 align-items-center">
                <button className="btn btn-secondary d-flex align-items-center"
                    onClick={() => navigate("Preview")}>
                    Preview
                </button>
                <button className="btn btn-secondary d-flex align-items-center"
                    onClick={() => navigate("Editor")}>
                    Edit
                </button>
            </div>
            

            <b></b>           <span className="wd-quiz-title">         {quiz.quizTitle}         </span> <br />
            <b>Quiz Type</b>   <span className="wd-quiz-type">         {quiz.type}         </span> <br />
            <b>Points</b>   <span className="wd-quiz-points">         {quiz.points}         </span> <br />
            <b>Assignment Group</b>   <span className="wd-quiz-group">         {quiz.group}         </span> <br />
            <b>Shuffle Answers</b>   <span className="wd-quiz-type">         Yes         </span> <br />
            <b>Time Limit</b>   <span className="wd-quiz-time-limit">         {quiz.timeLimit}         </span> <br />
            <b>Multiple Attempts</b>   <span className="wd-quiz-multiple-attempts">         yes         </span> <br />
            <b>Shuffle Answers</b>
            <span className="wd-quiz-type">
                {quiz.shuffleAnswers ? "Yes" : "No"}
            </span>
            <br />

            <b>Time Limit</b>
            <span className="wd-quiz-time-limit">
                {quiz.timeLimit ? quiz.timeLimit : "None"}
            </span>
            <br />

            <b>Multiple Attempts</b>
            <span className="wd-quiz-multiple-attempts">
                {quiz.multipleAttempts ? "Yes" : "No"}
            </span>
            <br />

            <b>How Many Attempts</b>
            <span className="wd-quiz-attempts">
                {quiz.multipleAttempts ? quiz.maxAttempts : 1}
            </span>
            <br />

            <b>Show Correct Answers</b>
            <span className="wd-quiz-show-correct-answers">
                {quiz.showCorrectAnswers ? quiz.showCorrectAnswers : "Never"}
            </span>
            <br />

            <b>Access Code</b>
            <span className="wd-quiz-access-code">
                {quiz.accessCode ? quiz.accessCode : "None"}
            </span>
            <br />

            <b>One Question at a Time</b>
            <span className="wd-quiz-one-question-at-a-time">
                {quiz.oneQuestionAtATime ? "Yes" : "No"}
            </span>
            <br />

            <b>Webcam Required</b>
            <span className="wd-quiz-webcam-required">
                {quiz.webcamRequired ? "Yes" : "No"}
            </span>
            <br />

            <b>Lock Questions After Answering</b>
            <span className="wd-quiz-lock-questions">
                {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
            </span>
            <br />

            <b>Due Date</b>
            <span className="wd-quiz-due-date">
                {quiz.dueDate ? new Date(quiz.dueDate).toLocaleDateString() : "Not Set"}
            </span>
            <br />

            <b>Available Date</b>
            <span className="wd-quiz-available-date">
                {quiz.availableDate ? new Date(quiz.availableDate).toLocaleDateString() : "Not Set"}
            </span>
            <br />
{/* 
            <b>Until Date</b>
            <span className="wd-quiz-until-date">
                {quiz.untilDate ? new Date(quiz.untilDate).toLocaleDateString() : "Not Set"}
            </span>
            <br /> */}
        </div>)
}
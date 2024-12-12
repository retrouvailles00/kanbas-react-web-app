import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import * as client from "./client";
import { setQuestions } from "./questionsReducer";


export default function Exam() {
    const { cid, qid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { questions } = useSelector((state: any) => state.questionsReducer);
    const [quiz, setQuiz] = useState<any>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [responses, setResponses] = useState<any[]>([]);
    const [startTime, setStartTime] = useState<number>(Date.now());
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const [examStarted, setExamStarted] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [allowedTimes, setAllowedTimes] = useState<number>(1);

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

    if (!qid || questions.length === 0) return null;

    const handleStartExam = async () => {
        const res = await client.checkifUserTakenQuiz(currentUser._id, qid);
        
        if (res && res.allowedTimes) {
            if (res.allowedTimes >= 0) {
                setExamStarted(true)
            }
            else {
                window.alert("No more attempts")
            }
        } else {
            setAllowedTimes(quiz.howManyAttempts)
            setExamStarted(true)
        }
        
    };

    const handleNext = () => {

        const currentQuestion = questions[currentQuestionIndex];
        let isCorrect = false;

        if (currentQuestion.type === 'true-false') {
            isCorrect = (selectedAnswer === currentQuestion.correctAnswer);
        } else if (currentQuestion.type === 'multiple-choice') {
            const selectedChoice = currentQuestion.choices.find((choice: any) => choice.text === selectedAnswer);
            if (selectedChoice) {
                isCorrect = selectedChoice.isCorrect;
            }
        } else {
            isCorrect = true;
        }

        const newResponses = [
            ...responses,
            {
                question: currentQuestion._id,
                userResponse: selectedAnswer,
                isCorrect: isCorrect
            }
        ];
        console.log(currentQuestion.points)
        if (isCorrect) {
            setScore(score + currentQuestion.points)
        }
        setResponses(newResponses);
        setSelectedAnswer("");
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };


    const handleSubmit = async () => {
        const timeTaken = Math.floor((Date.now() - startTime) / (1000*60));
        const responsePayload = {
            user: currentUser._id,
            quiz: qid,
            score: score,
            timeTaken: timeTaken,
            allowedTimes: (allowedTimes - 1),
            responses: responses
        };
        console.log(responsePayload)

        try {
            const response = await client.createResponse(responsePayload);
            console.log("Quiz submitted successfully:", response);
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Exam/Finished/${response._id}`);
        } catch (error) {
            console.error("Error submitting quiz:", error);
        }
    };


    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    return (
        
        <div>
            <h1>Exam</h1>
            <h2>{quiz.quizTitle}</h2>
            {!examStarted ? (<button onClick={handleStartExam} className="btn btn-primary">
                Start Exam
            </button>
            ) : (
            <div className="question-container">
                <div className="question-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3>{questions[currentQuestionIndex].title}</h3>
                    <span>({questions[currentQuestionIndex].points} points)</span>
                </div>
                <p>{questions[currentQuestionIndex].question}</p>
                        {questions[currentQuestionIndex] && questions[currentQuestionIndex].type === 'multiple-choice' && (<div>
                            {questions[currentQuestionIndex].choices.map((choice: any, index: number) => (

                                <div key={index}>
                                    <input
                                        type="radio"
                                        name="question"
                                        value={choice.text}
                                        onChange={(e) => setSelectedAnswer(e.target.value)}
                                    />
                                    <label>{choice.text}</label>
                                </div>
                            ))}
                        </div>)}

                        {questions[currentQuestionIndex].type && questions[currentQuestionIndex].type === 'true-false' &&(
                            <div>
                                <input
                                    type="radio"
                                    name="question"
                                    value='true'
                                    onChange={(e) => setSelectedAnswer(e.target.value)}
                                />
                                <label>True</label>
                                <input
                                    type="radio"
                                    name="question"
                                    value='false'
                                    onChange={(e) => setSelectedAnswer(e.target.value)}
                                />
                                <label>False</label>

                            </div>

                        )}

                        {questions[currentQuestionIndex].type && questions[currentQuestionIndex].type  === 'fill-in-the-blank' && (
                            <div>
                                <input
                                    name="question"
                                    value={selectedAnswer}
                                    onChange={(e) => setSelectedAnswer(e.target.value)}
                                />
                                <label>Answer</label>
                            </div>
                        )}
                
    
                <div className="navigation-buttons">
                    {isLastQuestion ? (
                        <button onClick={handleSubmit} className="btn btn-primary">
                            Submit
                        </button>
                    ) : (
                            <button onClick={handleNext} className="btn btn-primary">
                            Next
                        </button>
                    )}
                </div>

                <div>
                    <p>
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </p>
                </div>
            </div>)}
        </div>
    );
}

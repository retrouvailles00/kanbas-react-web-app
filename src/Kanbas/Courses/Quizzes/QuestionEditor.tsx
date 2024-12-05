import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as client from './client';

export default function QuestionEditor() {
    const { qid, cid, questionId } = useParams<{ qid: string; cid: string; questionId?: string }>();
    const [questionType, setQuestionType] = useState('multiple-choice');
    const [answers, setAnswers] = useState([{ text: '', isCorrect: false }]);
    const [questionText, setQuestionText] = useState('');
    const [trueFalseAnswer, setTrueFalseAnswer] = useState<string>('');
    const [points, setPoints] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (questionId) {
            const fetchQuestion = async () => {
                const question = await client.findQuestionById(qid as string, questionId as string);
                setQuestionType(question.type);
                setQuestionText(question.question);
                setPoints(question.points);

                if (question.type === 'true-false') {
                    setTrueFalseAnswer(question.correctAnswer ? 'true' : 'false');
                } else {
                    setAnswers(question.choices || [{ text: '', isCorrect: false }]);
                }
            };
            fetchQuestion();
        }
    }, [questionId, cid, qid]);

    const handleQuestionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedType = e.target.value;
        setQuestionType(selectedType);
        if (selectedType !== 'true-false') {
            setTrueFalseAnswer('');
        }

        if (selectedType === 'true-false') {
            setAnswers([]);
        } else {
            setAnswers([{ text: '', isCorrect: false }]);
        }
    };

    const handleAnswerSelect = (index: number) => {
        const newAnswers = [...answers];
        newAnswers[index].isCorrect = !newAnswers[index].isCorrect;
        setAnswers(newAnswers);
    };

    const handleAnswerChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newAnswers = [...answers];
        newAnswers[index].text = e.target.value;
        setAnswers(newAnswers);
    };

    const handleAddAnswer = () => {
        setAnswers([
            ...answers,
            { text: '', isCorrect: false }
        ]);
    };

    const handleCancel = () => {
        setQuestionText('');
        setAnswers([{ text: '', isCorrect: false }]);
        setTrueFalseAnswer('');
        setQuestionType('multiple-choice');
    };

    const handleUpdateQuestion = async () => {
        const newQuestion = {
            type: questionType,
            title: questionText,
            question: questionText,
            points: points,
            correctAnswer: questionType === 'true-false'
                ? trueFalseAnswer === 'true'
                : undefined,
            choices: questionType !== 'true-false'
                ? answers.map(answer => ({
                    text: answer.text,
                    isCorrect: answer.isCorrect
                }))
                : undefined
        };

        if (questionId) {
            // Update existing question
            // await client.updateQuestion(cid, qid, questionId, newQuestion);
            navigate(-1);
        } else {
            // Create new question
            const createdQuestion = await client.createQuestion(qid as string, newQuestion);
            console.log(createdQuestion);
            navigate(-1);
        }
    };

    return (
        <div className="container mt-4">
            <h2>{questionId ? 'Edit' : 'Create'} Question</h2>

            <div className="row mb-4">
                <div className="col-12 d-flex justify-content-start">
                    <select
                        className="form-select me-3"
                        value={questionType}
                        onChange={handleQuestionTypeChange}
                    >
                        <option value="multiple-choice">Multiple Choice</option>
                        <option value="true-false">True/False</option>
                        <option value="fill-in-the-blank">Fill in the Blank</option>
                    </select>

                    <label>Points: </label>
                    <input
                        type="number"
                        className="form-control ms-2"
                        placeholder="Enter points"
                        value={points}
                        onChange={(e) => setPoints(Number(e.target.value))}
                    />
                </div>
            </div>

            <div className="row mb-4">
                <p>Question:</p>
                <div className="col-12">
                    <textarea
                        className="form-control"
                        placeholder="Enter the question text..."
                        rows={4}
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                    />
                </div>
            </div>

            {questionType !== 'true-false' && (
                <div className="row mb-4">
                    <p>Answers:</p>
                    {answers.map((answer, index) => (
                        <div className="col-12 mb-3" key={index}>
                            <div className="d-flex align-items-center">
                                <input
                                    type="checkbox"
                                    className="form-check-input me-2"
                                    checked={answer.isCorrect}
                                    onChange={() => handleAnswerSelect(index)}
                                />
                                <label
                                    className={`form-label ${answer.isCorrect ? 'text-success' : ''}`}
                                    style={{ flex: 1 }}
                                >
                                    {answer.isCorrect ? 'Correct Answer' : 'Possible Answer'}
                                </label>

                                <input
                                    type="text"
                                    className="form-control me-2"
                                    value={answer.text}
                                    onChange={(e) => handleAnswerChange(index, e)}
                                    placeholder="Enter your answer"
                                />

                                <button
                                    className="btn btn-danger ms-2"
                                    onClick={() => {
                                        setAnswers(answers.filter((_, i) => i !== index));
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {questionType === 'true-false' && (
                <div className="row mb-4">
                    <p>Answer:</p>
                    <div className="col-12">
                        <div className="form-check">
                            <input
                                type="radio"
                                id="trueAnswer"
                                className="form-check-input"
                                name="trueFalseAnswer"
                                value="true"
                                checked={trueFalseAnswer === 'true'}
                                onChange={() => setTrueFalseAnswer('true')}
                            />
                            <label htmlFor="trueAnswer" className="form-check-label">
                                True
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                id="falseAnswer"
                                className="form-check-input"
                                name="trueFalseAnswer"
                                value="false"
                                checked={trueFalseAnswer === 'false'}
                                onChange={() => setTrueFalseAnswer('false')}
                            />
                            <label htmlFor="falseAnswer" className="form-check-label">
                                False
                            </label>
                        </div>
                    </div>
                </div>
            )}

            {questionType !== 'true-false' && (
                <div className="d-flex justify-content-end mb-4">
                    <button
                        className="btn btn-primary"
                        onClick={handleAddAnswer}
                    >
                        Add Another Answer
                    </button>
                </div>
            )}

            <div className="d-flex justify-content-start mt-3">
                <button
                    className="btn btn-secondary me-2"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
                <button
                    className="btn btn-danger"
                    onClick={handleUpdateQuestion}
                >
                    {questionId ? 'Update Question' : 'Create Question'}
                </button>
            </div>
        </div>
    );
}

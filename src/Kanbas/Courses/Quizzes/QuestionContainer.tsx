import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Choice {
    text: string;
    isCorrect: boolean;
}

interface Question {
    _id: string;
    type: 'multiple-choice' | 'true-false' | 'fill-in-the-blank';
    title: string;
    points: number;
    question: string;
    choices?: Choice[];
    correctAnswer?: Boolean;
}

const QuestionContainer = ({ question }: { question: Question }) => {
    const [selectedChoices, setSelectedChoices] = useState<any>({});
    const navigate = useNavigate();

    const handleChoiceChange = (choice: any, isChecked: any) => {
        setSelectedChoices((prevState: any) => ({
            ...prevState,
            [choice]: isChecked,
        }));
    };

    const handleTrueFalseChange = (answer: any) => {
        setSelectedChoices([answer]);
    };

    const handleEditClick = () => {
        navigate(`EditQuestion/${question._id}`);
    };

    return (
        <div className="question-container">
            <div className="question-header">
                <span className="question-title">{question.title}</span>
                <span className="question-points">({question.points} points)</span>
                <button className="btn btn-primary ms-3" onClick={handleEditClick}>
                    Edit
                </button>
            </div>
            <div className="border-bottom"></div>
            <div className="question-body">
                <p>{question.question}</p>

                {question.type === 'multiple-choice' && (
                    <div className="choices">
                        {question.choices && question.choices.map((choice: any, index: any) => (
                            <div key={index} className="choice-item">
                                <input
                                    type="checkbox"
                                    id={`choice-${index}`}
                                    value={choice.text}
                                    checked={selectedChoices[choice.text] || false}
                                    onChange={(e) => handleChoiceChange(choice.text, e.target.checked)}
                                />
                                <label htmlFor={`choice-${index}`}>{choice.text}</label>
                            </div>
                        ))}
                    </div>
                )}

                {question.type === 'true-false' && (
                    <div className="true-false">
                        <div>
                            <input
                                type="radio"
                                id="true"
                                name="true-false"
                                checked={selectedChoices === 'true'}
                                onChange={() => handleTrueFalseChange('true')}
                            />
                            <label htmlFor="true">True</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="false"
                                name="true-false"
                                checked={selectedChoices === 'false'}
                                onChange={() => handleTrueFalseChange('false')}
                            />
                            <label htmlFor="false">False</label>
                        </div>
                    </div>
                )}

                {question.type === 'fill-in-the-blank' && (
                    <textarea
                        className="fill-in-blank"
                        placeholder="Enter your answer..."
                        rows={4}
                    />
                )}
            </div>
        </div>
    );
};

export default QuestionContainer;

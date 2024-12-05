
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import * as client from "./client";
import { BsPlus } from "react-icons/bs";
import QuizPreview from "./Preview";

export default function QuizEditor() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState<any>({});

    const [activeTab, setActiveTab] = useState('wd-quiz-editor');

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };


    const saveQuiz = (assignment: any) => {
        navigate(-1);
    }

    const saveAndPublishQuiz = (assignment: any) => {
        navigate(-2);
    }

    const cancelQuiz = (assignment: any) => {
        navigate(-2);
    }

    const fetchQuiz = async () => {
        if (!qid) return;
        const quiz = await client.findQuizById(qid);
        setQuiz(quiz);
    };

    useEffect(() => {
        if (qid) fetchQuiz();
    }, [qid]);
    if (!qid) return null;
    return (
        <div>
            <ul className="nav nav-tabs" id="quizTabs" role="tablist">
                <li className="nav-item" role="presentation">
                    <a
                        className={`nav-link ${activeTab === 'wd-quiz-editor' ? 'active' : ''}`}
                        id="wd-quiz-editor-tab"
                        data-bs-toggle="tab"
                        href="#wd-quiz-editor"
                        role="tab"
                        aria-controls="wd-quiz-editor"
                        aria-selected={activeTab === 'wd-quiz-editor'}
                        onClick={() => handleTabClick('wd-quiz-editor')}
                    >
                        Details
                    </a>
                </li>
                <li className="nav-item" role="presentation">
                    <a
                        className={`nav-link ${activeTab === 'wd-question-editor' ? 'active' : ''}`}
                        id="wd-question-editor-tab"
                        data-bs-toggle="tab"
                        href="#wd-question-editor"
                        role="tab"
                        aria-controls="wd-question-editor"
                        aria-selected={activeTab === 'wd-question-editor'}
                        onClick={() => handleTabClick('wd-question-editor')}
                    >
                        Questions
                    </a>
                </li>
            </ul>
        <div className="tab-content mt-3">
        
            <div className={`tab-pane fade ${activeTab === 'wd-question-editor' ? 'show active' : ''}`}
                id="wd-question-editor"
                role="tabpanel"
                aria-labelledby="Questions">
                    <QuizPreview/>
                    <div>
                        
                        <button id="wd-add-question" className="btn btn-secondary" onClick={() => { navigate("AddQuestion")}}> <BsPlus/>New Question</button>
                    </div>
                    <div className="float-end">
                        <button id="wd-add-question-save" className="btn btn-danger"> Save</button>
                        <button id="wd-add-question-cancel" className="btn btn-secondary"> Cancel </button>
                    </div>
            </div>
        
                <div
                    className={`tab-pane fade ${activeTab === 'wd-quiz-editor' ? 'show active' : ''}`}
                    id="wd-quiz-editor"
                    role="tabpanel"
                    aria-labelledby="Details"
                >
                <div className="form-group pb-4">
                    <label htmlFor="wd-name">Quiz Name</label>
                    <input id="wd-name" className="form-control mb-2"
                        value={quiz.quizTitle}
                        onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} />
                </div>
                <div className="form-group row pb-4">
                    <label htmlFor="wd-group" className="col-sm-2 col-form-label">Quiz Type</label>
                    <div className="col-sm-10">
                        <select id="wd-group" className="form-select">
                            <option value="Graded Quiz">Graded Quiz</option>
                            <option value="Practice Quiz">Practice Quiz</option>
                            <option value="Graded Survey">Graded Survey</option>
                            <option value="Ungraded Survey">Ungraded Survey</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row pb-4">
                    <label htmlFor="wd-group" className="col-sm-2 col-form-label">Assignment Group</label>
                    <div className="col-sm-10">
                        <select id="wd-group" className="form-select">
                            <option value="Quizzes">Quizzes</option>
                            <option value="Exams">Exams</option>
                            <option value="Assignments">Assignments</option>
                            <option value="Project">Project</option>
                        </select>
                    </div>

                </div>
                <div>
                    <div className="form-check pb-4">
                        <input type="checkbox" className="wd-form-check" name="text-entry" id="wd-text-entry" />
                        <label className="form-check-label" id="wd-text-entry">Shuffle Answers</label>
                    
                    </div>
                    <div>
                        <input type="checkbox" className="form-check-input" name="text-entry" id="wd-text-entry" />
                        <label className="form-check-label" id="wd-text-entry">Time Limit</label>
                        <input className="form-check-input" name="text-entry" id="wd-text-entry" />
                        <label className="form-check-label" id="wd-text-entry">Minutes</label>
                    </div>
                    <div>
                        <input type="checkbox" className="form-check-input" name="text-entry" id="wd-text-entry" />
                        <label className="form-check-label" id="wd-text-entry">Allow Multiple Attempts</label>
                    </div>
                    <div className="form-group row pb-4">
                        <label id="wd-submission-type" className="col-sm-2 col-form-label">Assign</label>
                        <div className="col-sm-10 border border-gray">
                            <div className="form-group row">
                                <label htmlFor="wd-assign-to" className="col-sm-3 col-form-label">Assign To</label>
                                <div className="col-sm-9">
                                    <select id="wd-assign-to" className="form-control">
                                        <option value="Everyone">Everyone</option>
                                    </select>
                                </div>
                            </div>



                            <div className="form-group row">
                                <div>
                                    <label htmlFor="wd-due-date">Due</label>
                                    <div>
                                        <input type="date" id="wd-due-date" className="form-control" value={quiz.dueDate}
                                            onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })} />
                                    </div>
                                </div>
                                <div className="form-group col">
                                    <label className="col-sm-3 col-form-label">Available From</label>
                                    <div className="col-sm-9">
                                        <input type="date" id="wd-available-from" className="form-control" value={quiz.availableDate}
                                            onChange={(e) => setQuiz({ ...quiz, availableDate: e.target.value })} />
                                    </div>
                                </div>
                                <div className="form-group col">
                                    <label className="col-sm-3 col-form-label">Available Until</label>
                                    <div className="col-sm-9">
                                        <input type="date" id="wd-available-until" className="form-control" value={quiz.dueDate}
                                            onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="float-end">
                            <button onClick={() => saveQuiz({ ...quiz })} id="wd-assignment-editor-save" className="btn btn-danger"> Save</button>
                            <button onClick={() => saveAndPublishQuiz({ ...quiz })} id="wd-assignment-editor-save" className="btn btn-danger"> Save and Publish</button>
                            <button onClick={() => cancelQuiz({ ...quiz })} id="wd-assignment-editor-save" className="btn btn-danger"> Cancel </button>
                        </div>
                    </div>
            </div>
    </div>
    </div>
        </div>
    )
}
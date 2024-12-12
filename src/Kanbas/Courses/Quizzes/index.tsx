import { BsGripVertical, BsPlus } from "react-icons/bs";
import { FaAlignJustify } from "react-icons/fa6";
import { SlRocket } from "react-icons/sl";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { deleteQuiz, setQuizzes, updateQuiz } from "./reducer";
import * as coursesClient from "../client";
import * as quizClient from "./client";
import React, { useState, useEffect } from "react";
import { CiNoWaitingSign } from "react-icons/ci";

export default function Quizzes() {
    const { cid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [selectedQuizId, setSelectedQuizId] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleMenu = (quizId: any) => {
        if (selectedQuizId === quizId) {
            setSelectedQuizId(null);
        } else {
            setSelectedQuizId(quizId);
        }
    };

    const handleMenuAction = async (action: string, quizId: any) => {
        setSelectedQuizId(null); 
        if (action === 'Edit') {
            navigate(quizId);
        } else if (action === 'Remove') {
            const status = await quizClient.deleteQuiz(quizId);
            dispatch(deleteQuiz(quizId));
        } else {
            const quiz = await quizClient.findQuizById(quizId);
            const updatedQuiz = { ...quiz, ifPublished: true };
            const status = await quizClient.updateQuiz(updatedQuiz);
            dispatch(updateQuiz(updatedQuiz));
        }
    };

    const fetchQuizzes = async () => {
        const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(quizzes));
    };

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const openQuizDetail = (quizId: any) => {
        navigate(quizId);
        // if (currentUser && currentUser.role === "FACULTY") {
        //     navigate(quizId)
        // }
    };

    const createQuiz = async () => {
        const quiz = {
            quizTitle: "New Quiz",
            courseObjectId: cid,
        }
        const newQuiz = await quizClient.createQuiz(quiz);
        setQuizzes([...quizzes, newQuiz]);
        navigate(newQuiz._id);
    }

    const getAvailability = (quiz: any) => {
        const currentDate = new Date();
        const availableDate = new Date(quiz.availableDate);
        const dueDate = new Date(quiz.dueDate);
        if (currentDate > dueDate) {
            return 'Closed';
        }
        if (currentDate >= availableDate && currentDate <= dueDate) {
            return 'Available';
        }
        if (currentDate < availableDate) {
            return `Not available until ${availableDate.toLocaleDateString()}`;
        }
        return 'Unknown Availability';
    };



    return (<div>
        <ul id="wd-modules" className="list-group rounded-0">
            <div className="d-flex mb-3 align-items-center">
                <input type="text" className="form-control" placeholder="Search..." />
                {currentUser && currentUser.role === "FACULTY" && (
                    <button className="btn btn-danger d-flex align-items-center" onClick={() => createQuiz()}>
                        <BsPlus className="fs-4 me-2" />
                        Quiz
                    </button>
                )}
                <button className="btn d-flex align-items-center">
                    <FaAlignJustify className="fs-4 me-2" />
                </button>
            </div>

            <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                <div className="wd-title p-3 ps-2 bg-secondary">
                    <button id="wd-publish-all-btn" className="btn btn-lg btn-secondary dropdown-toggle"
                        type="button" data-bs-toggle="dropdown">
                    </button>
                    Assignment Quizzes
                </div>
                <ul className="wd-lessons list-group rounded-0">
                    {console.log(quizzes)}
                    {console.log(currentUser.role)}
                    {quizzes.map((quiz: any) => (
                        
                        ((currentUser.role === 'FACULTY') || (currentUser.role === 'STUDENT' && quiz.ifPublished)) && 
                        <li className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                
                                <SlRocket className="me-2 fs-3" color="green" />
                                <div>
                                    <a className="wd-assignment-link"
                                        onClick={() => openQuizDetail(quiz._id)}
                                        style={{
                                            color: "black",
                                            fontWeight: "bold",
                                            textDecoration: "none"
                                        }}>{quiz.quizTitle}</a>
                                   
                                    
                                    <div>{getAvailability(quiz) }</div>
                                    
                                        <div>Due {quiz.dueDate} | {quiz.points} Points | {quiz.questions ? quiz.questions.length : 0} Questions </div>
                                </div>
                                {quiz.ifPublished ? (
                                    <GreenCheckmark />
                                ) : (
                                    <CiNoWaitingSign className="text-danger" />
                                )}
                                {currentUser && currentUser.role === "FACULTY" && (
                                    <div>
                                <BsGripVertical className="me-2 fs-3 float-end" onClick={() => toggleMenu(quiz._id)} />
                                {selectedQuizId === quiz._id && (
                                    <div
                                        className="dropdown-menu show position-absolute"
                                        style={{
                                            top: '30px', 
                                            right: '10px', 
                                        }}
                                    >
                                        <button
                                            className="dropdown-item"
                                            onClick={() => handleMenuAction('Edit', quiz._id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => handleMenuAction('Remove', quiz._id)}
                                        >
                                            Remove
                                        </button>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => handleMenuAction('Publish', quiz._id)}
                                        >
                                            Publish
                                        </button>
                                    </div>
                                )}
                                    </div>
                                )}
                                
                            </div>
                        </li>
                    ))
                }
                </ul>
            </li>
        </ul>
    </div>);
}
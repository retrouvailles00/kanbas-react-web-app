import { BsGripVertical, BsPlus } from "react-icons/bs";
import { FaAlignJustify } from "react-icons/fa6";
import { SlRocket } from "react-icons/sl";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { setQuizzes } from "./reducer";
import * as coursesClient from "../client";
import React, { useState, useEffect } from "react";

export default function Quizzes() {
    const { cid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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



    return (<div>
        <ul id="wd-modules" className="list-group rounded-0">
            <div className="d-flex mb-3 align-items-center">
                <input type="text" className="form-control" placeholder="Search..." />
                <button className="btn btn-danger d-flex align-items-center">
                    <BsPlus className="fs-4 me-2" />
                    Quiz
                </button>
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
                    {quizzes.map((quiz: any) => (
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
                                   
                                    
                                    {quiz.availability}

                                    <div>Due {quiz.dueDate} | {quiz.points} Points | {quiz.numberOfQuestions} Questions </div>
                                </div>
                                <GreenCheckmark />
                                <BsGripVertical className="me-2 fs-3 float-end" />
                            </div>
                        </li>
                    ))
                    }
                </ul>
            </li>
        </ul>
    </div>);
}
import {BsGripVertical, BsPlus} from "react-icons/bs";
import ModuleControlButtons from "../Modules/ModuleControlButtons";
import {IoEllipsisVertical} from "react-icons/io5";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { PiNotePencil } from "react-icons/pi";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useParams } from "react-router";
import * as db from "../../Database";
export default function Assignments() {
    const { cid } = useParams();
    const modules = db.modules;
    const assignments = db.assignments;
    return (
        <div id="wd-assignments">
            <ul id="wd-modules" className="list-group rounded-0">
                <div className="d-flex mb-3 align-items-center">
                    {/* Search bar */}
                    <div className="input-group me-3" style={{flexGrow: 1}}>
        <span className="input-group-text">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 className="bi bi-search" viewBox="0 0 16 16">
                <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
        </span>
                        <input type="text" className="form-control" placeholder="Search..."/>
                    </div>

                    {/* Buttons */}
                    <div className="d-flex">
                        <button className="btn btn-secondary d-flex align-items-center me-2">
                            <BsPlus className="fs-4 me-2"/>
                            Group
                        </button>
                        <button className="btn btn-danger d-flex align-items-center">
                            <BsPlus className="fs-4 me-2"/>
                            Assignment
                        </button>
                    </div>
                </div>

                <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3"/>
                        <button id="wd-publish-all-btn" className="btn btn-lg btn-secondary dropdown-toggle"
                                type="button" data-bs-toggle="dropdown">
                        </button>
                        Assignments
                        <div className="float-end">
                            <button className="btn btn-outline-secondary rounded-pill" type="button">40% of Total</button>
                            <BsPlus className="fs-4"/>
                            <IoEllipsisVertical className="fs-4"/>
                        </div>
                    </div>

                    <ul className="wd-lessons list-group rounded-0">
                        {assignments
                            .filter((assignment: any) => assignment.course === cid)
                            .map((assignment: any) => (
                                <li className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <BsGripVertical className="me-2 fs-3"/>
                                        <PiNotePencil className="me-2 fs-3" color="green"/>
                                        <div>
                                            <a className="wd-assignment-link" href={`#/Kanbas/Courses/${assignment.course}/Assignments/${assignment._id}`}
                                               style={{
                                                   color: "black",
                                                   fontWeight: "bold",
                                                   textDecoration: "none"
                                               }}>{assignment.title}</a>
                                            <div><span className="text-danger">Multiple Modules</span> |
                                                Not Available Until {assignment.availableDate} at 12:00am |
                                            </div>
                                            <div>Due {assignment.dueDate} at 11:59pm | {assignment.totalPoints}</div>
                                        </div>
                                    </div>
                                    <div className="float-end">
                                        <GreenCheckmark/>
                                        <IoEllipsisVertical className="fs-4"/>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </li>
            </ul>
        </div>
    );
}

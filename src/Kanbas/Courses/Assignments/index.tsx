import {BsGripVertical, BsPlus} from "react-icons/bs";
import {IoEllipsisVertical} from "react-icons/io5";
import { PiNotePencil } from "react-icons/pi";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useParams } from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import { addAssignment, deleteAssignment, setAssignments, updateAssignment } from "./reducer";
import { useEffect } from "react";
import {FaTrash} from "react-icons/fa";
import * as assignmentsClient from "./client";
import * as coursesClient from "../client";

export default function Assignments() {
    const navigate = useNavigate();
    const { cid } = useParams();
    
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const handleEditAssignment = (assignmentID: any) => {
        if (currentUser && currentUser.role === "FACULTY") {
            navigate(assignmentID)
        }
    };


    const fetchAssignments = async () => {
        const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
        dispatch(setAssignments(assignments));
    };

    useEffect(() => {
        fetchAssignments();
    }, []);

    // const handleAddAssignment = () => {
    //     const newId = assignments[assignments.length - 1]._id + "0";
    //     const newAssignment = {
    //         _id: newId,
    //         title: "New Assignment",
    //         course: cid,
    //         description: "",
    //         totalPoints: 0,
    //         dueDate: "",
    //         availableDate: ""
    //     };
    //     dispatch(addAssignment(newAssignment));
    //     navigate(newId);
    // }

    const createAssignment = async () => {
        if (!cid) return;
        const newId = assignments[assignments.length - 1]._id + "0";
        const newAssignment = {
            _id: newId,
            title: "New Assignment",
            course: cid,
            description: "",
            totalPoints: 0,
            dueDate: "",
            availableDate: ""
        };
        const assignment = await coursesClient.createAssignmentForCourse(cid, newAssignment);
        dispatch(addAssignment(assignment));
        navigate(newId);
    }

    // const handleDelete = (assignmentID: any) => {
    //     const confirmed = window.confirm("Are you sure you want to remove this assignment?");
    //     if (confirmed) {
    //         dispatch(deleteAssignment(assignmentID));
    //     }
    // }

    const removeAssignment = async (assignmentId: any) => {
        const confirmed = window.confirm("Are you sure you want to remove this assignment?");
        if (confirmed) {
            await assignmentsClient.deleteAssignment(assignmentId);
            dispatch(deleteAssignment(assignmentId));
        }
    };

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
                    {currentUser && currentUser.role === "FACULTY" && (
                        <div className="d-flex">
                            <button className="btn btn-secondary d-flex align-items-center me-2">
                                <BsPlus className="fs-4 me-2"/>
                                Group
                            </button>
                            <button className="btn btn-danger d-flex align-items-center">
                                <BsPlus className="fs-4 me-2" onClick={createAssignment}/>
                                Assignment
                            </button>
                        </div>
                    )}
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
                                            <a className="wd-assignment-link"
                                                onClick={() => handleEditAssignment(assignment._id)}
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
                                        {currentUser && currentUser.role === "FACULTY" && (
                                            <FaTrash className="fs-4" onClick={() => removeAssignment(assignment._id)}></FaTrash>
                                        )}
                                    </div>
                                </li>
                            ))}
                    </ul>
                </li>
            </ul>
        </div>
    );
}

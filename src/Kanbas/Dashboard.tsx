import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as db from "./Database";

import React, { useState } from "react";
import enrollmentReducer, {enroll, unenroll} from "./enrollmentReducer";

export default function Dashboard({ courses, course, setCourse, addNewCourse,
                                      deleteCourse, updateCourse }: {
    courses: any[]; course: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (course: any) => void;
    updateCourse: () => void; }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
    const [enrollmentDisplayed, switchEnrollmentDisplayed] = useState(false);
    const toggleEnrollment = () => {
        switchEnrollmentDisplayed(enrollmentDisplayed => !enrollmentDisplayed);
    };

    const createEnrollmentObject = (courseID: any) => {
        return {
            _id: (enrollments.length + 1).toString(),
            user: currentUser._id,
            course: courseID,
        };
    };

    const enrollCourse = (courseID: any) => {
        const newEnrollment = createEnrollmentObject(courseID);
        dispatch(enroll(newEnrollment));
    }

    const unenrollCourse = (courseID: any) => {
        const userID = currentUser._id;
        const enrollmentIndex = enrollments.findIndex((enrollment: any) =>
            enrollment.user === userID && enrollment.course === courseID
        );

        if (enrollmentIndex === -1) {
            console.log('User is not enrolled in this course.');
            return;
        }
        console.log("enrollmentIndex: " + enrollmentIndex);
        dispatch(unenroll(enrollmentIndex));
    }

    return (
        <div id="wd-dashboard" style={{marginLeft: '120px'}}>
            <div>
                <h1 id="wd-dashboard-title">Dashboard</h1>
                {currentUser && currentUser.role === "STUDENT" && (
                    <button className="btn btn-primary" id="wd-display-all-courses"
                            onClick={toggleEnrollment}> Enrollments </button>
                )}
            </div>
            <hr/>
            {currentUser && currentUser.role === "FACULTY" && (
                <div>
                    <h5>New Course
                        <button className="btn btn-primary float-end"
                                id="wd-add-new-course-click"
                                onClick={addNewCourse}> Add </button>
                        <button className="btn btn-warning float-end me-2"
                                onClick={updateCourse} id="wd-update-course-click">
                            Update
                        </button>
                    </h5>

                    <br/>
                    <input defaultValue={course.name} className="form-control mb-2"
                           onChange={(e) => setCourse({...course, name: e.target.value})}/>
                    <textarea defaultValue={course.description} className="form-control"
                              onChange={(e) => setCourse({...course, description: e.target.value})}/>
                </div>
            )}

            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
            <hr/>

            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {courses.filter((course) =>
                            enrollmentDisplayed || enrollments.some(
                                (enrollment: any) =>
                                    enrollment.user === currentUser._id &&
                                    enrollment.course === course._id
                            )
                    ).map((course) => {
                        const isEnrolled = enrollments.some(
                            (enrollment: any) =>
                                enrollment.user === currentUser._id &&
                                enrollment.course === course._id
                        );

                        return (
                            <div className="wd-dashboard-course col" style={{width: "300px"}} key={course._id}>
                                <div className="card rounded-3 overflow-hidden">
                                    <img src={course.image} width="100%" height={160} alt={course.name}/>
                                    <div className="card-body">
                                        <h5 className="wd-dashboard-course-title card-title">
                                            {course.name}
                                        </h5>
                                        <p className="wd-dashboard-course-title card-text overflow-y-hidden"
                                           style={{maxHeight: 100}}>
                                            {course.description}
                                        </p>
                                        <button className="btn btn-primary" onClick={() => {
                                            navigate(`/Kanbas/Courses/${course._id}/Home`);
                                        }}> Go
                                        </button>

                                        {currentUser && currentUser.role === "STUDENT" && (
                                            <button
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    isEnrolled ? unenrollCourse(course._id) : enrollCourse(course._id);
                                                }}
                                                className={`btn ${isEnrolled ? 'btn-danger' : 'btn-success'} float-end`}
                                                id="wd-delete-course-click">
                                                {isEnrolled ? 'Unenroll' : 'Enroll'}
                                            </button>
                                        )}

                                        {currentUser && currentUser.role === "FACULTY" && (
                                            <>
                                                <button onClick={(event) => {
                                                    event.preventDefault();
                                                    deleteCourse(course._id);
                                                }} className="btn btn-danger float-end"
                                                        id="wd-delete-course-click">
                                                    Delete
                                                </button>

                                                <button id="wd-edit-course-click"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            setCourse(course);
                                                        }}
                                                        className="btn btn-warning me-2 float-end">
                                                    Edit
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>


        </div>
    );
}

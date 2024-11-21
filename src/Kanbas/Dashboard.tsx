import { useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { useState, useEffect } from "react";
import {enroll, unenroll, setEnrolledCourses} from "./enrollmentReducer";
import * as userClient from "./Account/client";
import * as enrollClient from "./client";
import * as courseClient from "./Courses/client";

export default function Dashboard({ courses, course, setCourse, addNewCourse,
                                      deleteCourse, updateCourse }: {
    courses: any[]; course: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (course: any) => void;
    updateCourse: () => void; }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
   
    const [displayedCourses, setDisplayedCourses] = useState<any[]>([]);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrolledCourses } = useSelector((state: any) => state.enrollmentReducer);
    const [enrollmentDisplayed, switchEnrollmentDisplayed] = useState(true);
    
    const toggleEnrollment = async () => {
        const newEnrollmentDisplayed = !enrollmentDisplayed;
        switchEnrollmentDisplayed(newEnrollmentDisplayed);
        if (newEnrollmentDisplayed) {
            setDisplayedCourses(enrolledCourses);
        } else {
            const unenrolledCourses = await userClient.findUnenrolledCourses(currentUser._id);
            setDisplayedCourses(unenrolledCourses);
        }
    };

    const fetchEnrolledCourses = async () => {
        let enrolledCourses = [];
        try {
            enrolledCourses = await userClient.findMyCourses(currentUser._id);
            dispatch(setEnrolledCourses(enrolledCourses));
        } catch (error) {
            console.error(error);
        }
        setDisplayedCourses(enrolledCourses);
    };

    useEffect(() => {
        fetchEnrolledCourses();
    }, [currentUser]);

    useEffect(() => {
        if (enrollmentDisplayed) {
            setDisplayedCourses(enrolledCourses);
        } else {

        }
    }, [enrolledCourses, enrollmentDisplayed]);

    const createEnrollmentObject = (courseId: any) => {
        return {
            _id: new Date().getTime().toString(),
            user: currentUser._id,
            course: courseId,
        };
    };

    const enrollCourse = async (courseId: any) => {
        const newEnrollment = createEnrollmentObject(courseId);
        try {
            const enrolledCourse = await courseClient.fetchCourse(courseId);
            const newEnrolledCourse = Array.isArray(enrolledCourse) ? enrolledCourse[0] : enrolledCourse;
            await enrollClient.createEnrollment(newEnrollment);
            dispatch(enroll(newEnrolledCourse));

            const updatedDisplayList = displayedCourses.filter(
                (c: any) => c._id !== courseId);
            setDisplayedCourses(updatedDisplayList);
        } catch (error) {
            console.error('Error enrolling in course:', error);
        }
    }

    const unenrollCourse = async (courseId: any) => {
        try {
            await enrollClient.deleteEnrollment(courseId, currentUser._id);
            dispatch(unenroll(courseId));
            console.log(enrolledCourses.length);
            const updatedDisplayList = displayedCourses.filter(
                (c: any) => c._id !== courseId);
            setDisplayedCourses(updatedDisplayList);

        } catch (error) {
            console.error('Error unenroll in course:', error);
        }
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

            <h2 id="wd-dashboard-published">Published Courses ({displayedCourses.length})</h2>
            <hr/>

            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {displayedCourses.map((displayedCourse: any) => {
                        return (
                            <div className="wd-dashboard-course col" style={{ width: "300px" }} key={displayedCourse._id}>
                                <div className="card rounded-3 overflow-hidden">
                                    <img src={displayedCourse.image} width="100%" height={160} alt={displayedCourse.name}/>
                                    <div className="card-body">
                                        <h5 className="wd-dashboard-course-title card-title">
                                            {displayedCourse.name}
                                        </h5>
                                        <p className="wd-dashboard-course-title card-text overflow-y-hidden"
                                           style={{maxHeight: 100}}>
                                            {displayedCourse.description}
                                        </p>
                                        <button className="btn btn-primary" onClick={() => {
                                            navigate(`/Kanbas/Courses/${displayedCourse._id}/Home`);
                                        }}> Go
                                        </button>

                                        {currentUser && currentUser.role === "STUDENT" && (
                                            <button
                                                onClick={(event) => {
                                                    enrollmentDisplayed ? unenrollCourse(displayedCourse._id) : enrollCourse(displayedCourse._id);
                                                }}
                                                className={`btn ${enrollmentDisplayed ? 'btn-danger' : 'btn-success'} float-end`}
                                                id="wd-delete-course-click">
                                                {enrollmentDisplayed ? 'Unenroll' : 'Enroll'}
                                            </button>
                                        )}

                                        {currentUser && currentUser.role === "FACULTY" && (
                                            <>
                                                <button onClick={(event) => {
                                                    event.preventDefault();
                                                    deleteCourse(displayedCourse._id);
                                                }} className="btn btn-danger float-end"
                                                        id="wd-delete-course-click">
                                                    Delete
                                                </button>

                                                <button id="wd-edit-course-click"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            setCourse(displayedCourse);
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

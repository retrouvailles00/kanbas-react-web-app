import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import * as userClient from "./Account/client";
import * as client from "./Courses/client";
import { useState } from "react";
import store from "./store";
import { Provider } from "react-redux";
import ProtectedRoute from "./Account/ProtectedRoute";
import Account from "./Account";
import Session from "./Account/Session";
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import * as courseClient from "./Courses/client";
import { current } from "@reduxjs/toolkit";
import accountReducer from "./Account/reducer";

export default function Kanbas() {
    const [courses, setCourses] = useState<any[]>([]);
    const [course, setCourse] = useState<any>({});

    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [enrolling, setEnrolling] = useState<boolean>(false);
    const findCoursesForUser = async () => {
        try {
            console.log(currentUser);
            const courses = await userClient.findCoursesForUser(currentUser._id);
            setCourses(courses);
            console.log(courses);
        } catch (error) {
            console.error(error);
        }
    };

    const updateEnrollment = async (courseId: string, enrolled: boolean) => {
        if (enrolled) {
            await userClient.enrollIntoCourse(currentUser._id, courseId);
        } else {
            await userClient.unenrollFromCourse(currentUser._id, courseId);
        }
        setCourses(
            courses.map((course) => {
                if (course._id === courseId) {
                    return { ...course, enrolled: enrolled };
                } else {
                    return course;
                }
            })
        );
    };

    const fetchCourses = async () => {
        try {
            const allCourses = await courseClient.fetchAllCourses();
            const enrolledCourses = await userClient.findCoursesForUser(
                currentUser._id
            );
            const courses = allCourses.map((course: any) => {
                if (enrolledCourses.find((c: any) => c._id === course._id)) {
                    return { ...course, enrolled: true };
                } else {
                    return course;
                }
            });
            setCourses(courses);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (enrolling) {
            fetchCourses();
        } else {
            findCoursesForUser();
        }
    }, [currentUser, enrolling]);


    const addNewCourse = async () => {
        const newCourse = await courseClient.createCourse(course);
        setCourses([...courses, newCourse]);

    };

    const deleteCourse = async (courseId: string) => {
        const status = await courseClient.deleteCourse(courseId);
        setCourses(courses.filter((course) => course._id !== courseId));

    };

    const updateCourse = async () => {
        await courseClient.updateCourse(course);
        setCourses(courses.map((c) => {
            if (c._id === course._id) { return course; }
            else { return c; }
        })
        );
    };

    return (
           <Session>
            <div id="wd-kanbas" className="d-flex">
                <KanbasNavigation />
                <div className="wd-main-content-offset p-3">
                <Routes>
                    <Route path="/" element={<Navigate to="Dashboard"/>}/>
                    <Route path="Account/*" element={<Account />}></Route>
                    <Route path="Dashboard" element={

                        <ProtectedRoute>
                            <Dashboard
                                courses={courses}
                                course={course}
                                setCourse={setCourse}
                                addNewCourse={addNewCourse}
                                deleteCourse={deleteCourse}
                                updateCourse={updateCourse}
                                enrolling={enrolling} 
                                setEnrolling={setEnrolling}
                                updateEnrollment={updateEnrollment}/>
                        </ProtectedRoute>
                    }/>
                    <Route path="Courses/:cid/*" element={<Courses courses={courses}/>}/>
                    <Route path="Calendar"       element={<h1>Calendar</h1>} />
                    <Route path="Inbox"          element={<h1>Inbox</h1>} />

                </Routes>
                </div>
            </div>
        </Session>
);
}
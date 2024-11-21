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
    const [course, setCourse] = useState<any>({
        _id: "1234", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
    });
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const fetchCourses = async () => {
        let courses = [];
        try {
            courses = await userClient.findMyCourses(currentUser._id);
            console.log(courses)
        } catch (error) {
            console.error(error);
        }
        setCourses(courses);
    };
    useEffect(() => {
        fetchCourses();
    }, [currentUser]);


    const addNewCourse = async () => {
        const newCourse = await userClient.createCourse(course);
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
                                updateCourse={updateCourse}/>
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
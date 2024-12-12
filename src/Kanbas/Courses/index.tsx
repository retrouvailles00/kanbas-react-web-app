import {Route, Routes, useParams, useLocation} from "react-router";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import Quizzes from "./Quizzes";
import AssignmentEditor from "./Assignments/Editor";
import {FaAlignJustify} from "react-icons/fa6";
import PeopleTable from "./People/Table";
import * as coursesClient from "./client";
import { useState, useEffect } from "react";
import QuizDetail from "./Quizzes/Detail";
import QuizEditor from "./Quizzes/Editor";
import QuizPreview from "./Quizzes/Preview";
import Exam from "./Quizzes/Exam";
import QuestionEditor from "./Quizzes/QuestionEditor";
import FinishQuiz from "./Quizzes/FinishQuiz";

export default function Courses({ courses }: { courses: any[]; }) {

    const { cid } = useParams();
    const course = courses.find((course) => course._id === cid);
    const { pathname } = useLocation();
    const [enrolledUsers, setEnrolledUsers] = useState<any[]>([]);

    const fetchEnrolledUsersInCourse = async () => {
        let enrolledUsers = [];
        try {
            enrolledUsers = await coursesClient.findUsersForCourse(course._id);
            console.log(enrolledUsers);
        } catch (error) {
            console.error(error);
        }
        
        setEnrolledUsers(enrolledUsers);
    };

    useEffect(() => {
        fetchEnrolledUsersInCourse();
    }, [course]);

    return (
        <div id="wd-courses" style={{marginLeft: '120px'}}>
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1"/>
                {course && course.name} &gt; {pathname.split("/")[4]}
            </h2><hr/>
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CoursesNavigation />
            </div>
            <div className="flex-fill">
                <Routes>
                    <Route path="Home" element={<Home />} />
                    <Route path="Modules" element={<Modules />} />
                    <Route path="Assignments" element={<Assignments />} />
                    <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                    <Route path="People" element={<PeopleTable users={enrolledUsers} />} />
                    <Route path="Quizzes" element={<Quizzes/>}/>
                    <Route path="Quizzes/:qid" element={<QuizDetail />} />
                    <Route path="Quizzes/:qid/Editor" element={<QuizEditor />} />
                    <Route path="Quizzes/:qid/Exam" element={<Exam />} />
                    <Route path="Quizzes/:qid/Exam/Finished/:responseId" element={<FinishQuiz />} />
                    <Route path="Quizzes/:qid/Editor/AddQuestion" element={<QuestionEditor/>}/>
                    <Route path="Quizzes/:qid/Editor/EditQuestion/:questionId" element={<QuestionEditor />} />
                </Routes>
            </div></div>
        </div>
    );
}

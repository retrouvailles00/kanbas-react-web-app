import { Navigate, Route, Routes } from "react-router";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
export default function Courses() {
    return (
        <div id="wd-courses">
            <h2>Course 1234</h2>
            <table>
                <tr>
                    <td valign="top">
                        <CoursesNavigation />
                    </td>
                    <td valign="top">
                        <Routes>
                            <Route path="/" element={<Navigate to="/1234/Home" />} />
                            <Route path="/1234/Home" element={<Home />} />
                            <Route path="/1234/Modules" element={<Modules />} />
                            <Route path="/1234/Assignments" element={<Assignments />} />
                            <Route path="/1234/Assignments/:aid" element={<AssignmentEditor />} />
                            <Route path="/1234/People" element={<h2>People</h2>} />
                        </Routes>
                    </td>
                </tr>
            </table>
        </div>
    );}

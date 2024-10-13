import {Link, useLocation} from "react-router-dom";
import {useParams} from "react-router";
export default function CoursesNavigation() {
    const { pathname } = useLocation();
    const { cid } = useParams();
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

    return (
        <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((link) => (
                <Link
                    to={"/Kanbas/Courses/" + cid + "/" + link}
                    className="list-group-item text-center"
                    style={{
                        borderLeft: pathname.includes(link) ? "3px solid black" : "none",
                        borderTop: "none",
                        borderBottom: "none",
                        borderRight: "none",
                        color: pathname.includes(link) ? "black" : "red"
                    }}
                >
                    {link}
                </Link>
            ))}
        </div>
    );}
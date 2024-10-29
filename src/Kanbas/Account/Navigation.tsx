import { useSelector } from "react-redux";
import {Link, useLocation} from "react-router-dom";
export default function AccountNavigation() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
    const { pathname } = useLocation();
    return (
        <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((link) => (
                <Link
                    to={"/Kanbas/Account/" + link}
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

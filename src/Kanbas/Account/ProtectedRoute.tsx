import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {useParams} from "react-router";
import * as db from "../Database";
export default function ProtectedRoute({ children }: { children: any }) {
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const {cid} = useParams();
    const enrollments = db.enrollments;

    if (!currentUser) {
        return <Navigate to="/Kanbas/Account/Signin"/>;
    } else {
        if (!cid ) {
            return children;
        }
        const isEnrolled = enrollments.some(
            (enrollment) =>
                enrollment.user === currentUser._id &&
                enrollment.course === cid
        );
        if (!isEnrolled) {
            return <Navigate to="/Kanbas/Dashboard"/>;
        } else {
            return children;
        }
    }
}

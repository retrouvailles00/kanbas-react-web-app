import { Link } from "react-router-dom";
export default function Profile() {
    return (
        <div id="wd-profile-screen">
            <h3>Profile</h3>
            <input id="wd-username"
                   placeholder="username"
                   value="alice"
                   className="form-control mb-2"/>
            <input id="wd-password"
                   placeholder="password"
                   value="123"
                   className="form-control mb-2"/>
            <input id="wd-firstname"
                   placeholder="First Name"
                   value="Alice"
                   className="form-control mb-2"/>
            <input id="wd-lastname"
                   placeholder="Last Name"
                   value="Wonderland"
                   className="form-control mb-2"/>

            <input id="wd-lastname"
                   placeholder="Last Name"
                   value="Wonderland"
                   className="form-control mb-2"/>

            <input id="wd-dob"
                   type="date"
                   value="2000-01-01"
                   className="form-control mb-2"/>
            <input id="wd-email"
                   type="email"
                   value="alice@wonderland"
                   className="form-control mb-2"/>

            <select id="wd-role" className="form-control mb-2">
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
            </select><br/>
            <Link to="/Kanbas/Account/Signin" className="btn btn-danger w-100">Sign out</Link>
        </div>
    );
}

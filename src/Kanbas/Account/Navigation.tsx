import {NavLink} from "react-router-dom";
export default function AccountNavigation() {
    return (
        <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
            <NavLink to={`/Kanbas/Account/Signin`} className="list-group-item text-danger border border-0" > Signin  </NavLink> <br/>
            <NavLink to={`/Kanbas/Account/Signup`} className="list-group-item text-danger border border-0" > Signup  </NavLink> <br/>
            <NavLink to={`/Kanbas/Account/Profile`} className="list-group-item text-danger border border-0" > Profile  </NavLink> <br/>
        </div>
    );}

import {NavLink} from "react-router-dom";
import './NavigationBar.css'

export default function NavigationBar() {
    return (
        <div className={'navigation-bar'}>
            <div className={'navigation-bar-tile'}>
                <NavLink
                    className={"nav-link"}
                    to={"/overview"}>
                    <p>All my entries</p>
                </NavLink>
            </div>
            <div className={'navigation-bar-tile'}>
                <NavLink
                    className={"nav-link"}
                    to={"/schedule"}>
                    <p>Schedule</p>
                </NavLink>
            </div>
        </div>
    )
}

import {NavLink} from "react-router-dom";
import './NavigationBar.css'

export default function NavigationBar(){
    return (
        <div className={'navigation-bar'}>
            <NavLink
                className={"nav-link"}
                to={"/overview"}>
                <p>Overview</p>
            </NavLink>
        </div>
    )
}
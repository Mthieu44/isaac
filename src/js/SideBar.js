import React from "react";
import { NavLink } from "react-router-dom";
import fleche from "../images/arrow_menu.png"


class SideBar extends React.Component {
    render() {
        return (
            <div id="sidebar">
                <h2>Menu :</h2>
                <nav>
                    <ul>
                        <li>
                            <NavLink
                                to={`/wiki`}
                                className={({ isActive, isPending }) =>
                                    isActive
                                    ? "active"
                                    : isPending
                                    ? "pending"
                                    : ""
                                }
                            >
                                <img src={fleche} alt="arrow" className="arrowmenu"/>
                                <p>Wiki</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`/isaacdle`}
                                className={({ isActive, isPending }) =>
                                    isActive
                                    ? "active"
                                    : isPending
                                    ? "pending"
                                    : ""
                                }
                            >
                                <img src={fleche} alt="arrow" className="arrowmenu"/>
                                <p>Isaacdle</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`/guessall`}
                                className={({ isActive, isPending }) =>
                                    isActive
                                    ? "active"
                                    : isPending
                                    ? "pending"
                                    : ""
                                }
                            >
                                <img src={fleche} alt="arrow" className="arrowmenu"/>
                                <p>Guess All</p>
                                
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default SideBar
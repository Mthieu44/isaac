import React from "react";
import { NavLink } from "react-router-dom";


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
                                <div className="zizi"></div>
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
                                <div className="zizi"></div>
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
                                <div className="zizi"></div>
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
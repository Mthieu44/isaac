import React from "react";
import { NavLink } from "react-router-dom";
import fleche from "../images/arrow_menu.png";
import '../css/sidebar.css'


class SideBar extends React.Component {
    render() {
        return (
            <div id="sidebar">
                <h2>Menu :</h2>
                <nav>
                    <ul>
                        <li>
                            <NavLink
                                to={`/`}
                                className={({ isActive, isPending }) =>
                                    isActive
                                    ? "active"
                                    : isPending
                                    ? "pending"
                                    : ""
                                }
                            >
                                <img src={fleche} alt="arrow" className="arrowmenu"/>
                                <p>Home</p>
                            </NavLink>
                        </li>
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
                <div id="themeswitch">
                    <p onClick={this.props.onClick}>Switch to {this.props.to} theme</p>
                </div>
            </div>
        )
    }
}

export default SideBar
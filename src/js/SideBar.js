import React from "react";
import { Link } from "react-router-dom";


class SideBar extends React.Component {
    render() {
        return (
            <div id="sidebar">
                <h2>Menu :</h2>
                <nav>
                    <ul>
                        <li>
                            <Link to={'/wiki'}>Wiki</Link>
                        </li>
                        <li>
                            <Link to={'/isaacdle'}>Isaacdle</Link>
                        </li>
                        <li>
                            <Link to={'/guessall'}>Guess all</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default SideBar
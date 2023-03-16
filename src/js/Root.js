import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

class Root extends React.Component {
    constructor(props){
        super(props)
        const savedtheme = localStorage.getItem("theme")
        const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        this.state = {
            theme: savedtheme || (prefersDarkMode ? "dark" : "light")
        }
    }

    themeChange = () => {
        let oppositeTheme = this.getOppositeTheme()
        this.setState({theme: oppositeTheme})
        localStorage.setItem("theme", oppositeTheme);
    }

    getOppositeTheme() {
        return this.state.theme === "light" ? "dark" : "light"
    }

    render() {
        document.body.className = this.state.theme
        return (
            <>
                <SideBar onClick={this.themeChange} to={this.getOppositeTheme()}/>
                <div id="content">
                    <Outlet />
                </div>
            </>
        )
    }
}

export default Root
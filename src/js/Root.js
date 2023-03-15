import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

class Root extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            theme: "dark"
        }
    }

    themeChange = () => {
        this.setState({theme: this.getOppositeTheme()})
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
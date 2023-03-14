import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

class Root extends React.Component {
    render() {
        return (
            <>
                <SideBar />
                <div id="content">
                    <Outlet />
                </div>
            </>
        )
    }
}

export default Root
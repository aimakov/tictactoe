import React from "react";
import Controls from "../components/Controls/Controls";
import Game from "../components/Game/Game";

import "./Layout.css";

const Layout = () => {
    return (
        <>
            <div className="Container">
                <div className="LayoutContainer">
                    <Controls />
                    <Game />
                </div>
            </div>
        </>
    );
};

export default Layout;

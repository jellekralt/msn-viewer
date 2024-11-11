import React from "react";
import "./TitleBar.css";

function TitleBar({ chatTitle }) {
    return (
        <div className="title-bar">
            <span className="window-title">{chatTitle}</span>
            <div className="window-controls">
                <button className="window-button">_</button>
                <button className="window-button">□</button>
                <button className="window-button">×</button>
            </div>
        </div>
    );
}

export default TitleBar;
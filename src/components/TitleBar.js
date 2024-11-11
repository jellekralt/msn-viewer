import React from "react";

function TitleBar() {
    return (
        <div className="title-bar">
            <span className="window-title">MSN Messenger</span>
            <div className="window-controls">
                <button className="window-button">_</button>
                <button className="window-button">□</button>
                <button className="window-button">×</button>
            </div>
        </div>
    );
}

export default TitleBar;
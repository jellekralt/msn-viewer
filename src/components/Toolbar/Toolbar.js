import React from "react";
import "./Toolbar.css";

function Toolbar() {
    return (
        <div className="toolbar">
            <button className="toolbar-button">👤</button>
            <button className="toolbar-button">💬</button>
            <button className="toolbar-button">🎮</button>
            <button className="toolbar-button">🎨</button>
            <button className="toolbar-button">📁</button>
            <button className="toolbar-button">🎵</button>
            <button className="toolbar-button">👥</button>
        </div>
    );
}

export default Toolbar;
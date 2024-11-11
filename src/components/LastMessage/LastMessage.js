// src/components/LastMessage.js
import React from "react";
import "./LastMessage.css";

function LastMessage({ lastMessageDate }) {
    if (!lastMessageDate) return null;

    const formattedDate = new Date(lastMessageDate).toLocaleString();

    return (
        <div className="last-message">
            Last message received at {formattedDate}.
        </div>
    );
}

export default LastMessage;
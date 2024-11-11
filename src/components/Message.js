// src/components/Message.js
import React from "react";
import { emojiMap } from "../emojiMap";

// Helper function to replace text with emojis
function replaceEmojis(text) {
    // Use regex to find all patterns in text that match emojiMap keys
    const emojiPattern = new RegExp(
        `(${Object.keys(emojiMap).map((key) => key.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')).join("|")})`,
        "g"
    );

    return text.split(emojiPattern).map((part, index) =>
        emojiMap[part] ? (
            <span key={index} className="emoticon">
                {emojiMap[part]}
            </span>
        ) : (
            part
        )
    );
}

function Message({ username, text, dateTime }) {
    const messageDate = new Date(dateTime).toLocaleString();
    return (
        <div className="message" title={messageDate}>
            <span className="username">{username} says:</span>
            <br />
            {replaceEmojis(text)}
        </div>
    );
}

export default Message;
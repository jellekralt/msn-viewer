import React from "react";
import Message from "./Message";

function ChatContainer({ messages }) {
    let lastDate = null;

    return (
        <div className="chat-container">
            {messages
                .filter((msg) => msg.text && msg.dateTime) // Filter out empty or invalid messages
                .map((msg, index) => {
                    const messageDate = new Date(msg.dateTime);
                    const isValidDate = !isNaN(messageDate); // Check for valid date
                    if (!isValidDate) return null; // Skip rendering if date is invalid

                    const messageDateString = messageDate.toLocaleDateString();
                    const showDateDivider = lastDate !== messageDateString;
                    lastDate = messageDateString;

                    return (
                        <React.Fragment key={index}>
                            {showDateDivider && (
                                <div className="date-separator">
                                    {messageDateString}
                                </div>
                            )}
                            <Message
                                username={msg.username}
                                text={msg.text}
                                dateTime={msg.dateTime}
                            />
                        </React.Fragment>
                    );
                })}
        </div>
    );
}

export default ChatContainer;
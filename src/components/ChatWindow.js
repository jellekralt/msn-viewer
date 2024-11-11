import React from "react";
import Message from "./Message";

function ChatWindow({ messages }) {
    let lastDate = null;

    return (
        <div className="chat-container">
            {messages.map((msg, index) => {
                const messageDate = new Date(msg.dateTime).toLocaleDateString();
                const showDateSeparator = lastDate !== messageDate;
                lastDate = messageDate;

                return (
                    <div key={index}>
                        {showDateSeparator && (
                            <div className="date-separator">{messageDate}</div>
                        )}
                        <Message msg={msg} />
                    </div>
                );
            })}
        </div>
    );
}

export default ChatWindow;
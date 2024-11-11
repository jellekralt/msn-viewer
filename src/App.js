import React, { useState } from "react";
import TitleBar from "./components/TitleBar";
import Toolbar from "./components/Toolbar";
import WarningBar from "./components/WarningBar";
import ChatContainer from "./components/ChatContainer";
import InputArea from "./components/InputArea";

function App() {
    const [messages, setMessages] = useState([]);

    const handleFileLoad = (xmlData) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, "text/xml");
        const messagesArray = [];
        let lastDate = null;

        Array.from(xmlDoc.getElementsByTagName("Message")).forEach((msg) => {
            const dateTime = msg.getAttribute("DateTime");
            const fromUser = msg.getElementsByTagName("From")[0]?.getElementsByTagName("User")[0];
            const textElement = msg.getElementsByTagName("Text")[0];

            if (dateTime && fromUser && textElement) {
                const messageDate = new Date(dateTime);
                const messageDateString = messageDate.toLocaleDateString();

                // Add a date divider if the message is from a new day
                if (lastDate !== messageDateString) {
                    messagesArray.push({ dateDivider: messageDateString });
                    lastDate = messageDateString;
                }

                messagesArray.push({
                    dateTime: dateTime,
                    username: fromUser.getAttribute("FriendlyName"),
                    text: textElement.textContent,
                });
            }
        });

        setMessages(messagesArray);
    };

    return (
        <div className="msn-window">
            <TitleBar />
            <Toolbar />
            <WarningBar />
            <ChatContainer messages={messages} />
            <InputArea onFileLoad={handleFileLoad} />
        </div>
    );
}

export default App;
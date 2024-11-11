import React, { useState } from "react";
import TitleBar from "./components/TitleBar/TitleBar";
import Toolbar from "./components/Toolbar/Toolbar";
import WarningBar from "./components/WarningBar/WarningBar";
import ChatContainer from "./components/ChatContainer/ChatContainer";
import InputArea from "./components/InputArea/InputArea";
import LastMessage from "./components/LastMessage/LastMessage";

const appName = 'MSN Messenger';

function App() {
    const [messages, setMessages] = useState([]);
    const [chatTitle, setChatTitle] = useState(appName);
    const [lastMessageDate, setLastMessageDate] = useState(null);

    const handleFileLoad = (xmlData, filename) => {
        // Extract username from filename (remove .xml and any trailing numbers)
        const username = filename.replace(/\.xml$/, "").replace(/\d+$/, "");
        setChatTitle(`${appName} - ${username}`);

        // Parse XML and set messages
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, "text/xml");
        const messagesArray = [];

        Array.from(xmlDoc.getElementsByTagName("Message")).forEach((msg) => {
            const dateTime = msg.getAttribute("DateTime");
            const fromUser = msg.getElementsByTagName("From")[0]?.getElementsByTagName("User")[0];
            const textElement = msg.getElementsByTagName("Text")[0];

            if (dateTime && fromUser && textElement) {
                messagesArray.push({
                    dateTime: dateTime,
                    username: fromUser.getAttribute("FriendlyName"),
                    text: textElement.textContent,
                });
            }
        });

        // Set the last message's date if there are messages
        if (messagesArray.length > 0) {
            setLastMessageDate(messagesArray[messagesArray.length - 1].dateTime);
        }

        setMessages(messagesArray);
    };

    return (
        <div>
            <div className="msn-window">
                <TitleBar chatTitle={chatTitle} />
                <Toolbar />
                <WarningBar />
                <ChatContainer messages={messages} />
                <LastMessage lastMessageDate={lastMessageDate} />
                <div className="input-section"> 
                    <InputArea onFileLoad={handleFileLoad} />
                </div>
            </div>
            <div className="footer">
                By <a href="https://jellekralt.com" target="_blank" rel="noreferrer">jellekralt.com</a> &middot; <a href="https://github.com/jellekralt/msn-viewer" target="_blank" rel="noreferrer">View code on Github</a></div>
        </div>
    );
}

export default App;
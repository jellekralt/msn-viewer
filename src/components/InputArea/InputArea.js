import React from "react";
import "./InputArea.css";

function InputArea({ onFileLoad }) {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "text/xml") {
            const reader = new FileReader();
            reader.onload = (e) => onFileLoad(e.target.result, file.name);
            reader.readAsText(file);
        } else {
            alert("Please upload a valid XML file.");
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type === "text/xml") {
            const reader = new FileReader();
            reader.onload = (e) => onFileLoad(e.target.result, file.name);
            reader.readAsText(file);
        } else {
            alert("Please upload a valid XML file.");
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div className="input-area" onDrop={handleDrop} onDragOver={handleDragOver}>
            <input type="file" onChange={handleFileChange} accept=".xml" style={{ display: "none" }} id="fileInput" />
            <label htmlFor="fileInput" className="file-label">Choose File</label>
            <span className="file-name">Or drag and drop an XML file here</span>
        </div>
    );
}

export default InputArea;
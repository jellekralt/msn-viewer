import React from "react";

function FileInput({ onFileLoad }) {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "text/xml") {
            const reader = new FileReader();
            reader.onload = (e) => onFileLoad(e.target.result);
            reader.readAsText(file);
        } else {
            alert("Please upload a valid XML file.");
        }
    };

    return (
        <div className="input-area">
            <input type="file" onChange={handleFileChange} accept=".xml" />
        </div>
    );
}

export default FileInput;
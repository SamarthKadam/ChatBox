import React, { useState } from 'react';

export default function ChatComponent() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSend = () => {
    if (selectedFile) {
      // Send the selected file content to the server
      console.log('Sending file:', selectedFile);
      // Implement your file sending logic here
    }
  };

  const handleFileInputChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div>
      <input type="file" onChange={handleFileInputChange} />
      <button onClick={handleFileSend}>Send File</button>
    </div>
  );
}

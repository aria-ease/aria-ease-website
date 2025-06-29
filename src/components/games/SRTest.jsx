import { useState } from "react";

const ScreenReaderSimulator = () => {
    const [text, setText] = useState("");
  
    const handleRead = () => {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    };
  
    return (
      <div className="bg-black p-6 rounded-lg max-w-md mx-auto">
        <h3 className="text-white text-lg mb-4">🗣️ Screen Reader Simulation</h3>
        <p className="text-gray-400 mb-2">Type something and hear how a screen reader would read it.</p>
  
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 bg-gray-800 text-white rounded border focus:border-white focus:outline-none"
          rows={3}
          placeholder="Type something..."
        ></textarea>
  
        <button
          onClick={handleRead}
          className="w-full p-3 mt-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
        >
          🔊 Read Aloud
        </button>
      </div>
    );
  };
  
  export default ScreenReaderSimulator;  
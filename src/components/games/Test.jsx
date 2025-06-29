import { useState } from "react";

const accessibilityItems = [
  { id: 1, label: "Button with `<div>`", accessible: false },
  { id: 2, label: "Proper `<button>`", accessible: true },
  { id: 3, label: "Image without alt text", accessible: false },
  { id: 4, label: "Image with `alt`", accessible: true },
];

const AccessibilityGame = () => {
  const [feedback, setFeedback] = useState({});

  const handleSelect = (id, isAccessible) => {
    setFeedback((prev) => ({
      ...prev,
      [id]: isAccessible
        ? "✅ Correct! This element is accessible."
        : "❌ Not quite! This element lacks proper semantics.",
    }));
  };

  return (
    <div className="bg-black p-6 rounded-lg max-w-md mx-auto">
      <h3 className="text-white text-lg mb-4">🧐 Test Your Accessibility Knowledge</h3>
      <p className="text-gray-400 mb-2">Select the accessible elements:</p>

      <div className="space-y-3">
        {accessibilityItems.map(({ id, label, accessible }) => (
          <button
            key={id}
            className="w-full p-3 bg-gray-800 text-white rounded border hover:bg-gray-700 transition"
            onClick={() => handleSelect(id, accessible)}
          >
            {label}
          </button>
        ))}
      </div>

      {Object.entries(feedback).map(([id, msg]) => (
        <p key={id} className="mt-2 text-sm text-gray-400">
          {msg}
        </p>
      ))}
    </div>
  );
};

export default AccessibilityGame;
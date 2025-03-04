import React, { useState } from "react";
import axios from "axios";
import TopNav from "./TopNav";
import Footer from "./Footer";

const TotoAI = () => {
  const [prompt, setPrompt] = useState(""); // State to store user input
  const [responseText, setResponseText] = useState(""); // State to store AI response
  const [loading, setLoading] = useState(false); // Loading state

  async function generateAnswer() {
    if (!prompt) {
      alert("Please enter a prompt.");
      return;
    }

    setLoading(true); // Show loading state
    setResponseText(""); // Clear previous response

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBKp-Osp_2HvkQ50niNPZvZUICQmulKx54",
        {
          contents: [{ parts: [{ text: prompt }] }], // Sending user prompt
        }
      );

      setResponseText(response.data.candidates[0]?.content.parts[0]?.text || "No response");
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponseText("Failed to get a response. Try again.");
    } finally {
      setLoading(false); // Hide loading state
    }
  }

  return (
    <div className="text-center">
      <TopNav />
      <h1 className="text-5xl my-5 font-bold">TotoAI</h1>

      {/* Input field */}
      <input
        type="text"
        placeholder="Enter your question..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full max-w-2xl p-3 border border-gray-300 rounded-lg text-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
      />

      {/* Generate button */}
      <br />
      <button
        onClick={generateAnswer}
        className="mt-4 px-6 py-2 bg-red-400 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-red-500 transition"
      >
        Generate
      </button>

      {/* Response Section */}
      <div className="max-w-2xl mx-auto mt-5 p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-md text-left">
        <strong className="text-lg">Response:</strong>
        <p className={`mt-2 whitespace-pre-wrap break-words ${loading ? "text-gray-400" : "text-black"}`}>
          {loading ? "Loading..." : responseText}
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default TotoAI;

"use client";
import React, { useEffect, useState } from "react";

const ApplicationShedule = ({ application, showSchedule }) => {
  //  NEW STATES
  const [interviewScore, setInterviewScore] = useState("");
  const [interviewComment, setInterviewComment] = useState("");

  // NEW STATES
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [interviewType, setInterviewType] = useState("Online");
  const [interviewLink, setInterviewLink] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    const interviewData = {
      applicationId: application?._id,
      userEmail: application?.email,
      score: interviewScore,
      comment: interviewComment,
      interviewDate,
      interviewTime,
      interviewType,
      interviewLink,
    };

    console.log("handleSubmit", interviewData);

    const res = await fetch("/api/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(interviewData),
    });

    if (res.ok) {
      alert("Interview Scheduled Successfully");
    }
  };



  return (
    <section>
      {showSchedule && (
        <form onSubmit={handleSubmit} action="">
          {/*  INTERVIEW SCORE & COMMENT SECTION */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-sm font-bold text-blue-700 mb-3">
              Interview Evaluation
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">
                  Interview Score (0–100)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  value={interviewScore}
                  onChange={(e) => setInterviewScore(e.target.value)}
                  className="w-full p-2 border rounded text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">
                  Interview Comment
                </label>
                <textarea
                  rows="3"
                  value={interviewComment}
                  required
                  onChange={(e) => setInterviewComment(e.target.value)}
                  className="w-full p-2 border rounded text-sm"
                  placeholder="Candidate performance, communication, skills..."
                />
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-sm font-bold mb-3">Schedule Interview</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="date"
                value={interviewDate}
                required
                onChange={(e) => setInterviewDate(e.target.value)}
                className="p-2 border rounded"
              />

              <input
                type="time"
                value={interviewTime}
                required
                onChange={(e) => setInterviewTime(e.target.value)}
                className="p-2 border rounded"
              />

              <select
                value={interviewType}
                required
                onChange={(e) => setInterviewType(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="Online">Online</option>
                <option value="Onsite">Onsite</option>
              </select>

              <input
                type="text"
                placeholder="Meeting link / Office address"
                value={interviewLink}
                required
                onChange={(e) => setInterviewLink(e.target.value)}
                className="p-2 border rounded"
              />
            </div>

            <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
              Schedule Interview
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default ApplicationShedule;

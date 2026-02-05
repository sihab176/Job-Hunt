"use client";
import React, { useState } from "react";

const AddJObForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    activelyHiring: false,
    workFromHome: false,
    stipend: "",
    duration: "",
    description: "",
    skills: "",
    postedToday: false,
    earlyApplicant: false,
    location: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      skills: formData.skills.split(",").map((skill) => skill.trim()),
    };
    // console.log("Form Submitted:", finalData);

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalData),
    });
    if (res.ok) {
      console.log("Job posted successfully");
      alert("Job posted successfully");
      setFormData({
        title: "",
        company: "",
        activelyHiring: false,
        workFromHome: false,
        stipend: "",
        duration: "",
        description: "",
        skills: "",
        postedToday: false,
        earlyApplicant: false,
        location: "",
        email: "",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-purple-800 border-b border-gray-200 pb-2 ">
        Post New Job
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title & Company */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded-md mt-1 focus:ring-2 focus:ring-purple-800 outline-none"
              placeholder="e.g. Copywriting"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded-md mt-1 focus:ring-2 focus:ring-purple-800 outline-none"
              placeholder="e.g. InAmigos Foundation"
              required
            />
          </div>
        </div>

        {/* Stipend & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stipend Range
            </label>
            <input
              type="text"
              name="stipend"
              value={formData.stipend}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded-md mt-1 focus:ring-2 focus:ring-purple-800 outline-none"
              placeholder="e.g. ₹ 4,000 - 6,000 /month"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded-md mt-1 focus:ring-2 focus:ring-purple-800 outline-none"
              placeholder="e.g. 2 Weeks"
              required
            />
          </div>
        </div>
        {/* location & email*/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded-md mt-1 focus:ring-2 focus:ring-purple-800 outline-none"
              placeholder="Enter location"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded-md mt-1 focus:ring-2 focus:ring-purple-800 outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 border border-gray-400 rounded-md mt-1 focus:ring-2 focus:ring-purple-800 outline-none"
            placeholder="Describe the role..."
            required
          ></textarea>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Skills (Comma separated)
          </label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full p-2 border border-gray-400 rounded-md mt-1 focus:ring-2 focus:ring-purple-800 outline-none"
            placeholder="Content Writing, SEO, English"
            required
          />
        </div>

        {/* Checkboxes */}
        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="activelyHiring"
              checked={formData.activelyHiring}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">Actively Hiring</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="workFromHome"
              checked={formData.workFromHome}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">Work From Home</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="postedToday"
              checked={formData.postedToday}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">Posted Today</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="earlyApplicant"
              checked={formData.earlyApplicant}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">Early Applicant</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-900 text-white font-bold py-2 px-4 rounded-md hover:opacity-90 transition duration-200"
        >
          Create Internship Post
        </button>
      </form>
    </div>
  );
};

export default AddJObForm;

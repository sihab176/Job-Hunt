"use client"
import { useState } from "react";
import AllJobs from "./AllJobs";

export default function JobListings() {
  const [workFromHome, setWorkFromHome] = useState(true);
  const [partTime, setPartTime] = useState(false);
  const [minStipend, setMinStipend] = useState(0);

  

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Header */}
              <div className="flex items-center gap-2 mb-6">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              </div>

              {/* Preferences Checkbox */}
              <div className="mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">
                    As per my <span className="text-blue-500">preferences</span>
                  </span>
                </label>
              </div>

              {/* Profile */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Profile
                </label>
                <input
                  type="text"
                  placeholder="e.g. Marketing"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Delhi"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Work From Home */}
              <div className="mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={workFromHome}
                    onChange={(e) => setWorkFromHome(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Work from home</span>
                </label>
              </div>

              {/* Part-time */}
              <div className="mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={partTime}
                    onChange={(e) => setPartTime(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Part-time</span>
                </label>
              </div>

              {/* Desired minimum monthly stipend */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Desired minimum monthly stipend (₹)
                </label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="1000"
                  value={minStipend}
                  onChange={(e) => setMinStipend(parseInt(e.target.value))}
                  className="w-full h-2 bg-blue-500 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-2">
                  <span>0</span>
                  <span>2K</span>
                  <span>4K</span>
                  <span>6K</span>
                  <span>8K</span>
                  <span>10K</span>
                </div>
              </div>

              {/* View more filters */}
              <button className="text-blue-500 text-sm font-medium flex items-center gap-1 mb-6">
                View more filters
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Clear all */}
              <div className="text-right">
                <button className="text-blue-500 text-sm font-medium">
                  Clear all
                </button>
              </div>

              {/* Keyword Search */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-base font-semibold text-gray-900 mb-4">
                  Keyword Search
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Design, Mumbai, Infosys"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <AllJobs/>
        </div>
      </div>
    </div>
  );
}

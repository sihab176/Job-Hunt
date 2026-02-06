"use client";
import { useEffect, useState } from "react";
import AllJobs from "./AllJobs";

export default function JobListings() {
  const [workFromHome, setWorkFromHome] = useState(false);
  const [partTime, setPartTime] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [keywordFilter, setKeywordFilter] = useState("");

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getFunc = async () => {
      const params = new URLSearchParams({
        workFromHome,
        partTime,
        jobTitle,
        location: locationFilter,
        keyword: keywordFilter,
      });
      console.log("params", params);

      const res = await fetch("/api/jobs?" + params.toString());
      const data = await res.json();
      // console.log("data all", data);
      setJobs(data);
    };
    getFunc();
  }, [workFromHome, partTime, jobTitle, locationFilter, keywordFilter]);

  const clearAll = () => {
    setWorkFromHome(false);
    setPartTime(false);
    setJobTitle("");
    setLocationFilter("");
    setKeywordFilter("");
  };

  return (
    <div className="min-h-screen bg-gray-50/20 px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 ">
          {/* Filters Sidebar */}
          <div className="w-80 shrink-0 md:sticky md:top-20 md:h-fit">
            <div className="bg-white rounded-lg shadow-sm p-6">
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

              {/* profiles */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  profiles
                </label>
                <input
                  type="text"
                  placeholder="e.g. web developer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* location */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dhaka"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Keyword Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Keyword Search
                </label>
                <input
                  type="text"
                  placeholder="e.g. Design, Marketing"
                  value={keywordFilter}
                  onChange={(e) => setKeywordFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Clear All */}
              <div className="text-right">
                <button
                  className="text-blue-500 text-sm font-medium cursor-pointer"
                  onClick={clearAll}
                >
                  Clear all
                </button>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <AllJobs jobs={jobs} />
        </div>
      </div>
    </div>
  );
}

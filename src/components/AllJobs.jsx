"use client";
import React, { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import SubmitModal from "./SubmitModal";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AllJobs = ({ jobs }) => {
  // const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleUpdateJob = (job) => {
    if (!session?.user) {
      router.push("/login");
    }
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  return (
    <div className="flex-1">
      <div className="space-y-4">
        {jobs?.map((job) => (
          <div
            key={job._id}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {job.title}
                </h3>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-gray-600 text-sm">{job.company}</span>
                  {job.activelyHiring && (
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded border border-blue-200">
                      Actively hiring
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-3 flex items-center gap-2 ">
                    <span>
                      <IoLocationOutline size={17} />
                    </span>{" "}
                    {job.location}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
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
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    <span>
                      {job.workFromHome ? "Work from home" : "Office"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
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
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{job.stipend}</span>
                  </div>
                  <div className="flex items-center gap-1">
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{job.duration}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 mb-4">
                  <svg
                    className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-sm text-gray-400">{job.description}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="text-xs text-gray-600">
                      {skill}
                      {index < job.skills.length - 1 && (
                        <span className="ml-2">•</span>
                      )}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-green-600 text-sm">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Today</span>
                  </div>
                  {job.earlyApplicant && (
                    <div className="flex items-center gap-1 text-amber-600 text-sm">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                      </svg>
                      <span>Be an early applicant</span>
                    </div>
                  )}
                </div>
              </div>

              {/* apply button */}
              <div className="ml-4">
                <button
                  // onClick={() => {
                  //   setSelectedJob(job);
                  //   setIsModalOpen(true);
                  // }}
                  onClick={() => handleUpdateJob(job)}
                  className=" active:scale-95 transition-all duration-150 cursor-pointer px-4 py-2 bg-gradient-to-br from-purple-950 via-purple-700 to-purple-950 text-white text-sm rounded flex items-center justify-center"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Modal */}
        <SubmitModal
          isModalOpen={isModalOpen}
          setIsModalOpen={() => setIsModalOpen(false)}
          selectedJob={selectedJob}
        />
        {/* {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
              <h2 className="text-lg font-semibold mb-2">
                Apply for {selectedJob?.title}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Company: {selectedJob?.company}
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded border text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    // apply logic ekhane hobe
                    setIsModalOpen(false);
                  }}
                  className="px-4 py-2 rounded bg-purple-700 text-white hover:bg-purple-800"
                >
                  Confirm Apply
                </button>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default AllJobs;

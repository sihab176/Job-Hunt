"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const SubmitModal = ({ isModalOpen, setIsModalOpen, selectedJob }) => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  // console.log("status", session);

  const [formData, setFormData] = useState({
    fullName: "",
  
    phone: "",
    expectedSalary: "",
    linkedin: "",
    portfolio: "",
    coverLetter: "",
    // jobTitle: selectedJob?.title,
    // jobId: selectedJob?._id,
    // jobCompany: selectedJob?.company,
    // status: "Pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.jobId = selectedJob?._id;
    formData.jobCompany = selectedJob?.company;
    formData.jobTitle = selectedJob?.title;
    formData.email = session?.user?.email;
    formData.status = "Pending";

    console.log("formData",formData);

    // const res = await fetch("/api/application", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // });
    // const data = await res.json();
    // console.log("Application Submitted:", data);

    // alert("Application Sent Successfully!");
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setFormData({
      fullName: "",
      phone: "",
      expectedSalary: "",
      linkedin: "",
      portfolio: "",
      jobTitle: "",
      coverLetter: "",
      jobId: "",
      jobCompany: "",
    });
    setIsModalOpen(false);
  };

  // console.log("seleectd job",selectedJob);

  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative">
            <h2 className="text-lg font-semibold mb-2">
              Apply for :{" "}
              <span className="text-gray-500">{selectedJob?.title}</span>
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Company:{" "}
              <span className="text-purple-500">{selectedJob?.company}</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 ">
              {/* Full Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    readOnly
                    value={session?.user?.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Phone & Salary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 1XXX XXXXXX"
                    className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Expected Salary
                  </label>
                  <input
                    type="text"
                    name="expectedSalary"
                    required
                    value={formData.expectedSalary}
                    onChange={handleChange}
                    placeholder="e.g. 20,000 BDT"
                    className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* LinkedIn & Portfolio */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    required
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Portfolio / GitHub
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    required
                    value={formData.portfolio}
                    onChange={handleChange}
                    placeholder="https://github.com/username"
                    className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cover Letter
                </label>
                <textarea
                  name="coverLetter"
                  rows="5"
                  required
                  value={formData.coverLetter}
                  onChange={handleChange}
                  placeholder="Tell us why you're a good fit..."
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                ></textarea>
              </div>

              {/* Submit Button with Animation */}
              <button
                type="submit"
                className="w-full cursor-pointer px-6 py-4 bg-gradient-to-br from-purple-950 via-purple-700 to-purple-950 text-white font-bold rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-all duration-150 hover:opacity-90"
              >
                Submit Application
              </button>
            </form>

            {/* buttons */}
            <div className="">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4  text-3xl cursor-pointer"
              >
                x
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitModal;

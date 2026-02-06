"use client";
import React, { useState } from "react";
import { IoLogoGithub, IoLogoLinkedin, IoMail } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
import { ImFileText2 } from "react-icons/im";
import ApplicationShedule from "./ApplicationShedule";
import Swal from "sweetalert2";

const ApplicationCard = ({ application, pageLoad, setPageLoad }) => {
  const [status, setStatus] = useState("Pending");
  const [showSchedule, setShowSchedule] = useState(false);

  const getStatusColor = (currentStatus) => {
    switch (currentStatus) {
      case "Selected":
        return "bg-green-100 text-green-700 border-green-200";
      case "Rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`/api/application/${id}`, {
          method: "DELETE",
        });
        setPageLoad(!pageLoad);
        console.log("id deleted", id);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  // console.log("application-------------------->", application);
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md border border-gray-200 rounded-xl p-6 mb-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* Left Side */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-800">
              {application.fullName}
            </h2>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                status,
              )}`}
            >
              {status}
            </span>
          </div>

          <div className="text-sm text-gray-600 space-y-2">
            <div className="flex items-center gap-2">
              <IoMail /> {application.email}
            </div>
            <div className="flex items-center gap-2">
              <FaPhoneAlt /> {application.phone}
            </div>
            <div className="flex items-center gap-2">
              <RiMoneyDollarCircleLine />
              Expected Salary: ৳{application.expectedSalary}
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <a
              href={application.linkedin}
              target="_blank"
              className="text-blue-600 text-sm"
            >
              <IoLogoLinkedin /> LinkedIn
            </a>
            <a
              href={application.portfolio}
              target="_blank"
              className="text-gray-800 text-sm"
            >
              <IoLogoGithub /> Portfolio
            </a>
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-400 uppercase">
            Update Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-32 p-2 border rounded-lg text-sm"
          >
            <option value="Pending">Pending</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>

          <button
            onClick={() => handleDelete(application._id)}
            className="block w-full mt-2 text-sm px-4 py-2 bg-red-600 text-white rounded"
          >
            DELETE
          </button>
        </div>
      </div>

      {/* Cover Letter */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border-l-4 border-purple-500">
        <div className="flex items-center gap-2 mb-2 font-semibold text-sm">
          <ImFileText2 /> Cover Letter
        </div>
        <p className="text-sm text-gray-600 whitespace-pre-line">
          {application.coverLetter}
        </p>
      </div>
      <div>
        <button
          onClick={() => setShowSchedule(!showSchedule)}
          className="block w-full mt-3 text-sm px-4 py-2 bg-gradient-to-r from-purple-700 to-pink-800 text-white rounded cursor-pointer"
        >
          GIVE FEEDBACK & SCHEDULE INTERVIEW
        </button>
      </div>

      {/*  */}
      <ApplicationShedule
        application={application}
        showSchedule={showSchedule}
      />
    </div>
  );
};

export default ApplicationCard;

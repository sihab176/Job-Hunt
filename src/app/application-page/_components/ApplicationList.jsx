"use client"
import React, { useEffect, useState } from 'react'
import ApplicationCard from './ApplicationCard'


const ApplicationList = () => {
    const [applications, setApplications] = useState([])
    useEffect(() => {
        const fetchApplications = async () => {
            const res = await fetch("/api/application")
            const data = await res.json()
            setApplications(data)
        }
        fetchApplications()
    }, [])
    console.log("applicaton List",applications)


  return (
      <div>
          {applications.map((application) => (
              <ApplicationCard key={application._id} application={application} />
          ))}
    </div>
  )
}

export default ApplicationList
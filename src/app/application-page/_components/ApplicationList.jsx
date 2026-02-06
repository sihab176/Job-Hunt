"use client"
import React, { useEffect, useState } from 'react'
import ApplicationCard from './ApplicationCard'


const ApplicationList = () => {
    const [pageLoad,setPageLoad] = useState(false)
    const [applications, setApplications] = useState([])
    useEffect(() => {
        const fetchApplications = async () => {
            const res = await fetch("/api/application")
            const data = await res.json()
            setApplications(data)
        }
        fetchApplications()
    }, [pageLoad])
    console.log("applicaton List",applications)


  return (
      <div>
          {applications.map((application) => (
              <ApplicationCard key={application._id} application={application} pageLoad={pageLoad} setPageLoad={setPageLoad} />
          ))}
    </div>
  )
}

export default ApplicationList
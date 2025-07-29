'use client'


import logs from '../../pages/logs';
import styles from "./page.module.css"; // Import the CSS Module

import React, { useEffect, useState } from "react";
import axios from "axios";
// app/page.tsx

export default function Home() {
  type Log = {
  url: string;
  importDateTime: string; // or 'Date' if you convert it to a Date object
  totalFetched: number;
  newJobs: number;
  updatedJobs: number;
  failedJobs: number;
};
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {

const fetchLogs = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/logs");

    // Extract and process the logs data
    const logsData = response.data.logs[0]?.logs || {};
    const formattedLogs: Log[] = Object.keys(logsData).map((url) => ({
      url,
      importDateTime: logsData[url].timestamp,
      totalFetched: logsData[url].totalFetched,
      newJobs: logsData[url].newJobs,
      updatedJobs: logsData[url].updatedJobs,
      failedJobs: logsData[url].failedJobs.length,
    }));

    setLogs(formattedLogs);
  } catch (error) {
    console.error("Error fetching logs:", error);
  } finally {
    setLoading(false);
  }
};


    fetchLogs();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className={styles.container}>
      <h1>Job Logs</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>URL</th>
            <th>Import Date/Time</th>
            <th>Total Fetched</th>
            <th>New Jobs</th>
            <th>Updated Jobs</th>
            <th>Failed Jobs</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.url}</td>
              <td>{log.importDateTime}</td>
              <td>{log.totalFetched}</td>
              <td>{log.newJobs}</td>
              <td>{log.updatedJobs}</td>
              <td>{log.failedJobs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
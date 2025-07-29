import React, { useEffect, useState } from "react";
import axios from "axios";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the API
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/logs");
        // Extract and process the logs data
        const logsData = response.data.logs[0]?.logs || {};
        const formattedLogs = Object.keys(logsData).map((url) => ({
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
    <div>
      <h1>Job Logs</h1>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
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
              <td>{new Date(log.importDateTime).toLocaleString()}</td>
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
};

export default Logs;

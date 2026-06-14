import { useEffect, useState } from "react";
import JobList from "../components/JobList";
import SearchBar from "../components/SearchBar";
import API from "../services/userService";

function Jobs() {

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 
  useEffect(() => {

    const fetchJobs = async () => {

      try {

        setLoading(true);

        const response = await API.get("/jobs");

        setJobs(response.data);
        setFilteredJobs(response.data);

      } catch (error) {

        console.log("Error fetching jobs:", error);
        setError("Failed to load jobs");

      } finally {

        setLoading(false);

      }
    };

    fetchJobs();

  }, []);

  
  const handleSearch = (text) => {

    const filtered = jobs.filter((job) =>

      job.title?.toLowerCase().includes(text.toLowerCase()) ||
      job.company?.toLowerCase().includes(text.toLowerCase()) ||
      job.location?.toLowerCase().includes(text.toLowerCase())

    );

    setFilteredJobs(filtered);
  };

  return (

    <div className="container">

      <h2 style={{ marginBottom: "10px" }}>
        Available Jobs
      </h2>

      <p style={{ color: "#64748b", marginBottom: "20px" }}>
        Find and apply to latest opportunities
      </p>

      <SearchBar onSearch={handleSearch} />

      {loading && (
        <p style={{ textAlign: "center" }}>
          Loading jobs...
        </p>
      )}

      {error && (
        <p style={{ color: "red", textAlign: "center" }}>
          {error}
        </p>
      )}

      {!loading && !error && filteredJobs.length === 0 && (
        <p style={{ textAlign: "center" }}>
          No jobs found
        </p>
      )}

      {!loading && !error && filteredJobs.length > 0 && (
        <JobList jobs={filteredJobs} />
      )}

    </div>
  );
}

export default Jobs;
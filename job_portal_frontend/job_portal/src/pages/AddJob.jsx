

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/userService";

function AddJob() {

  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    salary: ""
  });

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    setJob({
      ...job,
      [e.target.name]: e.target.value
    });
  };

  // HANDLE FORM SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      // SEND DATA TO BACKEND
      await API.post("/jobs", job);

      alert("Job Posted Successfully!");

      // REDIRECT
      navigate("/jobs");

    } catch (error) {

      console.log("POST JOB ERROR:", error);

      alert("Failed to post job");
    }
  };

  return (

    <div className="container">

      <div className="card">

        <h2>Post a Job</h2>

        <form onSubmit={handleSubmit}>

          {/* JOB TITLE */}
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={job.title}
            onChange={handleChange}
            required
          />

          {/* COMPANY */}
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={job.company}
            onChange={handleChange}
            required
          />

          {/* LOCATION */}
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={job.location}
            onChange={handleChange}
            required
          />

          {/* SALARY */}
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={job.salary}
            onChange={handleChange}
            required
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Job Description"
            value={job.description}
            onChange={handleChange}
            required
            rows="5"
          />

          {/* SUBMIT BUTTON */}
          <button type="submit">

            Post Job

          </button>

        </form>

      </div>

    </div>
  );
}

export default AddJob;
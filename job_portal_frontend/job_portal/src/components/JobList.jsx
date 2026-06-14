import JobCard from "./JobCard";

function JobList({ jobs }) {

  // safety check
  if (!jobs || jobs.length === 0) {
    return <p>No jobs available</p>;
  }

  return (

    <div className="job-list">

      {jobs.map((job) => (

        <JobCard
          key={job.id}
          job={job}
        />

      ))}

    </div>
  );
}

export default JobList;
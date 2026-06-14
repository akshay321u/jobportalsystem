import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">

     
      <section className="hero">

        <h1>Find Your Dream Job Faster</h1>

        <p>
          Discover top opportunities from leading companies or post jobs as an employer.
        </p>

        <div className="hero-buttons">

          <Link to="/jobs">
            <button>Browse Jobs</button>
          </Link>

          <Link to="/register">
            <button className="secondary-btn">
              I’m a Job Seeker
            </button>
          </Link>

        </div>

      </section>


      
      <section className="container" style={{ textAlign: "center", marginTop: "50px" }}>

        <h2>Are You Hiring?</h2>

        <p style={{ color: "#64748b", marginBottom: "20px" }}>
          Post jobs and find the right candidates quickly.
        </p>

        <Link to="/register">
          <button>
            Join as Employer
          </button>
        </Link>

      </section>

    </div>
  );
}

export default Home;
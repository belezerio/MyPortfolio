import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Freelance Full Stack Developer</h4>
                <h5>HealthBridge — Hospital Management System</h5>
              </div>
              <h3>2025–26</h3>
            </div>
            <p>
              Built a production-grade hospital management platform using React,
              Node.js, and Supabase. Implemented role-based access control and
              authentication for doctors, staff, and patients. Managed deployment
              and client requirements for real-world production use.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Hackathon Participant</h4>
                <h5>IIIT Allahabad & Vadodara</h5>
              </div>
              <h3>2023–24</h3>
            </div>
            <p>
              Built real-time applications under 48-hour deadlines in team
              environments. Worked on backend APIs, database integration, and
              Git workflows across multiple hackathons.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in AI</h4>
                <h5>Parul Institute of Technology</h5>
              </div>
              <h3>2022–26</h3>
            </div>
            <p>
              Bachelor of Technology in Artificial Intelligence — CGPA: 8.69/10.
              Led a team of 4 to build a real-time campus navigation app (GoGuide)
              with live professor tracking. Active in competitive programming
              with 450+ LeetCode problems solved (Contest Rating 1615, Top 21%).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;

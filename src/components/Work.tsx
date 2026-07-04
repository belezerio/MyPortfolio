import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { MdArrowOutward, MdClose } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import "./styles/Work.css";

interface TechDetails {
  frontend: string;
  backend: string;
  database: string;
  cloud: string;
}

interface Project {
  title: string;
  category: string;
  filterCategory: string;
  tech: TechDetails;
  description: string;
  features: string[];
  image: string;
  link?: string;
  github?: string;
  accentColor: string;
}

const projects: Project[] = [
  {
    title: "JFL Digital",
    category: "Marketing Agency Website",
    filterCategory: "Frontend",
    tech: {
      frontend: "React, Next Js , GSAP",
      backend: "None (Static Page)",
      database: "None",
      cloud: "Vercel, Git",
    },
    description: "Complete modern redesign for JFL Digital marketing agency, emphasizing visual storytelling, smooth transitions, and premium aesthetics.",
    features: [
      "Custom high-fidelity media carousel and slider animations",
      "Sleek dark-mode aesthetic with immersive scroll-driven effects",
      "Integrated live communication widgets including WhatsApp",
      "Fully responsive architecture optimized for all device viewports",
    ],
    image: "/images/jfldigital.png",
    link: "https://www.jfldigital.com",
    accentColor: "#ec4899",
  },
  {
    title: "HealthBridge",
    category: "Full-Stack Hospital Platform",
    filterCategory: "Full-Stack",
    tech: {
      frontend: "React, CSS Modules",
      backend: "Node.js, Express",
      database: "Supabase (PostgreSQL)",
      cloud: "AWS (S3, EC2)",
    },
    description: "Hospital appointment booking, doctor-patient connect, lab & pharmacy orders.",
    features: [
      "Role-based access control (Admin, Doctor, Patient)",
      "Real-time appointment scheduling & confirmations",
      "Digital laboratory reports & pharmacy prescription dispatch",
      "Secure payment integration & billing history",
    ],
    image: "/images/healthbridge.png",
    link: "https://healthbridg.com",
    github: "https://github.com/belezerio/SIOMS",
    accentColor: "#14b8a6",
  },
  {
    title: "Isya",
    category: "GenZ E-Commerce Jewellery",
    filterCategory: "Frontend / E-Commerce",
    tech: {
      frontend: "React, Vanilla CSS",
      backend: "Shopify Storefront API",
      database: "Shopify CMS",
      cloud: "Vercel, Git",
    },
    description: "High-fidelity e-commerce experience with Shopify backend.",
    features: [
      "Dynamic cart & smooth checkout flow",
      "Interactive 3D preview of jewellery pieces",
      "Collection-based filtering & instant search",
      "Responsive, mobile-first fluid layout",
    ],
    image: "/images/isya.png",
    link: "https://jewellery-store-nu.vercel.app/",
    accentColor: "#f59e0b",
  },
  
  {
    title: "GoGuide",
    category: "Campus Mobile App",
    filterCategory: "Mobile",
    tech: {
      frontend: "React Native, Expo",
      backend: "Node.js, Express",
      database: "MongoDB Atlas",
      cloud: "Google Maps API",
    },
    description: "Cross-platform campus directory with live teacher tracking, food locations, attendance calculator, and ticket booking.",
    features: [
      "Interactive indoor campus map with navigation routes",
      "Real-time GPS tracking of active faculty & staff",
      "Integrated attendance tracker & grade calculator",
      "Campus event list & in-app ticket reservations",
    ],
    image: "/images/goguide.png",
    github: "https://github.com/belezerio/GoGuideApp",
    accentColor: "#3b82f6",
  },
  {
    title: "VehicleInsurance System",
    category: "Enterprise Insurance System",
    filterCategory: "Full-Stack",
    tech: {
      frontend: "React, TypeScript",
      backend: "ASP.NET Core Web API, EF Core",
      database: "Microsoft SQL Server",
      cloud: "Azure App Services, NUnit",
    },
    description: "Secure management of policies, claims, premium payments, customer info, and approvals.",
    features: [
      "Enterprise RBAC with secure JWT-based authentication",
      "Automated claim assessment workflows & approvals",
      "Premium billing calculations & secure payment logging",
      "Comprehensive reporting & policy history audit logs",
    ],
    image: "/images/vehicle_insurance.png",
    github: "https://github.com/belezerio/VehicleInsurance",
    accentColor: "#0284c7",
  },
  {
    title: "Novatix",
    category: "Event Ticket Booking System",
    filterCategory: "Full-Stack",
    tech: {
      frontend: "React, Bootstrap, Axios",
      backend: "ASP.NET Core, C#, JWT Auth",
      database: "SQL Server, EF Core",
      cloud: "Git, IIS Hosting",
    },
    description: "Simplifies ticket reservations, booking management, authentication, and secure payments.",
    features: [
      "Interactive seat selection & real-time availability maps",
      "Secure event ticketing with auto-generated QR codes",
      "Robust booking history & reservation management",
      "Automated email confirmations with payment receipts",
    ],
    image: "/images/novatix.png",
    github: "https://github.com/belezerio/ticket-booking-system",
    accentColor: "#f43f5e",
  },
  {
    title: "Spendly",
    category: "Expense & Debt Tracker",
    filterCategory: "Full-Stack",
    tech: {
      frontend: "React, Chart.js",
      backend: "Node.js, Express",
      database: "Supabase (PostgreSQL)",
      cloud: "GitHub Pages, Git",
    },
    description: "Full expense tracking, split expenses among friends with auto-updates, debt and EMI management.",
    features: [
      "Bill splitting among groups with automated balances",
      "Visual expense analytics & monthly breakdown charts",
      "Debt repayment calculator & EMI reminder schedule",
      "Offline sync support using LocalStorage & Supabase",
    ],
    image: "/images/spendly.png",
    link: "https://belezerio.github.io",
    accentColor: "#8b5cf6",
  },
];

const categories = ["All", "Full-Stack", "Mobile", "Frontend / E-Commerce"];

// Helper to convert hex to rgb string for custom CSS variables
const getRgb = (hex: string): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
};

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;

    const maxTilt = 12; // tilt angle in degrees
    const rotateX = -normY * maxTilt;
    const rotateY = normX * maxTilt;

    card.style.setProperty("--rotate-x", `${rotateX}deg`);
    card.style.setProperty("--rotate-y", `${rotateY}deg`);
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--rotate-x", `0deg`);
    card.style.setProperty("--rotate-y", `0deg`);
  };

  const openDrawer = (project: Project) => {
    setSelectedProject(project);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const filteredProjects = projects.filter(
    (project) => activeFilter === "All" || project.filterCategory === activeFilter
  );

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2 className="section-title">
          My <span>Work</span>
        </h2>

        {/* Category Filter Navigation */}
        <div className="filter-nav" data-cursor="disable">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${activeFilter === category ? "active" : ""}`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 3D Tilt Card Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project, index) => {
            const rgbColor = getRgb(project.accentColor);
            const hasImage = project.image !== "";

            return (
              <div
                key={project.title}
                ref={(el) => (cardRefs.current[index] = el)}
                className="project-card"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => openDrawer(project)}
                style={
                  {
                    "--accent-color": project.accentColor,
                    "--accent-rgb": rgbColor,
                  } as React.CSSProperties
                }
                data-cursor="disable"
              >
                <div className="card-inner">
                  {/* Card Spotlight shine effect overlay */}
                  <div className="card-shine" />

                  {/* Card border shine effect overlay */}
                  <div className="card-border-glow" />

                  {/* Project Image or Holographic Placeholder */}
                  <div className="project-card-media">
                    {hasImage ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="project-card-img"
                        loading="lazy"
                      />
                    ) : (
                      <div className="holographic-placeholder">
                        <div className="holographic-grid" />
                        <div className="holographic-scanner" />
                        <div className="holographic-hud" />
                      </div>
                    )}
                    <span className="project-card-tag">{project.filterCategory}</span>
                  </div>

                  {/* Project Summary */}
                  <div className="project-card-content">
                    <h3 className="project-card-title">{project.title}</h3>
                    <p className="project-card-desc">{project.description}</p>
                    <div className="project-card-footer">
                      <span className="view-details-text">Click to inspect spec sheet</span>
                      <MdArrowOutward className="view-details-icon" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Spec Sheet Slide-Out Drawer - Rendered via Portal to escape ScrollTrigger/smooth-scroll parent transforms */}
      {createPortal(
        <div
          className={`drawer-backdrop ${isDrawerOpen ? "active" : ""}`}
          onClick={closeDrawer}
        >
          <div
            className={`drawer-container ${isDrawerOpen ? "open" : ""}`}
            onClick={(e) => e.stopPropagation()}
            style={
              selectedProject
                ? ({
                    "--accent-color": selectedProject.accentColor,
                    "--accent-rgb": getRgb(selectedProject.accentColor),
                  } as React.CSSProperties)
                : undefined
            }
          >
            {selectedProject && (
              <div className="drawer-inner">
                {/* Close Button */}
                <button
                  className="drawer-close-btn"
                  onClick={closeDrawer}
                  aria-label="Close details"
                  data-cursor="disable"
                >
                  <MdClose />
                </button>

                {/* Drawer Header */}
                <div className="drawer-header">
                  <span className="drawer-subtitle">{selectedProject.category}</span>
                  <h2 className="drawer-title">{selectedProject.title}</h2>
                  <div className="drawer-header-bar" />
                </div>

                {/* Drawer Body */}
                <div className="drawer-body">
                  {/* Description */}
                  <div className="drawer-section">
                    <h4 className="drawer-section-title">Overview</h4>
                    <p className="drawer-desc">{selectedProject.description}</p>
                  </div>

                  {/* Tech Stack Grid */}
                  <div className="drawer-section">
                    <h4 className="drawer-section-title">System Specs / Tech Stack</h4>
                    <div className="tech-stack-grid">
                      <div className="tech-spec-box">
                        <span className="tech-spec-label">Frontend</span>
                        <span className="tech-spec-value">{selectedProject.tech.frontend}</span>
                      </div>
                      <div className="tech-spec-box">
                        <span className="tech-spec-label">Backend</span>
                        <span className="tech-spec-value">{selectedProject.tech.backend}</span>
                      </div>
                      <div className="tech-spec-box">
                        <span className="tech-spec-label">Database</span>
                        <span className="tech-spec-value">{selectedProject.tech.database}</span>
                      </div>
                      <div className="tech-spec-box">
                        <span className="tech-spec-label">Cloud / Ops</span>
                        <span className="tech-spec-value">{selectedProject.tech.cloud}</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="drawer-section">
                    <h4 className="drawer-section-title">Key Core Features</h4>
                    <ul className="features-list">
                      {selectedProject.features.map((feature, i) => (
                        <li key={i} className="feature-item">
                          <span className="feature-dot" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Drawer Footer Actions */}
                <div className="drawer-actions">
                  {selectedProject.link ? (
                    /* Live project: only show live link */
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="drawer-action-btn primary"
                      data-cursor="disable"
                    >
                      <span>Launch Application</span>
                      <MdArrowOutward />
                    </a>
                  ) : (
                    /* Repo-only project: show GitHub link as primary */
                    selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="drawer-action-btn primary"
                        data-cursor="disable"
                      >
                        <FaGithub />
                        <span>View Repository</span>
                      </a>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Work;

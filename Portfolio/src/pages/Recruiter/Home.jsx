import { useState } from "react";
import { Link } from "react-router-dom";
import { BsFiletypeCss, BsFiletypeHtml, BsFiletypeJs, BsGit, BsGithub } from "react-icons/bs";
import { SiReact } from "react-icons/si";
import LogoLoop from "./components/LogoLoop";
import Carousel from "./components/Carousel";
import recruiterPhoto from "../../assets/images/DSC00119.JPG";
import "./Recruiter.css";

export default function RecruiterHome() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState({ type: "idle", message: "" });

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ type: "sending", message: "Sending your request..." });

    try {
      const formData = new FormData();
      formData.append("name", contactForm.name);
      formData.append("email", contactForm.email);
      formData.append("service", contactForm.service || "Not specified");
      formData.append("message", contactForm.message);
      formData.append("_subject", `Portfolio inquiry${contactForm.service ? `: ${contactForm.service}` : ""}`);
      formData.append("_replyto", contactForm.email);
      formData.append("_captcha", "false");

      const response = await fetch("https://formsubmit.co/ajax/eshabajaj1626@gmail.com", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const result = await response.json();
      if (!response.ok || result.success === "false") {
        throw new Error("Submission failed");
      }

      setSubmitStatus({
        type: "success",
        message: "Request sent. Please check your inbox (and spam) for incoming messages.",
      });
      setContactForm({
        name: "",
        email: "",
        service: "",
        message: "",
      });
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Could not send request right now. Please try again in a moment.",
      });
    }
  };

  const postmanIcon = (
    <svg className="recruiter-skill-svg-mono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.855 6.049a.145.145 0 0 0-.053.159v-.001a.412.412 0 0 1-.054.45l.001-.001a.139.139 0 0 0-.03.087c0 .044.021.084.053.11a.143.143 0 0 0 .084.03c.042 0 .08-.02.106-.05a.69.69 0 0 0 .086-.752.138.138 0 0 0-.193-.032zM19.049 6.082l-.002-.004.001.003z" />
      <path d="M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.588-3.801 13.429-10.374C24.745 6.955 20.102.943 13.527.099zm2.471 7.485a.851.851 0 0 0-.593.25l-4.453 4.453-.95-.95c4.389-4.376 5.181-4.418 5.996-3.753zm-4.863 4.861 4.44-4.44a.62.62 0 1 1 .848.902l-.001.001-4.699 4.125-.588-.588zm.33.694-1.1.238a.057.057 0 0 1-.013.001.06.06 0 0 1-.054-.033.06.06 0 0 1 .01-.073l.645-.645.512.512zm-2.803-.459 1.172-1.172.879.878-1.979.426a.11.11 0 0 1-.019.002.074.074 0 0 1-.066-.041.071.071 0 0 1-.011-.039c0-.021.009-.041.024-.054zm-3.646 6.057a.074.074 0 0 1-.069-.075v-.008a.077.077 0 0 1 .022-.046h.002l.946-.946 1.222 1.222-2.123-.147zm2.426-1.255a.227.227 0 0 0-.117.258v-.002l.203.865a.125.125 0 0 1-.211.117h-.003l-1.228-1.229 3.762-3.758 1.82-.393.874.874c-1.255 1.102-2.971 2.201-5.1 3.268zm5.278-3.428h-.002l-.839-.839 4.699-4.125a.985.985 0 0 0 .117-.125l.002-.002c-.147 1.345-2.029 3.245-3.977 5.091zm4.942-5.928a1.81 1.81 0 0 1-1.285-.532h.001l-.003-.002a1.822 1.822 0 0 1 2.461-2.681l-.003-.002-1.61 1.613a.117.117 0 0 0-.035.084c0 .033.013.063.035.084l1.247 1.247a1.801 1.801 0 0 1-.808.189zm1.294-.532c-.081.08-.169.151-.265.214l-.006.004h-.001l-1.207-1.207 1.533-1.533c.661.72.637 1.832-.054 2.522z" />
    </svg>
  );

  const pythonIcon = (
    <svg className="recruiter-skill-svg-mono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M15.552517857142856 6.057342857142857c-0.26949285714285715 -1.0814607142857142 -0.780475 -1.8969357142857142 -1.8689357142857141 -1.8969357142857142h-1.4034535714285714v1.658942857142857c0 1.2879571428571428 -1.0919607142857142 2.3729214285714284 -2.3379178571428567 2.3729214285714284H6.204335714285714c-1.0219642857142857 0 -1.8689357142857141 0.8749678571428571 -1.8689357142857141 1.9004357142857142v3.5628749999999996c0 1.014967857142857 0.8819714285714285 1.6099464285714284 1.8689357142857141 1.9004357142857142 1.1829607142857144 0.3464892857142857 2.3204214285714286 0.4094857142857143 3.737875 0 0.9414678571428571 -0.2729892857142857 1.8689357142857141 -0.8224714285714285 1.8689357142857141 -1.9004357142857142v-1.42445H8.076771428571428v-0.47598214285714285h5.606810714285714c1.0884607142857143 0 1.49095 -0.7594749999999999 1.8689357142857141 -1.8969357142857142 0.39198571428571427 -1.1724607142857142 0.37448571428571426 -2.2994214285714283 0 -3.8008714285714285ZM10.1767 13.179599999999999c0.3884892857142857 0 0.7034785714285713 0.3184892857142857 0.7034785714285713 0.710475 0 0.3954857142857143 -0.3149892857142857 0.7139749999999999 -0.7034785714285713 0.7139749999999999 -0.38498571428571426 0 -0.703475 -0.32198571428571426 -0.703475 -0.7139749999999999 0.0035 -0.3954857142857143 0.3184892857142857 -0.710475 0.703475 -0.710475ZM6.032842857142857 7.723285714285714H9.770714285714284c1.0394642857142857 0 1.8689357142857141 -0.8574714285714286 1.8689357142857141 -1.9004357142857142V2.256475c0 -1.014967857142857 -0.8539714285714286 -1.7744392857142857 -1.8689357142857141 -1.945935714285714 -1.2529571428571427 -0.20649285714285712 -2.6144107142857145 -0.19599285714285714 -3.7378714285714283 0.0035 -1.5819464285714284 0.27998928571428566 -1.8689357142857141 0.8644714285714286 -1.8689357142857141 1.945935714285714v1.42445h3.741371428571428v0.47598214285714285H2.760453571428571c-1.0884607142857143 0 -2.040428571428571 0.6544785714285714 -2.3379178571428567 1.8969357142857142 -0.3429892857142857 1.4244535714285715 -0.3569892857142857 2.3134214285714285 0 3.8008714285714285 0.2659892857142857 1.1059607142857142 0.899467857142857 1.8969357142857142 1.9879321428571428 1.8969357142857142h1.2844535714285714v-1.7079428571428572c0 -1.2354571428571426 1.0674642857142855 -2.3239214285714285 2.3379214285714283 -2.3239214285714285Zm-0.23449285714285714 -4.990828571428572c-0.3884857142857142 0 -0.703475 -0.3184892857142857 -0.703475 -0.710475 0.0035 -0.3954857142857143 0.3149892857142857 -0.7139749999999999 0.703475 -0.7139749999999999 0.38498571428571426 0 0.703475 0.32198571428571426 0.703475 0.7139749999999999s-0.3149892857142857 0.710475 -0.703475 0.710475Z" />
    </svg>
  );

  const skillsLogos = [
    { node: <BsFiletypeHtml />, title: "HTML", href: "https://developer.mozilla.org/docs/Web/HTML" },
    { node: <BsFiletypeCss />, title: "CSS", href: "https://developer.mozilla.org/docs/Web/CSS" },
    { node: <BsFiletypeJs />, title: "JavaScript", href: "https://developer.mozilla.org/docs/Web/JavaScript" },
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <BsGit />, title: "Git", href: "https://git-scm.com/" },
    { node: <BsGithub />, title: "GitHub", href: "https://github.com/" },
    { node: postmanIcon, title: "Postman", href: "https://www.postman.com/" },
    { node: pythonIcon, title: "Python", href: "https://www.python.org/" },
    { node: <span className="recruiter-skill-text">n8n</span>, title: "n8n", href: "https://n8n.io/" },
  ];

  const projectCarouselItems = [
    {
      id: 1,
      title: "Placement Portal",
      description: "Full-stack platform to streamline internal college placements and team coordination.",
      image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fportal-app-azure.vercel.app%2F?w=1400",
    },
    {
      id: 2,
      title: "Research & Analysis",
      description: "DRDO memory-management mini analysis covering leaks, overflows, and dangling pointers.",
      image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.drdo.gov.in%2F?w=1400",
    },
    {
      id: 3,
      title: "Data Analytics Simulation",
      description: "Forage + Deloitte workflow with Excel classification and Tableau-based reporting.",
      image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.tableau.com%2F?w=1400",
    },
  ];

  return (
    <div className="recruiter-portfolio">
      <nav className="recruiter-nav">
        <Link to="/" className="recruiter-nav__logo">Portfolio</Link>
        <div className="recruiter-nav__links">
          <a href="#about">About</a>
          <a href="#resume">Projects</a>
          <a href="#skills">Skills</a>
          <a href="https://esha-bajaj-resume.tiiny.site/?mode=suggestions" target="_blank" rel="noreferrer">Resume</a>
          <a href="#contact" className="recruiter-nav__cta">Contact</a>
        </div>
      </nav>

      <section className="recruiter-section recruiter-hero" id="about">
        <h1 className="recruiter-display-heading recruiter-display-heading--hero">Esha Bajaj</h1>
        <div className="recruiter-split recruiter-split--hero">
        <div className="recruiter-split__content">
          <p className="recruiter-about__bio">
            I&apos;m a tech student currently pursuing a dual degree with IIT Patna while studying at the PW Institute of Innovation in Bangalore. I prefer learning by building and staying involved in the work I take up. I value consistency, ownership, and understanding things by working through them, rather than just knowing them on the surface.
          </p>

          <a
            className="recruiter-about__resume-link"
            href="https://esha-bajaj-resume.tiiny.site/?mode=suggestions"
            target="_blank"
            rel="noreferrer"
          >
            View Resume
          </a>

          <div className="recruiter-about__contact">
            <div>
              <strong>Email:</strong>
              <a href="mailto:eshabajaj1626@gmail.com">eshabajaj1626@gmail.com</a>
            </div>
          </div>
        </div>

        <div className="recruiter-split__visual recruiter-split__visual--portrait">
          <img src={recruiterPhoto} alt="Esha Bajaj portrait" className="recruiter-portrait-photo" />
        </div>
        </div>
      </section>

      <section className="recruiter-skills-band" id="skills" aria-label="Skills">
        <div className="recruiter-skills-band__wrap">
          <div className="recruiter-skills-band__loop">
            <LogoLoop
              logos={skillsLogos}
              speed={90}
              direction="left"
              logoHeight={58}
              gap={128}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="#fafafa"
              ariaLabel="Tech stack"
              className="recruiter-skills-band__logoloop"
            />
          </div>
        </div>
      </section>

      <section className="recruiter-resume recruiter-resume--spaced" id="resume">
        <div className="recruiter-resume__wrap">
        <div className="recruiter-education">
          <h2 className="recruiter-resume__heading">Education</h2>
          <div className="recruiter-education__timeline" role="list" aria-label="Education timeline">
            <article className="recruiter-education__item" role="listitem">
              <p className="recruiter-entry__date">2025 - 2027</p>
              <h3>IIT Patna</h3>
              <p>Bachelor of Science in AI/ML</p>
            </article>
            <article className="recruiter-education__item" role="listitem">
              <p className="recruiter-entry__date">2025 - Present</p>
              <h3>PW Institute of Innovation</h3>
              <p>Technology Program, Bangalore</p>
            </article>
            <article className="recruiter-education__item" role="listitem">
              <p className="recruiter-entry__date">2024</p>
              <h3>Class 12th</h3>
            </article>
            <article className="recruiter-education__item" role="listitem">
              <p className="recruiter-entry__date">2022</p>
              <h3>Class 10th</h3>
            </article>
          </div>
        </div>

        <div className="recruiter-resume__block recruiter-resume__block--projects">
          <h2 className="recruiter-resume__heading recruiter-projects__heading">Projects</h2>
          <div className="recruiter-projects-carousel">
            <Carousel
              items={projectCarouselItems}
              baseWidth={860}
              autoplay={false}
              autoplayDelay={3200}
              pauseOnHover
              loop
              round={false}
            />
          </div>
        </div>
        </div>
      </section>

      <section className="recruiter-contact-cta" id="contact">
        <div className="recruiter-contact-cta__wrap">
        <h2 className="recruiter-contact-cta__title">Let&apos;s work together</h2>
        <p className="recruiter-contact-cta__intro">
          Let&apos;s build something impactful together—whether it&apos;s your brand, your website, or your next big idea.
        </p>
        <form className="recruiter-contact-form" onSubmit={handleContactSubmit}>
          <div className="recruiter-contact-form__row">
            <div className="recruiter-contact-form__field">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder="Esha Bajaj"
                autoComplete="name"
                required
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
              />
            </div>
            <div className="recruiter-contact-form__field">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
              />
            </div>
          </div>
          <div className="recruiter-contact-form__field recruiter-contact-form__field--full">
            <label htmlFor="contact-service">Service needed?</label>
            <select
              id="contact-service"
              name="service"
              value={contactForm.service}
              onChange={(e) => setContactForm({ ...contactForm, service: e.target.value })}
            >
              <option value="">Select…</option>
              <option value="Full-time opportunity">Full-time opportunity</option>
              <option value="Internship">Internship</option>
              <option value="Freelance / project">Freelance / project</option>
              <option value="Collaboration">Collaboration</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="recruiter-contact-form__field recruiter-contact-form__field--full">
            <label htmlFor="contact-message">What can I help you with…</label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              placeholder="Tell me about your project or opportunity…"
              required
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
            />
          </div>
          <button type="submit" className="recruiter-contact-form__submit" disabled={submitStatus.type === "sending"}>
            {submitStatus.type === "sending" ? "Sending..." : "Submit"}
          </button>
          {submitStatus.type !== "idle" && (
            <p
              className={`recruiter-contact-form__status ${
                submitStatus.type === "error" ? "recruiter-contact-form__status--error" : ""
              }`}
              role="status"
            >
              {submitStatus.message}
            </p>
          )}
        </form>
        <p className="recruiter-contact-cta__direct">
          Or reach me directly:{" "}
          <a href="mailto:eshabajaj1626@gmail.com">eshabajaj1626@gmail.com</a>
        </p>
        </div>
      </section>

      <footer className="recruiter-footer">
        <p className="recruiter-footer__copy">© {new Date().getFullYear()} All Rights Reserved</p>
        <Link to="/" className="recruiter-footer__back">← Back to profiles</Link>
      </footer>
    </div>
  );
}

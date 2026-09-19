import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsFiletypeCss, BsFiletypeHtml, BsFiletypeJs, BsGit, BsGithub } from "react-icons/bs";
import { SiReact } from "react-icons/si";
import LogoLoop from "./components/LogoLoop";
import DualProjectCarousel from "./components/DualProjectCarousel";
import { submitContactForm } from "../../lib/submitContactForm";
import { usePortfolioData } from "../../context/PortfolioDataContext";
import recruiterPhoto from "../../assets/images/DSC00119.JPG";
import "./Recruiter.css";

export default function RecruiterHome() {
  const { projects, profile, education } = usePortfolioData();
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const RESUME_URL = profile?.resumeUrl || "https://drive.google.com/file/d/1CFY7JI-fQ7FN015Gq3GoLCFSd-SQ0xf4/view?usp=sharing";

  useEffect(() => {
    if (toast && toast.type !== "sending") {
      const timer = setTimeout(() => {
        setToast(null);
      }, 5500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setToast({
      type: "sending",
      title: "Sending message...",
      message: "Delivering your note to Esha.",
    });

    const result = await submitContactForm(contactForm);
    setSubmitting(false);

    if (result.ok) {
      setToast({
        type: "success",
        title: "Thank you!",
        message: result.message,
      });
      setContactForm({
        name: "",
        email: "",
        service: "",
        message: "",
      });
      return;
    }

    setToast({
      type: "error",
      title: "Notice",
      message: result.message,
      mailtoUrl: result.mailtoUrl,
    });
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
    { node: <BsFiletypeHtml />, title: "HTML5", href: "https://developer.mozilla.org/docs/Web/HTML" },
    { node: <BsFiletypeCss />, title: "CSS3", href: "https://developer.mozilla.org/docs/Web/CSS" },
    { node: <BsFiletypeJs />, title: "JavaScript (ES6+)", href: "https://developer.mozilla.org/docs/Web/JavaScript" },
    { node: <SiReact />, title: "React.js", href: "https://react.dev" },
    { node: <BsGit />, title: "Git", href: "https://git-scm.com/" },
    { node: <BsGithub />, title: "GitHub", href: "https://github.com/" },
    { node: postmanIcon, title: "Postman", href: "https://www.postman.com/" },
    { node: pythonIcon, title: "Python", href: "https://www.python.org/" },
    { node: <span className="recruiter-skill-text">n8n</span>, title: "n8n Automation", href: "https://n8n.io/" },
  ];

  return (
    <div className="recruiter-portfolio">
      <nav className="recruiter-nav">
        <Link to="/" className="recruiter-nav__logo">Portfolio</Link>
        <button
          type="button"
          className={`recruiter-nav__toggle ${menuOpen ? "is-open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className={`recruiter-nav__links ${menuOpen ? "is-open" : ""}`}>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
          <a href="#education" onClick={() => setMenuOpen(false)}>Education</a>
          <a href={RESUME_URL} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Resume</a>
          <a href="#contact" className="recruiter-nav__cta" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
      </nav>

      {/* Soothing Hero Section */}
      <section className="recruiter-section recruiter-hero" id="about">
        <div className="recruiter-split recruiter-split--hero">
          <div className="recruiter-split__content">
            <span className="recruiter-hero__eyebrow">Software Engineer & Student</span>
            <h1 className="recruiter-hero__name">Esha Bajaj</h1>
            <p className="recruiter-about__bio">
              Building full-stack web applications, exploring low-level systems & memory tools, and specializing in AI/ML at <strong>IIT Patna</strong> while studying at the <strong>PW Institute of Innovation in Bangalore</strong>. Driven by ownership, clean code, and engineering depth.
            </p>

            <div className="recruiter-hero__actions">
              <a
                className="recruiter-hero__btn-primary"
                href="#projects"
              >
                Explore Projects ↓
              </a>
              <a
                className="recruiter-hero__btn-secondary"
                href={RESUME_URL}
                target="_blank"
                rel="noreferrer"
              >
                View Resume ↗
              </a>
            </div>
          </div>

          <div className="recruiter-split__visual recruiter-split__visual--portrait">
            <div className="recruiter-portrait-frame">
              <img src={recruiterPhoto} alt="Esha Bajaj portrait" className="recruiter-portrait-photo" />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Loop */}
      <section className="recruiter-skills-band" id="skills" aria-label="Skills">
        <div className="recruiter-skills-band__wrap">
          <LogoLoop
            logos={skillsLogos}
            speed={60}
            direction="left"
            logoHeight={44}
            gap={64}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#fafafa"
            ariaLabel="Tech stack"
            className="recruiter-skills-band__logoloop"
          />
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="recruiter-section recruiter-projects-section" id="projects">
        <div className="recruiter-section__header">
          <span className="recruiter-section__eyebrow">FEATURED WORK</span>
          <h2 className="recruiter-section__title">Selected Projects</h2>
          <p className="recruiter-section__subtitle">
            Platforms, algorithms, and open-source contributions crafted with technical rigor.
          </p>
        </div>

        <DualProjectCarousel projects={projects} />
      </section>

      {/* Education & Experience Section */}
      <section className="recruiter-section recruiter-education-section" id="education">
        <div className="recruiter-section__header">
          <h2 className="recruiter-section__title">Education</h2>
        </div>

        <div className="recruiter-education__timeline" role="list">
          <article className="recruiter-education__card" role="listitem">
            <span className="recruiter-education__year">2025 – 2027</span>
            <div className="recruiter-education__info">
              <h3>IIT Patna</h3>
              <p className="recruiter-education__degree">Bachelor of Science in AI/ML (Dual Degree)</p>
              <p className="recruiter-education__desc">Specializing in Machine Learning models, data structures, and algorithmic problem-solving.</p>
            </div>
          </article>

          <article className="recruiter-education__card" role="listitem">
            <span className="recruiter-education__year">2025 – Present</span>
            <div className="recruiter-education__info">
              <h3>PW Institute of Innovation</h3>
              <p className="recruiter-education__degree">Technology Program, Bangalore</p>
              <p className="recruiter-education__desc">Hands-on software development, full-stack web architecture, and real-world system building.</p>
            </div>
          </article>
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
          <button type="submit" className="recruiter-contact-form__submit" disabled={submitting}>
            {submitting ? "Sending..." : "Submit"}
          </button>
        </form>
        <p className="recruiter-contact-cta__direct">
          Or reach me directly:{" "}
          <a href="mailto:eshabajaj1626@gmail.com">eshabajaj1626@gmail.com</a>
        </p>
        </div>
      </section>

      {toast && (
        <div className={`recruiter-toast recruiter-toast--${toast.type}`} role="alert" aria-live="polite">
          <div className="recruiter-toast__body">
            <span className="recruiter-toast__badge">
              {toast.type === "success" && "✨"}
              {toast.type === "sending" && "⌛"}
              {toast.type === "error" && "💡"}
            </span>
            <div className="recruiter-toast__text">
              {toast.title && <strong className="recruiter-toast__title">{toast.title}</strong>}
              <p className="recruiter-toast__msg">{toast.message}</p>
            </div>
            {toast.type === "error" && toast.mailtoUrl && (
              <a href={toast.mailtoUrl} className="recruiter-toast__action">
                ✉ Email Directly
              </a>
            )}
            <button
              type="button"
              className="recruiter-toast__close"
              onClick={() => setToast(null)}
              aria-label="Close notification"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <footer className="recruiter-footer">
        <p className="recruiter-footer__copy">© {new Date().getFullYear()} All Rights Reserved</p>
        <Link to="/" className="recruiter-footer__back">← Back to profiles</Link>
      </footer>
    </div>
  );
}

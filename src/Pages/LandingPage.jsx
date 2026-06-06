import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Sun,
  Sparkles,
  Wrench,
  ShieldCheck,
  Percent,
  Phone,
  Mail,
  MapPin,
  Users,
  Award,
  Clock,
  ArrowRight,
  TrendingUp,
  BrushCleaning
} from "lucide-react";
import { createLead } from "../services/api";
import Loader from "../Components/Loader";
import heroBg from "../assets/solar_hero_bg.png";

// Simple self-running counter component for statistics
const Counter = ({ target, duration = 1200, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target, 10);
    if (isNaN(end) || start === end) return;

    const incrementTime = 15;
    const steps = duration / incrementTime;
    const stepValue = end / steps;

    const timer = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <>{count.toLocaleString()}{suffix}</>;
};

export default function LandingPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    requirement: "Solar Installation"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await createLead({
        ...form,
        source: "Website"
      });
      setIsSubmitting(false);

      Swal.fire({
        icon: "success",
        title: "Enquiry Submitted Successfully!",
        text: "Our Solar expert team will contact you shortly.",
        confirmButtonColor: "#316398"
      });

      // Clear the form
      setForm({
        name: "",
        phone: "",
        email: "",
        location: "",
        requirement: "Solar Installation"
      });
    } catch (err) {
      setIsSubmitting(false);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: err.response?.data?.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#316398"
      });
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isSubmitting) {
    return <Loader message="Submitting your enquiry..." fullPage={true} />;
  }

  return (
    <div className="landing-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        .landing-root {
          font-family: 'Inter', sans-serif;
          background: #F1F5F9;
          color: #1E293B;
          scroll-behavior: smooth;
        }

        /* HERO SECTION */
        .hero {
          position: relative;
          min-height: 90vh;
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.7) 100%), url(${heroBg});
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          color: #ffffff;
          overflow: hidden;
        }

        .hero-container {
          max-width: 1100px;
          width: 100%;
          text-align: center;
          position: relative;
          z-index: 2;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(69, 150, 171, 0.2);
          border: 1px solid rgba(69, 150, 171, 0.4);
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          color: #4596AB;
          margin-bottom: 2rem;
          backdrop-filter: blur(4px);
        }

        .hero-title {
          font-family: 'Outfit', sans-serif;
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          letter-spacing: -1px;
        }

        .hero-title span {
          background: linear-gradient(135deg, #4596AB 0%, #316398 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-tagline {
          font-size: 1.25rem;
          color: #E2E8F0;
          max-width: 700px;
          margin: 0 auto 2.5rem auto;
          line-height: 1.6;
        }

        .hero-buttons {
          display: flex;
          gap: 1.25rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: linear-gradient(135deg, #4596AB 0%, #316398 100%);
          color: #ffffff;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 16px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(49, 99, 152, 0.4);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(49, 99, 152, 0.5);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 16px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(4px);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }

        .btn-outline {
          background: transparent;
          color: #E2E8F0;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 16px;
          border: 1px solid rgba(226, 232, 240, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-outline:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
          border-color: #ffffff;
        }

        /* SECTION STYLING */
        .section {
          padding: 6rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-badge {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #316398;
          margin-bottom: 0.75rem;
        }

        .section-title {
          font-family: 'Outfit', sans-serif;
          font-size: 2.5rem;
          font-weight: 800;
          color: #0F172A;
          letter-spacing: -0.5px;
          margin-bottom: 1rem;
        }

        .section-desc {
          color: #64748B;
          max-width: 600px;
          margin: 0 auto;
          font-size: 16px;
          line-height: 1.6;
        }

        /* SERVICES SECTION */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.25rem;
        }

        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
        }

        .service-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 2.5rem 2rem;
          border: 1px solid #E2E8F0;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #4596AB, #316398);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
          border-color: #CBD5E1;
        }

        .service-card:hover::before {
          transform: scaleX(1);
        }

        .service-icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: #EBF4FA;
          color: #316398;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
        }

        .service-card:hover .service-icon-wrapper {
          background: #316398;
          color: #ffffff;
          transform: rotate(6deg) scale(1.05);
        }

        .service-title {
          font-family: 'Outfit', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 0.75rem;
        }

        .service-text {
          font-size: 14px;
          color: #64748B;
          line-height: 1.6;
        }

        /* WHY CHOOSE US SECTION */
        .why-choose-us {
          background: #ffffff;
          border-top: 1px solid #E2E8F0;
          border-bottom: 1px solid #E2E8F0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          text-align: center;
        }

        .stat-item {
          padding: 1.5rem;
        }

        .stat-icon {
          color: #4596AB;
          margin-bottom: 1rem;
          display: inline-block;
        }

        .stat-number {
          font-family: 'Outfit', sans-serif;
          font-size: 3rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 0.5rem;
          letter-spacing: -1px;
        }

        .stat-label {
          font-size: 14px;
          font-weight: 600;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* ABOUT SECTION */
        .about-flex {
          display: flex;
          gap: 4rem;
          align-items: center;
        }

        .about-content {
          flex: 1;
        }

        .about-details {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .about-detail-card {
          background: #ffffff;
          padding: 1.5rem;
          border-radius: 16px;
          border: 1px solid #E2E8F0;
        }

        .about-detail-title {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 16px;
          color: #0F172A;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .about-detail-text {
          font-size: 13.5px;
          color: #64748B;
          line-height: 1.5;
        }

        .about-image-side {
          flex: 0.8;
          position: relative;
        }

        .about-decor-circle {
          position: absolute;
          top: -20px;
          left: -20px;
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, rgba(69, 150, 171, 0.15) 0%, rgba(255,255,255,0) 70%);
          z-index: 0;
        }

        .about-card-banner {
          background: linear-gradient(135deg, #316398 0%, #4596AB 100%);
          color: #ffffff;
          padding: 3rem;
          border-radius: 24px;
          box-shadow: 0 10px 30px rgba(49, 99, 152, 0.15);
          position: relative;
          z-index: 1;
        }

        .about-banner-tag {
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-size: 12px;
          color: #E2E8F0;
          margin-bottom: 1rem;
        }

        .about-banner-quote {
          font-family: 'Outfit', sans-serif;
          font-size: 24px;
          font-weight: 700;
          line-height: 1.4;
          margin-bottom: 2rem;
        }

        .about-banner-stats {
          display: flex;
          gap: 2rem;
        }

        .about-banner-stat {
          border-left: 2px solid rgba(255,255,255,0.3);
          padding-left: 1rem;
        }

        .about-banner-stat-num {
          font-size: 20px;
          font-weight: 700;
        }

        .about-banner-stat-lbl {
          font-size: 12px;
          color: #E2E8F0;
        }

        /* CONTACT & ENQUIRY SECTION */
        .contact-enquiry {
          background: #ffffff;
          border-top: 1px solid #E2E8F0;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 4rem;
        }

        .contact-info-panel {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .contact-item {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
        }

        .contact-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #EBF4FA;
          color: #316398;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .contact-item-title {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 16px;
          color: #0F172A;
          margin-bottom: 0.25rem;
        }

        .contact-item-text {
          font-size: 14.5px;
          color: #64748B;
          line-height: 1.5;
        }

        .map-card {
          margin-top: 1rem;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid #E2E8F0;
          box-shadow: 0 4px 15px rgba(0,0,0,0.02);
        }

        .map-card iframe {
          width: 100%;
          border: none;
          display: block;
        }

        .enquiry-panel {
          background: #F8FAFC;
          padding: 3rem;
          border-radius: 24px;
          border: 1px solid #E2E8F0;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
        }

        .enquiry-form-title {
          font-family: 'Outfit', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 1.5rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }

        .form-full {
          grid-column: span 2;
        }

        .form-group {
          margin-bottom: 0.25rem;
        }

        .form-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #475569;
          margin-bottom: 0.5rem;
        }

        .form-input {
          width: 100%;
          padding: 0.85rem 1.1rem;
          border: 1.5px solid #CBD5E1;
          border-radius: 12px;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          background: #ffffff;
          transition: all 0.2s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #4596AB;
          box-shadow: 0 0 0 3px rgba(69, 150, 171, 0.15);
        }

        .form-select {
          width: 100%;
          padding: 0.85rem 1.1rem;
          border: 1.5px solid #CBD5E1;
          border-radius: 12px;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          background: #ffffff;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23475569' stroke-width='2.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 12px;
          cursor: pointer;
        }

        .form-select:focus {
          outline: none;
          border-color: #4596AB;
        }

        .form-submit-btn {
          width: 100%;
          max-width: 280px;
          padding: 1rem;
          margin-top: 2rem;
          margin-left: auto;
          margin-right: auto;
          display: flex;
          justify-content: center;
        }

        /* FOOTER */
        .pub-footer {
          background: #0F172A;
          color: #94A3B8;
          padding: 4rem 2rem 2rem 2rem;
          border-top: 1px solid #1E293B;
        }

        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 4rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid #1E293B;
        }

        .footer-desc {
          margin-top: 1rem;
          font-size: 14px;
          line-height: 1.6;
          max-width: 320px;
        }

        .footer-title {
          font-family: 'Outfit', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1.25rem;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-link-btn {
          background: transparent;
          border: none;
          color: #94A3B8;
          cursor: pointer;
          font-size: 14px;
          text-align: left;
          padding: 0;
          transition: color 0.2s ease;
        }

        .footer-link-btn:hover {
          color: #ffffff;
        }

        .footer-bottom {
          max-width: 1200px;
          margin: 2rem auto 0 auto;
          display: flex;
          justify-content: space-between;
          font-size: 13px;
        }

        /* RESPONSIVE LAYOUT */
        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 3rem;
          }
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          .hero-tagline {
            font-size: 1.1rem;
          }
          .about-flex {
            flex-direction: column;
            gap: 3rem;
          }
          .about-image-side {
            width: 100%;
          }
          .about-card-banner {
            padding: 2rem 1.5rem;
          }
          .footer-inner {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        @media (max-width: 640px) {
          .about-details {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        @media (max-width: 540px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          .form-full {
            grid-column: span 1;
          }
          .stats-grid {
            grid-template-columns: 1fr;
          }
          .hero-buttons {
            flex-direction: column;
            width: 100%;
          }
          .btn-primary, .btn-secondary, .btn-outline {
            width: 100%;
            justify-content: center;
          }
          .form-submit-btn {
            max-width: 100%;
            margin-left: 0;
            margin-right: 0;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }
          .enquiry-panel {
            padding: 2rem 1.25rem;
          }
          .hero {
            padding: 4rem 1rem;
          }
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="hero" id="hero">
        <div className="hero-container">
          <div className="hero-badge">
            <Sun size={16} /> Leader in Sustainable Solar Care
          </div>
          <h1 className="hero-title">
            Sunbird Power Solutions <br />
            <span>Efficient. Clean. Reliable.</span>
          </h1>
          <p className="hero-tagline">
            Empowering homes and businesses with green energy and high-performance maintenance systems.
            Reduce your carbon footprint and boost energy generation with state-of-the-art solar installations and cleaning services.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => scrollToSection("enquiry")}>
              Get Free Quote <ArrowRight size={18} />
            </button>
            <button className="btn-secondary" onClick={() => scrollToSection("contact")}>
              Contact Us
            </button>
            
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US STATS */}
      <section className="why-choose-us">
        <div className="section" style={{ padding: "4rem 2rem" }}>
          <div className="stats-grid">
            <div className="stat-item">
              <Award className="stat-icon" size={36} />
              <div className="stat-number">
                <Counter target="1200" suffix="+" />
              </div>
              <div className="stat-label">Total Installations</div>
            </div>
            <div className="stat-item">
              <BrushCleaning className="stat-icon" size={36} />
              <div className="stat-number">
                <Counter target="5000" suffix="+" />
              </div>
              <div className="stat-label">Cleanings Completed</div>
            </div>
            <div className="stat-item">
              <Users className="stat-icon" size={36} />
              <div className="stat-number">
                <Counter target="45" suffix="+" />
              </div>
              <div className="stat-label">Expert Technicians</div>
            </div>
            <div className="stat-item">
              <ShieldCheck className="stat-icon" size={36} />
              <div className="stat-number">
                <Counter target="99" suffix="%" />
              </div>
              <div className="stat-label">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="section" id="services">
        <div className="section-header">
          <span className="section-badge">Our Services</span>
          <h2 className="section-title">Professional Solar Services</h2>
          <p className="section-desc">
            We provide comprehensive end-to-end solar solutions, ensuring high energy outputs and reliable operations throughout your solar project lifetime.
          </p>
        </div>

        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon-wrapper">
              <Sun size={24} />
            </div>
            <h3 className="service-title">Solar Installation</h3>
            <p className="service-text">
              Customized solar rooftop solar plants designed to fit residential, commercial, and industrial requirements with maximum efficiency.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon-wrapper">
              <Sparkles size={24} />
            </div>
            <h3 className="service-title">Solar Cleaning</h3>
            <p className="service-text">
              Automated and manual high-efficiency washing cycles. Removes dirt, pollen, and debris, boosting panel efficiency by up to 25%.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon-wrapper">
              <Wrench size={24} />
            </div>
            <h3 className="service-title">AMC Maintenance</h3>
            <p className="service-text">
              Annual Maintenance Contracts designed to monitor health, conduct preventative repairs, and maintain optimum energy yield round-the-clock.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon-wrapper">
              <ShieldCheck size={24} />
            </div>
            <h3 className="service-title">Solar Inspection</h3>
            <p className="service-text">
              Infrared thermal imaging and electrical testing to diagnose degradation, micro-cracks, hotspots, and wiring concerns.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon-wrapper">
              <Percent size={24} />
            </div>
            <h3 className="service-title">Subsidy Assistance</h3>
            <p className="service-text">
              Complete guidance and documentation management to easily apply for government subsidies and utility connectivity benefits.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="section" id="about" style={{ background: "#ffffff", borderTop: "1px solid #E2E8F0" }}>
        <div className="about-flex">
          <div className="about-content">
            <span className="section-badge">Who We Are</span>
            <h2 className="section-title">Providing Smart Solar Power Solutions Since 2018</h2>
            <p className="section-desc" style={{ margin: "0 0 1.5rem 0", textAlign: "left" }}>
              At Sunbird Power Solutions, we construct highly optimized solar systems that generate sustainable yield.
              Our team consists of certified green-energy engineering experts committed to carbon footprint reduction and affordable energy.
            </p>

            <div className="about-details">
              <div className="about-detail-card">
                <h3 className="about-detail-title">
                  <Sun size={18} style={{ color: "#4596AB" }} /> Our Mission
                </h3>
                <p className="about-detail-text">
                  To accelerate clean energy deployment by engineering, installing, and servicing superior solar infrastructures.
                </p>
              </div>

              <div className="about-detail-card">
                <h3 className="about-detail-title">
                  <TrendingUp size={18} style={{ color: "#316398" }} /> Our Vision
                </h3>
                <p className="about-detail-text">
                  To establish decentralized, robust grid systems that make solar energy accessible, resilient, and standard globally.
                </p>
              </div>
            </div>
          </div>

          <div className="about-image-side">
            <div className="about-decor-circle"></div>
            <div className="about-card-banner">
              <div className="about-banner-tag">Sunbird Advantage</div>
              <h3 className="about-banner-quote">
                "We don't just set up panels; we build long-term power assets."
              </h3>
              <div className="about-banner-stats">
                <div className="about-banner-stat">
                  <div className="about-banner-stat-num">8+ Years</div>
                  <div className="about-banner-stat-lbl">Solar Experience</div>
                </div>
                <div className="about-banner-stat">
                  <div className="about-banner-stat-num">100%</div>
                  <div className="about-banner-stat-lbl">Carbon Neutral Goal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT & ENQUIRY SECTION */}
      <section className="section contact-enquiry" id="contact">
        <div className="section-header" style={{ marginBottom: "5rem" }}>
          <span className="section-badge">Get In Touch</span>
          <h2 className="section-title">Contact Us & Get a Quote</h2>
          <p className="section-desc">
            Ready to switch to solar or need cleaning maintenance? Send us an enquiry or contact our representatives directly.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info-panel">
            <div className="contact-item">
              <div className="contact-icon-box">
                <Phone size={20} />
              </div>
              <div>
                <h4 className="contact-item-title">Phone Number</h4>
                <p className="contact-item-text">+91 98765 43210</p>
                <p className="contact-item-text">+91 99988 77766</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon-box">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="contact-item-title">Email Address</h4>
                <p className="contact-item-text">info@sunbirdpower.com</p>
                <p className="contact-item-text">sales@sunbirdpower.com</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon-box">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="contact-item-title">Office Location</h4>
                <p className="contact-item-text">
                  Sunbird Power Complex, Plot No. 12, Phase-II, Industrial Area, <br />
                  Kozhikode, India - 673511
                </p>
              </div>
            </div>

            <div className="map-card" id="map">
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1956.6513938385744!2d75.78660748834243!3d11.239122128007951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1780641812942!5m2!1sen!2sin" height="300" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>

          <div className="enquiry-panel" id="enquiry">
            <h3 className="enquiry-form-title">Request a Free Solar Quote</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group form-full">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    placeholder="Enter phone number"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Enter email address"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group form-full">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    name="location"
                    className="form-input"
                    placeholder="Enter city or area location"
                    value={form.location}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group form-full">
                  <label className="form-label">Requirement Needed</label>
                  <select
                    name="requirement"
                    className="form-select"
                    value={form.requirement}
                    onChange={handleChange}
                    required
                  >
                    <option value="Solar Installation">Solar Installation</option>
                    <option value="Solar Cleaning">Solar Cleaning</option>
                    <option value="AMC Service">AMC Service</option>
                    <option value="Site Survey">Site Survey</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-primary form-submit-btn ">
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pub-footer">
        <div className="footer-inner">
          <div>
            <h4 className="footer-title" style={{ fontSize: "20px" }}>Sunbird Power</h4>
            <p className="footer-desc">
              Pioneering green energy systems and reliable maintenance schedules to secure maximum solar yield.
            </p>
          </div>
          <div>
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <button onClick={() => scrollToSection("hero")} className="footer-link-btn">Home</button>
              </li>
              <li>
                <button onClick={() => scrollToSection("about")} className="footer-link-btn">About Us</button>
              </li>
              <li>
                <button onClick={() => scrollToSection("services")} className="footer-link-btn">Services</button>
              </li>
              <li>
                <button onClick={() => scrollToSection("contact")} className="footer-link-btn">Contact Us</button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="footer-title">Operations</h4>
            <p style={{ fontSize: "14px", lineHeight: "1.6" }}>
              Monday - Saturday: 9:00 AM - 6:00 PM <br />
              Sunday: Closed
            </p>
            <button
              className="footer-link-btn"
              onClick={() => navigate("/admin-login")}
              style={{ marginTop: "1rem", color: "#4596AB", fontWeight: "600" }}
            >
              Go to Employee Portal &rarr;
            </button>
          </div>
        </div>
        <div className="footer-bottom">
          <div>&copy; {new Date().getFullYear()} Sunbird Power Solutions. All rights reserved.</div>
          <div>Designed for Clean Green Development</div>
        </div>
      </footer>
    </div>
  );
}
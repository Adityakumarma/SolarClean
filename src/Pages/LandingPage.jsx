import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#0F172A", background: "#fff", overflowX: "hidden" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        /* HERO */
        .sol-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: calc(100vh - 64px);
          border-bottom: 0.5px solid #e2e8f0;
        }
        .sol-hero-left {
          padding: 5rem 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-right: 0.5px solid #e2e8f0;
        }
        .sol-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #B45309;
          background: #FEF3C7;
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 2rem;
          width: fit-content;
        }
        .sol-hero-title {
          font-family: 'Syne', sans-serif;
          font-size: 4.5rem;
          font-weight: 800;
          line-height: 1.0;
          letter-spacing: -2px;
          margin-bottom: 1.75rem;
          color: #0F172A;
        }
        .sol-accent { color: #F59E0B; display: block; }
        .sol-hero-desc {
          font-size: 17px;
          line-height: 1.7;
          color: #64748b;
          max-width: 420px;
          margin-bottom: 2.5rem;
          font-weight: 300;
        }
        .sol-hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
        .sol-btn-primary {
          background: #0F172A; color: #fff; border: none;
          padding: 0.85rem 1.75rem; border-radius: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500;
          cursor: pointer; display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
        }
        .sol-btn-secondary {
          background: transparent; color: #0F172A; border: 0.5px solid #94a3b8;
          padding: 0.85rem 1.75rem; border-radius: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500;
          cursor: pointer; display: inline-flex; align-items: center; text-decoration: none;
        }
        .sol-hero-right {
          background: #0F172A; padding: 3.5rem 2.5rem;
          display: flex; flex-direction: column; justify-content: center;
          gap: 1.25rem; position: relative;
        }
        .sol-hero-badge {
          position: absolute; top: 2.5rem; right: 2.5rem;
          background: #F59E0B; color: #1a1200;
          font-family: 'Syne', sans-serif; font-weight: 800;
          border-radius: 50%; width: 90px; height: 90px;
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; font-size: 11px; text-align: center; line-height: 1.2;
        }
        .sol-badge-num { font-size: 24px; display: block; }
        .sol-stat-row {
          padding: 1.25rem 1.5rem;
          background: rgba(255,255,255,0.05);
          border-radius: 12px; border: 0.5px solid rgba(255,255,255,0.08);
        }
        .sol-stat-inner { display: flex; justify-content: space-between; align-items: center; }
        .sol-stat-label { font-size: 13px; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 1px; }
        .sol-stat-value { font-family: 'Syne', sans-serif; font-size: 2.2rem; font-weight: 800; color: #fff; }
        .sol-stat-unit { font-size: 12px; color: #F59E0B; font-weight: 500; margin-left: 4px; }
        .sol-stat-accent { font-family: 'Syne', sans-serif; font-size: 1.5rem; font-weight: 800; color: #F59E0B; }
        .sol-progress-wrap { height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; margin-top: 0.5rem; overflow: hidden; }
        .sol-progress-bar { height: 100%; background: #F59E0B; border-radius: 2px; }

        /* MARQUEE */
        .sol-marquee-strip {
          background: #F59E0B; padding: 0.75rem 0;
          overflow: hidden; white-space: nowrap; border-bottom: 0.5px solid #e2e8f0;
        }
        .sol-marquee-inner {
          display: inline-flex; gap: 2.5rem;
          animation: sol-scroll 22s linear infinite;
        }
        .sol-marquee-item {
          font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700;
          color: #1a1200; letter-spacing: 1px; text-transform: uppercase;
          display: flex; align-items: center; gap: 10px;
        }
        .sol-marquee-dot { width: 5px; height: 5px; background: #1a1200; border-radius: 50%; opacity: 0.4; display: inline-block; }
        @keyframes sol-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        /* FEATURES */
        .sol-features { display: grid; grid-template-columns: 1fr 1fr 1fr; border-bottom: 0.5px solid #e2e8f0; }
        .sol-feature-card { padding: 3rem 2.5rem; border-right: 0.5px solid #e2e8f0; }
        .sol-feature-card:last-child { border-right: none; }
        .sol-feature-num { font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 2px; color: #94a3b8; margin-bottom: 2rem; }
        .sol-feature-icon { width: 48px; height: 48px; border: 0.5px solid #e2e8f0; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; font-size: 22px; }
        .sol-feature-card h3 { font-family: 'Syne', sans-serif; font-size: 1.3rem; font-weight: 700; margin-bottom: 0.75rem; letter-spacing: -0.5px; color: #0F172A; }
        .sol-feature-card p { font-size: 14px; line-height: 1.7; color: #64748b; margin: 0; }

        /* HOW IT WORKS */
        .sol-hiw { padding: 6rem 2.5rem; border-bottom: 0.5px solid #e2e8f0; }
        .sol-section-label {
          font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
          color: #94a3b8; margin-bottom: 3rem; display: flex; align-items: center; gap: 12px;
        }
        .sol-section-label::before { content: ''; width: 24px; height: 1px; background: #94a3b8; display: inline-block; }
        .sol-steps { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2px; }
        .sol-step { padding: 2.5rem 2rem; border: 0.5px solid #e2e8f0; position: relative; }
        .sol-step-num { font-family: 'Syne', sans-serif; font-size: 4rem; font-weight: 800; color: #e2e8f0; line-height: 1; margin-bottom: 1.5rem; }
        .sol-step h3 { font-family: 'Syne', sans-serif; font-size: 1.15rem; font-weight: 700; margin-bottom: 0.6rem; letter-spacing: -0.3px; color: #0F172A; }
        .sol-step p { font-size: 14px; line-height: 1.65; color: #64748b; margin: 0; }
        .sol-step-arrow {
          position: absolute; top: 50%; right: -14px; transform: translateY(-50%);
          width: 28px; height: 28px; background: #F59E0B; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; color: #1a1200; z-index: 2; font-weight: 700;
        }

        /* CTA */
        .sol-cta {
          background: #0F172A; padding: 6rem 2.5rem;
          display: flex; align-items: center; justify-content: space-between;
          gap: 3rem; flex-wrap: wrap;
        }
        .sol-cta h2 {
          font-family: 'Syne', sans-serif; font-size: 3.25rem; font-weight: 800;
          color: #fff; letter-spacing: -1.5px; line-height: 1.05;
          max-width: 520px; margin: 0 0 1rem 0;
        }
        .sol-cta-accent { color: #F59E0B; }
        .sol-cta p { color: rgba(255,255,255,0.5); font-size: 16px; max-width: 400px; line-height: 1.6; margin: 0; }
        .sol-cta-buttons { display: flex; flex-direction: column; gap: 10px; flex-shrink: 0; }
        .sol-btn-amber {
          background: #F59E0B; color: #1a1200; border: none;
          padding: 1rem 2rem; border-radius: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500;
          cursor: pointer; white-space: nowrap; text-decoration: none;
          display: inline-block; text-align: center;
        }
        .sol-btn-ghost {
          background: transparent; color: rgba(255,255,255,0.6); border: 0.5px solid rgba(255,255,255,0.15);
          padding: 1rem 2rem; border-radius: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500;
          cursor: pointer; white-space: nowrap; text-decoration: none;
          display: inline-block; text-align: center;
        }

        /* FOOTER */
        .sol-footer {
          padding: 1.5rem 2.5rem; border-top: 0.5px solid #e2e8f0;
          display: flex; justify-content: space-between; align-items: center;
          font-size: 13px; color: #94a3b8; flex-wrap: wrap; gap: 0.5rem;
        }

        @media (max-width: 768px) {
          .sol-hero { grid-template-columns: 1fr; }
          .sol-hero-right { display: none; }
          .sol-hero-title { font-size: 3rem; letter-spacing: -1px; }
          .sol-features { grid-template-columns: 1fr; }
          .sol-feature-card { border-right: none; border-bottom: 0.5px solid #e2e8f0; }
          .sol-steps { grid-template-columns: 1fr; }
          .sol-step-arrow { display: none; }
          .sol-cta { flex-direction: column; }
          .sol-cta h2 { font-size: 2.2rem; }
          .sol-hiw { padding: 4rem 1.5rem; }
        }
      `}</style>


      <section className="sol-hero">
        <div className="sol-hero-left">
          <span className="sol-eyebrow">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="12" cy="12" r="4"/>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2"/>
            </svg>
            Solar Cleaning Management
          </span>

          <h1 className="sol-hero-title">
            Manage Your
            <span className="sol-accent">Solar Panels</span>
            Smarter.
          </h1>

          <p className="sol-hero-desc">
            Organize teams, assign cleaning tasks, manage clients, upload solar panel images,
            and automate recurring schedules — all from one dashboard.
          </p>

          <div className="sol-hero-actions">
            <Link to="/tasks" className="sol-btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              Manage Tasks
            </Link>
            <Link to="/clients" className="sol-btn-secondary">View Clients</Link>
          </div>
        </div>

        <div className="sol-hero-right">
          <div className="sol-hero-badge">
            <span className="sol-badge-num">500+</span>
            Tasks Done
          </div>

          <div className="sol-stat-row">
            <div className="sol-stat-label">Active clients</div>
            <div className="sol-stat-value">100<span className="sol-stat-unit">+</span></div>
            <div className="sol-progress-wrap"><div className="sol-progress-bar" style={{ width: "72%" }}></div></div>
          </div>

          <div className="sol-stat-row">
            <div className="sol-stat-label">Cleaning teams</div>
            <div className="sol-stat-value">30<span className="sol-stat-unit">+</span></div>
            <div className="sol-progress-wrap"><div className="sol-progress-bar" style={{ width: "55%" }}></div></div>
          </div>

          <div className="sol-stat-row">
            <div className="sol-stat-label">Panels cleaned</div>
            <div className="sol-stat-value">1,200<span className="sol-stat-unit">+</span></div>
            <div className="sol-progress-wrap"><div className="sol-progress-bar" style={{ width: "88%" }}></div></div>
          </div>

          <div className="sol-stat-row">
            <div className="sol-stat-inner">
              <div className="sol-stat-label">Satisfaction rate</div>
              <div className="sol-stat-accent">98%</div>
            </div>
            <div className="sol-progress-wrap"><div className="sol-progress-bar" style={{ width: "98%" }}></div></div>
          </div>
        </div>
      </section>

      
      <div className="sol-marquee-strip" aria-hidden="true">
        <div className="sol-marquee-inner">
          {[
            "Task Scheduling", "Client Management", "Team Assignment",
            "Panel Image Upload", "Recurring Schedules", "Location Tracking",
            "Task Scheduling", "Client Management", "Team Assignment",
            "Panel Image Upload", "Recurring Schedules", "Location Tracking",
          ].map((item, i) => (
            <div className="sol-marquee-item" key={i}>
              {item} <span className="sol-marquee-dot"></span>
            </div>
          ))}
        </div>
      </div>

     
      <section className="sol-features">
        {[
          { num: "01", icon: "👥", title: "Team Management", desc: "Create cleaning teams and manage members with contact details and task assignments all in one place." },
          { num: "02", icon: "📋", title: "Smart Scheduling", desc: "Auto-calculate next cleaning dates based on task duration. Never miss a scheduled clean again." },
          { num: "03", icon: "☀️", title: "Client Tracking", desc: "Store client information alongside solar panel images, GPS locations, and service history." },
        ].map((f) => (
          <div className="sol-feature-card" key={f.num}>
            <div className="sol-feature-num">{f.num} / Feature</div>
            <div className="sol-feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </section>

      
      <section className="sol-hiw">
        <div className="sol-section-label">How it works</div>
        <div className="sol-steps">
          {[
            { num: "01", title: "Add Clients", desc: "Store customer details and upload solar panel images with location tags.", arrow: true },
            { num: "02", title: "Create Teams", desc: "Organize workers into cleaning teams with assigned member details and contacts.", arrow: true },
            { num: "03", title: "Assign Tasks", desc: "Schedule recurring solar cleaning tasks, track completion, and automate follow-ups.", arrow: false },
          ].map((step) => (
            <div className="sol-step" key={step.num}>
              <div className="sol-step-num">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
              {step.arrow && <div className="sol-step-arrow">→</div>}
            </div>
          ))}
        </div>
      </section>

      
      <section className="sol-cta">
        <div>
          <h2>
            Ready to streamline your{" "}
            <span className="sol-cta-accent">solar cleaning?</span>
          </h2>
          <p>Start organizing clients, teams, and cleaning schedules efficiently — all in one place.</p>
        </div>
        <div className="sol-cta-buttons">
          <Link to="/tasks" className="sol-btn-amber">Get started →</Link>
          <Link to="/clients" className="sol-btn-ghost">View clients</Link>
        </div>
      </section>

      
      <footer className="sol-footer">
        <span>© 2026 SolarOps. All rights reserved.</span>
        <span>Solar Cleaning Management Platform</span>
      </footer>

    </div>
  );
}
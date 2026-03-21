import React, { useState } from "react";
import axios from "axios";

function App() {
  const [studentId, setStudentId] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const searchStudent = async () => {
    if (!studentId.trim()) return;
    setLoading(true);
    setError("");
    try {    
      const response = await axios.get(
        `http://127.0.0.1:8000/student/${studentId}`
      );
      setData(response.data);
      setError("");
    } catch (err) {
      setError("No student found with this ID. Please check and try again.");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    window.open(`http://127.0.0.1:8000/student/${studentId}/pdf`, "_blank");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") searchStudent();
  };

  // ─── RESULTS PAGE ────────────────────────────────────────────────────────
  if (data) {
    const subjects = [
      {
        name: "Mathematics",
        sub: "Advanced Calculus & Algebra",
        credits: "4.0",
        grade: data.maths,
        img: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=56&h=56&fit=crop&auto=format",
        color: "#dbeafe",
        textColor: "#1e40af",
      },
      {
        name: "Physics",
        sub: "Quantum Mechanics",
        credits: "4.0",
        grade: data.physics,
        img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=56&h=56&fit=crop&auto=format",
        color: "#ede9fe",
        textColor: "#5b21b6",
      },
      {
        name: "Biology",
        sub: "Molecular Biology Lab",
        credits: "3.0",
        grade: data.biology,
        img: "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?w=56&h=56&fit=crop&auto=format",
        color: "#d1fae5",
        textColor: "#065f46",
      },
    ];

    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: 'Plus Jakarta Sans', sans-serif; }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes spin { to { transform: rotate(360deg); } }
          .card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
          .card-hover:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(37,99,235,0.12) !important; }
          .btn-dl:hover { background: #1e40af !important; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(37,99,235,0.35) !important; }
          .row-hover { transition: background 0.15s; }
          .row-hover:hover { background: #f8fafc !important; }
          .nav-link:hover { color: #2563eb !important; }
          .anim-1 { animation: fadeUp 0.5s 0.0s ease both; }
          .anim-2 { animation: fadeUp 0.5s 0.1s ease both; }
          .anim-3 { animation: fadeUp 0.5s 0.2s ease both; }
          .anim-4 { animation: fadeUp 0.5s 0.3s ease both; }
        `}</style>

        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: "#f1f5f9", minHeight: "100vh" }}>
          {/* Navbar */}
          <nav style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ background: "linear-gradient(135deg,#2563eb,#06b6d4)", borderRadius: 10, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(37,99,235,0.3)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span style={{ fontWeight: 800, fontSize: 18, color: "#0f172a", letterSpacing: -0.3 }}>EduPortal</span>
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              {["Dashboard", "Results", "Schedule", "Profile"].map((item) => (
                <span key={item} className="nav-link" style={{ fontSize: 14, fontWeight: item === "Results" ? 700 : 500, color: item === "Results" ? "#2563eb" : "#475569", padding: "6px 14px", borderRadius: 8, background: item === "Results" ? "#eff6ff" : "transparent", cursor: "pointer", transition: "color 0.15s" }}>
                  {item}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "1.5px solid #e2e8f0" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format" alt="avatar" style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover", border: "2.5px solid #e2e8f0" }} />
            </div>
          </nav>

          {/* Page Header */}
          <div className="anim-1" style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 40%, #0369a1 100%)", padding: "44px 40px 64px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle,rgba(6,182,212,0.18),transparent 70%)" }} />
            <div style={{ position: "absolute", bottom: -60, left: -40, width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,0.2),transparent 70%)" }} />
            <div style={{ maxWidth: 960, margin: "0 auto" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 20, padding: "5px 14px", marginBottom: 18 }}>
                <div style={{ width: 7, height: 7, background: "#34d399", borderRadius: "50%" }} />
                <span style={{ color: "#e0f2fe", fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" }}>Academic Year 2023–24</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
                <div>
                  <h1 style={{ fontSize: 42, fontWeight: 900, color: "#fff", marginBottom: 12, letterSpacing: -1 }}>Academic Results</h1>
                  <div style={{ display: "flex", gap: 24, color: "#bae6fd", fontSize: 14 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="7" r="4" stroke="#7dd3fc" strokeWidth="2"/></svg>
                      Student: <strong style={{ color: "#fff" }}>{data.name}</strong>
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke="#7dd3fc" strokeWidth="2"/><path d="M16 2v3M8 2v3M2 10h20" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round"/></svg>
                      ID: <strong style={{ color: "#fff" }}>{data.student_id}</strong>
                    </span>
                  </div>
                </div>
                <button onClick={downloadPDF} className="btn-dl" style={{ background: "#fff", color: "#1e40af", border: "none", borderRadius: 12, padding: "13px 26px", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.15)", transition: "all 0.2s" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="#1e40af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Download PDF
                </button>
              </div>
            </div>
          </div>

          <div style={{ maxWidth: 960, margin: "-30px auto 0", padding: "0 24px 60px" }}>
            {/* Stats */}
            <div className="anim-2" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 28 }}>
              {[
                {
                  label: "Total Credits", value: "120", sub: "Out of 160 required",
                  color: "#2563eb", bg: "#eff6ff", progress: 75,
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 20V10M12 20V4M6 20v-6" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round"/></svg>,
                },
                {
                  label: "GPA Score", value: "3.85", sub: "+0.2 from last semester ↑",
                  color: "#d97706", bg: "#fffbeb", isGpa: true,
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="#d97706" strokeWidth="2" fill="#fde68a"/></svg>,
                },
                {
                  label: "Overall Status", value: "PASSED", sub: "Excellent Standing",
                  color: "#059669", bg: "#ecfdf5", isPassed: true,
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="#059669" strokeWidth="2" strokeLinecap="round"/><polyline points="22 4 12 14.01 9 11.01" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                },
              ].map((s, i) => (
                <div key={i} className="card-hover" style={{ background: "#fff", borderRadius: 16, padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <span style={{ color: "#64748b", fontSize: 13, fontWeight: 600 }}>{s.label}</span>
                    <div style={{ background: s.bg, borderRadius: 10, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.icon}</div>
                  </div>
                  <div style={{ fontSize: s.isPassed ? 30 : 40, fontWeight: 900, color: "#0f172a", marginBottom: 8, letterSpacing: -1 }}>{s.value}</div>
                  {s.progress && (
                    <div style={{ height: 5, background: "#e2e8f0", borderRadius: 99, marginBottom: 8, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${s.progress}%`, background: `linear-gradient(90deg,${s.color},#06b6d4)`, borderRadius: 99 }} />
                    </div>
                  )}
                  <div style={{ fontSize: 12, fontWeight: 500 }}>
                    {s.isPassed
                      ? <span style={{ background: "#d1fae5", color: "#065f46", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{s.sub}</span>
                      : <span style={{ color: s.isGpa ? "#059669" : "#64748b" }}>{s.sub}</span>
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* Subject Table */}
            <div className="anim-3" style={{ background: "#fff", borderRadius: 20, boxShadow: "0 2px 16px rgba(0,0,0,0.07)", border: "1px solid #f1f5f9", overflow: "hidden", marginBottom: 24 }}>
              <div style={{ padding: "24px 28px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", marginBottom: 2 }}>Detailed Subject Performance</h2>
                  <p style={{ fontSize: 13, color: "#94a3b8" }}>Last updated: October 24, 2023</p>
                </div>
                <span style={{ background: "#f0fdf4", color: "#16a34a", fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 20, border: "1px solid #bbf7d0" }}>All Completed</span>
              </div>
              <div style={{ padding: "0 8px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 90px 120px", padding: "12px 20px", color: "#94a3b8", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
                  <span>Subject</span><span>Credits</span><span>Grade</span><span style={{ textAlign: "right" }}>Status</span>
                </div>
                {subjects.map((s, i) => (
                  <div key={i} className="row-hover" style={{ display: "grid", gridTemplateColumns: "1fr 120px 90px 120px", padding: "14px 20px", alignItems: "center", borderTop: "1px solid #f8fafc", borderRadius: 12, margin: "4px 0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 12, overflow: "hidden", flexShrink: 0, border: `2px solid ${s.color}` }}>
                        <img src={s.img} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: "#0f172a", fontSize: 15 }}>{s.name}</div>
                        <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 2 }}>{s.sub}</div>
                      </div>
                    </div>
                    <div style={{ fontWeight: 600, color: "#475569", fontSize: 14 }}>{s.credits} <span style={{ color: "#94a3b8", fontWeight: 400 }}>credits</span></div>
                    <div>
                      <span style={{ background: s.color, color: s.textColor, fontWeight: 800, fontSize: 16, width: 44, height: 44, borderRadius: 10, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{s.grade}</span>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ background: "#f0fdf4", color: "#16a34a", fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 20, border: "1px solid #bbf7d0", display: "inline-flex", alignItems: "center", gap: 5 }}>
                        <span style={{ width: 6, height: 6, background: "#22c55e", borderRadius: "50%", display: "inline-block" }} />
                        Completed
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inquiry Banner */}
            <div className="anim-4" style={{ background: "linear-gradient(135deg,#1e3a8a,#1e40af)", borderRadius: 20, padding: "28px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 12, width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "#fff", fontSize: 16, marginBottom: 4 }}>Need clarification on your results?</div>
                  <div style={{ color: "#bae6fd", fontSize: 13 }}>Contact the academic registrar's office for a detailed review.</div>
                </div>
              </div>
              <button style={{ background: "#fff", color: "#1e40af", border: "none", borderRadius: 12, padding: "12px 26px", fontWeight: 700, fontSize: 14, cursor: "pointer", whiteSpace: "nowrap" }}>Submit Inquiry →</button>
            </div>
          </div>

          <footer style={{ borderTop: "1px solid #e2e8f0", padding: "18px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#94a3b8", fontSize: 13, background: "#fff" }}>
            <span>© 2024 EduPortal Academic Management System</span>
            <div style={{ display: "flex", gap: 24 }}>
              {["Privacy Policy", "Terms of Service", "Support"].map((l) => (
                <a key={l} href="#" style={{ color: "#94a3b8", textDecoration: "none" }}>{l}</a>
              ))}
            </div>
          </footer>
        </div>
      </>
    );
  }

  // ─── LANDING PAGE ────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%,100% { opacity: 1; box-shadow: 0 0 0 0 rgba(52,211,153,0.4); }
          50% { opacity: 0.8; box-shadow: 0 0 0 6px rgba(52,211,153,0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .anim-1 { animation: fadeUp 0.6s 0.0s ease both; }
        .anim-2 { animation: fadeUp 0.6s 0.15s ease both; }
        .anim-3 { animation: fadeUp 0.6s 0.25s ease both; }
        .anim-4 { animation: fadeUp 0.6s 0.1s ease both; }
        .anim-5 { animation: fadeUp 0.6s 0.2s ease both; }
        .anim-6 { animation: fadeUp 0.6s 0.3s ease both; }
        .float-img { animation: float 5s ease-in-out infinite; }
        .pulse-dot { animation: pulse 2s infinite; }
        .card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(37,99,235,0.15) !important; }
        .btn-primary { transition: all 0.2s ease; }
        .btn-primary:hover { background: #1e40af !important; transform: translateY(-2px); box-shadow: 0 12px 32px rgba(37,99,235,0.45) !important; }
        .nav-link:hover { color: #2563eb !important; }
        .input-focus:focus { border-color: #2563eb !important; box-shadow: 0 0 0 4px rgba(37,99,235,0.12) !important; outline: none; }
        .feature-img { transition: transform 0.4s ease; }
        .card-hover:hover .feature-img { transform: scale(1.05); }
      `}</style>

      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: "#f8faff", minHeight: "100vh" }}>
        {/* Navbar */}
        <nav style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(226,232,240,0.8)", padding: "0 48px", height: 66, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 14px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ background: "linear-gradient(135deg,#2563eb,#06b6d4)", borderRadius: 10, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(37,99,235,0.35)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span style={{ fontWeight: 800, fontSize: 19, color: "#0f172a", letterSpacing: -0.4 }}>Academic Portal</span>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {["Home", "Admissions", "Academic Calendar", "Help Center"].map((item) => (
              <span key={item} className="nav-link" style={{ fontSize: 14, fontWeight: 500, color: "#475569", padding: "7px 14px", borderRadius: 8, cursor: "pointer", transition: "color 0.15s" }}>{item}</span>
            ))}
          </div>
          <button className="btn-primary" style={{ background: "linear-gradient(135deg,#2563eb,#1e40af)", color: "#fff", border: "none", borderRadius: 10, padding: "10px 26px", fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 14px rgba(37,99,235,0.3)" }}>Login</button>
        </nav>

        {/* Hero */}
        <section style={{ background: "linear-gradient(160deg, #0f172a 0%, #1e3a8a 45%, #0c4a6e 100%)", padding: "88px 48px 140px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -120, right: -120, width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle,rgba(6,182,212,0.15),transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: -80, left: -80, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,0.18),transparent 70%)" }} />
          <div style={{ position: "absolute", top: "30%", right: "15%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,255,255,0.04),transparent 70%)" }} />

          <div style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            {/* Left */}
            <div className="anim-1">
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.16)", borderRadius: 20, padding: "6px 16px", marginBottom: 28 }}>
                <span className="pulse-dot" style={{ width: 8, height: 8, background: "#34d399", borderRadius: "50%", display: "inline-block", flexShrink: 0 }} />
                <span style={{ color: "#e0f2fe", fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" }}>Secure Academic Platform</span>
              </div>
              <h1 style={{ fontSize: 56, fontWeight: 900, color: "#fff", lineHeight: 1.08, marginBottom: 22, letterSpacing: -1.5 }}>
                View Your<br />
                <span style={{ background: "linear-gradient(90deg,#38bdf8,#06b6d4,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Academic</span><br />
                Results
              </h1>
              <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.75, marginBottom: 36, maxWidth: 460 }}>
                Securely access your performance records, semester grades, and official transcripts by entering your Unique Student ID.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[{ icon: "🔒", label: "End-to-end encrypted" }, { icon: "⚡", label: "Real-time results" }, { icon: "📄", label: "PDF export" }].map((b) => (
                  <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: "7px 16px" }}>
                    <span style={{ fontSize: 14 }}>{b.icon}</span>
                    <span style={{ color: "#cbd5e1", fontSize: 13, fontWeight: 500 }}>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right – hero image */}
            <div className="anim-2">
              <div className="float-img" style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <img
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=700&h=280&fit=crop&auto=format"
                  alt="University students studying"
                  style={{ width: "100%", height: 280, objectFit: "cover", display: "block" }}
                />
                <div style={{ background: "rgba(15,23,42,0.9)", backdropFilter: "blur(10px)", padding: "18px 24px", display: "flex", justifyContent: "space-around" }}>
                  {[{ n: "50K+", l: "Students" }, { n: "98%", l: "Accuracy" }, { n: "24/7", l: "Access" }].map((s) => (
                    <div key={s.l} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 24, fontWeight: 900, color: "#38bdf8", letterSpacing: -0.5 }}>{s.n}</div>
                      <div style={{ fontSize: 11, color: "#64748b", fontWeight: 600, marginTop: 2, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Card floating over hero */}
        <section style={{ maxWidth: 820, margin: "-56px auto 0", padding: "0 24px 16px", position: "relative", zIndex: 10 }}>
          <div className="anim-3" style={{ background: "#fff", borderRadius: 28, boxShadow: "0 28px 72px rgba(0,0,0,0.16)", border: "1px solid #f1f5f9", padding: "40px 44px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 26 }}>
              <div style={{ background: "linear-gradient(135deg,#eff6ff,#e0f2fe)", borderRadius: 12, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #bfdbfe" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#2563eb" strokeWidth="2.5"/><path d="m21 21-4.35-4.35" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round"/></svg>
              </div>
              <div>
                <h2 style={{ fontSize: 21, fontWeight: 800, color: "#0f172a", margin: 0 }}>Search Records</h2>
                <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>Enter your student ID to instantly access your results</p>
              </div>
            </div>

            <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 10, letterSpacing: 0.3, textTransform: "uppercase" }}>
              Unique Student ID (USID)
            </label>
            <div style={{ display: "flex", gap: 12, marginBottom: 10 }}>
              <div style={{ flex: 1, position: "relative" }}>
                <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke="#94a3b8" strokeWidth="2"/><path d="M16 2v3M8 2v3M2 10h20" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/></svg>
                </div>
                <input
                  type="text"
                  placeholder="e.g. STU1234567890"
                  className="input-focus"
                  style={{ width: "100%", border: `2px solid ${focused ? "#2563eb" : "#e2e8f0"}`, borderRadius: 14, padding: "15px 16px 15px 46px", fontSize: 15, color: "#0f172a", background: "#f8faff", transition: "border-color 0.2s, box-shadow 0.2s", fontFamily: "inherit", outline: "none" }}
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                />
              </div>
              <button
                onClick={searchStudent}
                disabled={loading}
                className="btn-primary"
                style={{ background: "linear-gradient(135deg,#2563eb,#06b6d4)", color: "#fff", border: "none", borderRadius: 14, padding: "15px 36px", fontWeight: 800, fontSize: 15, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 10, whiteSpace: "nowrap", boxShadow: "0 8px 24px rgba(37,99,235,0.38)", opacity: loading ? 0.75 : 1 }}
              >
                {loading ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 0.8s linear infinite" }}><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/><path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></svg>
                    Searching...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#fff" strokeWidth="2"/><polyline points="14 2 14 8 20 8" stroke="#fff" strokeWidth="2"/></svg>
                    View Result
                  </>
                )}
              </button>
            </div>
            <p style={{ fontSize: 12, color: "#94a3b8" }}>Please enter the 10-digit ID provided on your student identification card.</p>
            {error && (
              <div style={{ marginTop: 14, background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: "12px 18px", display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2"/><path d="M12 8v4M12 16h.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/></svg>
                <span style={{ color: "#dc2626", fontSize: 13, fontWeight: 600 }}>{error}</span>
              </div>
            )}
          </div>
        </section>

        {/* Feature Cards */}
        <section style={{ maxWidth: 1120, margin: "56px auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }} className="anim-4">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 20, padding: "5px 14px", marginBottom: 16 }}>
              <span style={{ color: "#2563eb", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>Features</span>
            </div>
            <h2 style={{ fontSize: 36, fontWeight: 900, color: "#0f172a", marginBottom: 10, letterSpacing: -0.7 }}>Why use Academic Portal?</h2>
            <p style={{ color: "#64748b", fontSize: 16, maxWidth: 500, margin: "0 auto" }}>Everything you need to track and share your academic achievements.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 26 }}>
            {[
              {
                img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=220&fit=crop&auto=format",
                iconBg: "linear-gradient(135deg,#eff6ff,#dbeafe)", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                badge: "Security", badgeBg: "#eff6ff", badgeColor: "#2563eb",
                title: "Secure Access", desc: "Your data is protected with end-to-end encryption and strict privacy protocols ensuring complete confidentiality.",
              },
              {
                img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=220&fit=crop&auto=format",
                iconBg: "linear-gradient(135deg,#ecfeff,#cffafe)", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="#06b6d4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                badge: "Live", badgeBg: "#ecfeff", badgeColor: "#0891b2",
                title: "Real-time Updates", desc: "View the latest semester results as soon as they are published by the faculty without any delays.",
              },
              {
                img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&h=220&fit=crop&auto=format",
                iconBg: "linear-gradient(135deg,#f5f3ff,#ede9fe)", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round"/><polyline points="14 2 14 8 20 8" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round"/><line x1="9" y1="15" x2="15" y2="15" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round"/></svg>,
                badge: "Export", badgeBg: "#f5f3ff", badgeColor: "#7c3aed",
                title: "PDF Transcripts", desc: "Download and save official digital copies of your academic performance reports with one click.",
              },
            ].map((f, i) => (
              <div key={i} className={`card-hover anim-${4 + i}`} style={{ background: "#fff", borderRadius: 22, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.07)", border: "1px solid #f1f5f9" }}>
                <div style={{ height: 180, overflow: "hidden", position: "relative" }}>
                  <img src={f.img} alt={f.title} className="feature-img" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,transparent 50%,rgba(0,0,0,0.25))" }} />
                  <div style={{ position: "absolute", top: 14, left: 14 }}>
                    <span style={{ background: f.badgeBg, color: f.badgeColor, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, backdropFilter: "blur(4px)", letterSpacing: 0.5 }}>{f.badge}</span>
                  </div>
                </div>
                <div style={{ padding: "24px 26px 28px" }}>
                  <div style={{ background: f.iconBg, borderRadius: 14, width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>{f.icon}</div>
                  <h3 style={{ fontWeight: 800, fontSize: 18, color: "#0f172a", marginBottom: 10 }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section style={{ maxWidth: 1120, margin: "0 auto 72px", padding: "0 24px" }}>
          <div style={{ background: "linear-gradient(135deg,#1e3a8a 0%,#1e40af 55%,#0369a1 100%)", borderRadius: 28, overflow: "hidden", position: "relative", display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 32, padding: "52px 56px" }}>
            <div style={{ position: "absolute", right: -60, top: -60, width: 280, height: 280, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
            <div style={{ position: "absolute", right: 80, bottom: -70, width: 200, height: 200, borderRadius: "50%", background: "rgba(6,182,212,0.1)" }} />
            <div style={{ position: "relative" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 20, padding: "4px 14px", marginBottom: 18 }}>
                <span style={{ width: 6, height: 6, background: "#34d399", borderRadius: "50%", display: "inline-block" }} />
                <span style={{ color: "#e0f2fe", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>Get Started</span>
              </div>
              <h2 style={{ fontSize: 32, fontWeight: 900, color: "#fff", marginBottom: 10, letterSpacing: -0.6 }}>Ready to check your results?</h2>
              <p style={{ color: "#bae6fd", fontSize: 15, margin: 0 }}>Enter your student ID and access your complete academic record instantly.</p>
            </div>
            <button onClick={() => window.scrollTo({ top: 500, behavior: "smooth" })} style={{ background: "#fff", color: "#1e40af", border: "none", borderRadius: 14, padding: "16px 34px", fontWeight: 800, fontSize: 16, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, boxShadow: "0 8px 28px rgba(0,0,0,0.2)", position: "relative" }}>
              Get Started →
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ background: "#0f172a", color: "#64748b", padding: "60px 64px 28px" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 56, marginBottom: 48 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                  <div style={{ background: "linear-gradient(135deg,#2563eb,#06b6d4)", borderRadius: 10, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span style={{ fontWeight: 800, fontSize: 18, color: "#f1f5f9" }}>Academic Portal</span>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: "#64748b", maxWidth: 320 }}>Dedicated to providing students with seamless access to their academic achievements and educational resources.</p>
              </div>
              <div>
                <h4 style={{ color: "#94a3b8", fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 22 }}>Support</h4>
                {["Technical Help", "FAQs", "Contact Registrar"].map((l) => (
                  <div key={l} style={{ marginBottom: 14 }}><a href="#" style={{ color: "#64748b", textDecoration: "none", fontSize: 14 }}>{l}</a></div>
                ))}
              </div>
              <div>
                <h4 style={{ color: "#94a3b8", fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 22 }}>Contact Us</h4>
                <div style={{ marginBottom: 14, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#64748b" strokeWidth="2"/><polyline points="22,6 12,13 2,6" stroke="#64748b" strokeWidth="2"/></svg>
                  support@academicportal.edu
                </div>
                <div style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="#64748b" strokeWidth="2"/></svg>
                  +1 (555) 0123-4567
                </div>
              </div>
            </div>
            <div style={{ borderTop: "1px solid #1e293b", paddingTop: 26, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <span style={{ fontSize: 13 }}>© 2024 Academic Portal Systems. All rights reserved.</span>
              <div style={{ display: "flex", gap: 24 }}>
                {["Privacy Policy", "Terms of Service", "Cookies"].map((l) => (
                  <a key={l} href="#" style={{ color: "#64748b", textDecoration: "none", fontSize: 13 }}>{l}</a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
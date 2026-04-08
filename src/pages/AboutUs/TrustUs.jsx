import { useState, useEffect, useRef } from "react";

const data = {
    Technology: [
        { year: "2019", finances: 40, economy: 44, investment: 28 },
        { year: "2020", finances: 22, economy: 32, investment: 36 },
        { year: "2021", finances: 34, economy: 40, investment: 34 },
        { year: "2022", finances: 44, economy: 40, investment: 30 },
    ],
    Development: [
        { year: "2019", finances: 38, economy: 48, investment: 25 },
        { year: "2020", finances: 30, economy: 42, investment: 38 },
        { year: "2021", finances: 30, economy: 44, investment: 42 },
        { year: "2022", finances: 46, economy: 36, investment: 28 },
    ],
    Research: [
        { year: "2019", finances: 46, economy: 50, investment: 31 },
        { year: "2020", finances: 26, economy: 37, investment: 41 },
        { year: "2021", finances: 37, economy: 46, investment: 38 },
        { year: "2022", finances: 50, economy: 45, investment: 36 },
    ],
};

const MAX = 50;
const CHART_HEIGHT = 220;

const tabs = ["Technology", "Development", "Research"];

const BAR_COLORS = {
    finances: "#c9dbd8",
    economy: "#8db8b2",
    investment: "#1e2d3d",
};

const LEGEND = [
    { key: "finances", label: "Strategy" },
    { key: "economy", label: "Innovation" },
    { key: "investment", label: "Success" },
];

const Y_LABELS = [50, 40, 30, 20, 10, 0];

const tabDescriptions = {
    Technology: "We leverage the latest SAP S/4HANA innovations and cloud architectures to build a resilient, high-performance digital core for your enterprise. Our approach integrates real-time analytics and intelligent automation to ensure your infrastructure is future-proof.",
    Development: "Our agile development team handles complex SAP customizations and full-scale migrations with precision. We specialize in bespoke application development and backend optimizations that bridge the gap between legacy systems and modern requirements.",
    Research: "Through deep market analysis and feasibility studies, we craft strategic roadmaps that ensure your technology investments deliver measurable ROI. Every decision is backed by comprehensive data audits and competitive benchmarking."
};

export default function TrustUs() {
    const [activeTab, setActiveTab] = useState("Research");
    const [animationKey, setAnimationKey] = useState(0);
    const [inView, setInView] = useState(false);
    const sectionRef = useRef(null);
    const chartData = data[activeTab];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setAnimationKey(prev => prev + 1);
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,300&display=swap');

        .bc-wrap {
          font-family: 'DM Sans', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: auto;
          background: #ffffff;
          padding: 60px 48px 20px 48px;
        }

        .bc-card {
          display: flex;
          align-items: center;
          padding: 0;
          gap: 100px;
          max-width: 1100px;
          width: 100%;
        }

        .bc-left {
          flex: 0 0 320px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .bc-left h1 {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5em;
          color: #111;
          margin-bottom: 8px;
        }

        .bc-main-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 56px;
          font-weight: 800;
          line-height: 1.0;
          color: #000000;
          letter-spacing: -2px;
          margin-bottom: 24px;
        }

        .bc-left p {
          font-weight: 300;
          font-size: 15px;
          color: #666;
          line-height: 1.6;
        }

        .bc-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 32px;
          min-width: 0;
        }

        .bc-tabs {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .bc-tab {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 14px;
          color: #777;
          padding: 8px 18px;
          border-radius: 8px;
          cursor: pointer;
          background: #f8f9fa;
          border: 1px solid transparent;
          transition: all 0.2s;
        }
        .bc-tab:hover { background: #f0f0f0; }
        .bc-tab.active {
          background: #ffffff;
          border-color: #eee;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          color: #1a1a1a;
        }

        .bc-chart-container {
           width: 100%;
           overflow-x: auto;
           padding-bottom: 10px;
        }

        .bc-chart-wrap {
          display: flex;
          gap: 20px;
          align-items: flex-end;
          min-width: 600px;
        }

        .bc-chart-area {
          flex: 1;
          position: relative;
        }

        .bc-y-axis {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 26px;
          width: 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          padding-right: 8px;
        }

        .bc-y-label {
          font-size: 11px;
          font-weight: 400;
          color: #bbb;
          line-height: 1;
        }

        .bc-chart-inner {
          margin-left: 40px;
          position: relative;
        }

        .bc-grid {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          pointer-events: none;
        }

        .bc-grid-line {
          border-top: 1px solid #f2f2f2;
          width: 100%;
        }

        .bc-bars {
          display: flex;
          align-items: flex-end;
          justify-content: space-around;
          position: relative;
          z-index: 1;
        }

        .bc-year-group {
          display: flex;
          align-items: flex-end;
          gap: 6px;
        }

        .bc-bar {
          width: 22px;
          border-radius: 4px 4px 0 0;
          opacity: 0;
          transform: scaleY(0);
          transform-origin: bottom;
        }

        .bc-bar.animate {
          animation: barRise 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: var(--delay);
        }

        @keyframes barRise {
          0% {
            opacity: 0;
            transform: scaleY(0);
          }
          100% {
            opacity: 1;
            transform: scaleY(1);
          }
        }

        .bc-x-labels {
          display: flex;
          justify-content: space-around;
          margin-top: 12px;
          padding-left: 40px;
        }

        .bc-x-label {
          font-size: 13px;
          font-weight: 500;
          color: #999;
          text-align: center;
          width: 80px;
        }

        .bc-legend {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-left: 20px;
          padding-bottom: 35px;
        }

        .bc-legend-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          font-weight: 500;
          color: #444;
          white-space: nowrap;
        }

        .bc-legend-dot {
          width: 12px;
          height: 12px;
          border-radius: 3px;
          flex-shrink: 0;
        }

        @media (max-width: 1024px) {
           .bc-card { gap: 40px; }
           .bc-left { flex: 0 0 280px; }
        }

        @media (max-width: 900px) {
          .bc-wrap { padding: 80px 30px; }
          .bc-card {
            flex-direction: column;
            align-items: flex-start;
          }
          .bc-left {
            flex: unset;
            width: 100%;
            max-width: 600px;
          }
          .bc-right {
             width: 100%;
          }
          .bc-legend {
             flex-direction: row;
             margin-left: 0;
             padding-bottom: 0;
             margin-top: 20px;
             order: 3;
          }
          .bc-chart-wrap {
             flex-direction: column;
             align-items: flex-start;
             min-width: unset;
             height: auto;
          }
          .bc-chart-area {
             width: 100%;
          }
        }

        @media (max-width: 480px) {
           .bc-wrap { padding: 60px 20px; }
           .bc-bars { justify-content: space-between; }
           .bc-year-group { gap: 3px; }
           .bc-bar { width: 14px; }
        }
      `}</style>

            <div className="bc-wrap" ref={sectionRef}>
                <div className="bc-card">

                    {/* LEFT CONTENT */}
                    <div className="bc-left">
                        <h1>Trust the process &amp; grow your business</h1>
                        <p className="font-light">{tabDescriptions[activeTab]}</p>
                    </div>

                    {/* RIGHT */}
                    <div className="bc-right">

                        {/* TABS */}
                        <div className="bc-tabs">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    className={`bc-tab${activeTab === tab ? " active" : ""}`}
                                    onClick={() => handleTabClick(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* CHART */}
                        <div className="bc-chart-container" key={animationKey}>
                            <div className="bc-chart-wrap">
                                <div className="bc-chart-area">

                                    {/* Y-axis */}
                                    <div className="bc-y-axis">
                                        {Y_LABELS.map((v) => (
                                            <span key={v} className="bc-y-label">{v}</span>
                                        ))}
                                    </div>

                                    {/* Grid + Bars */}
                                    <div className="bc-chart-inner">
                                        <div className="bc-grid">
                                            {Y_LABELS.map((v) => (
                                                <div key={v} className="bc-grid-line" />
                                            ))}
                                        </div>

                                        <div className="bc-bars" style={{ height: CHART_HEIGHT }} key={`bars-${animationKey}`}>
                                            {chartData.map((d, yearIdx) => (
                                                <div key={d.year} className="bc-year-group">
                                                    {["finances", "economy", "investment"].map((key, barIdx) => (
                                                        <div
                                                            key={key}
                                                            className={`bc-bar${inView ? " animate" : ""}`}
                                                            style={{
                                                                height: (d[key] / MAX) * CHART_HEIGHT,
                                                                background: BAR_COLORS[key],
                                                                "--delay": `${(yearIdx * 3 + barIdx) * 0.1}s`,
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* X-axis */}
                                    <div className="bc-x-labels">
                                        {chartData.map((d) => (
                                            <span key={d.year} className="bc-x-label">{d.year}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* LEGEND */}
                                <div className="bc-legend">
                                    {LEGEND.map(({ key, label }) => (
                                        <div key={key} className="bc-legend-item">
                                            <span className="bc-legend-dot" style={{ background: BAR_COLORS[key] }} />
                                            {label}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

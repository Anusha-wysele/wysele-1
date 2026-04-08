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
    { key: "finances", label: "Finances" },
    { key: "economy", label: "Economy" },
    { key: "investment", label: "Investment" },
];

const Y_LABELS = [50, 40, 30, 20, 10, 0];

const tabDescriptions = {
    Technology: "We leverage the latest SAP S/4HANA innovations and cloud architectures to build a resilient, high-performance digital core for your enterprise. Our approach integrates real-time analytics and intelligent automation to ensure your infrastructure is future-proof and scalable at every growth stage.",
    Development: "Our agile development team handles complex SAP customizations and full-scale migrations with precision, ensuring seamless business continuity. We specialize in bespoke application development and backend optimizations that bridge the gap between legacy systems and modern digital requirements.",
    Research: "Through deep market analysis and feasibility studies, we craft strategic roadmaps that ensure your technology investments deliver measurable ROI. Every decision is backed by comprehensive data audits and competitive benchmarking to minimize risk and maximize long-term operational efficiency."
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
            { threshold: 0.2 }
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
          padding: 30px 48px;
        }

        .bc-card {
          display: flex;
          align-items: center;
          padding: 0;
          gap: 100px;
          max-width: 960px;
          width: 100%;
        }

        .bc-left {
          flex: 0 0 250px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .bc-left h1 {
          font-family: 'DM Sans', sans-serif;
          font-size: 17px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5em;
          color: #003366;
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

        .bc-main-title span {
          color: #c51e2d;
          display: inline-block;
          position: relative;
        }

        .bc-main-title span::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 0;
          width: 100%;
          height: 6px;
          background: rgba(249, 212, 35, 0.2);
          z-index: -1;
        }

        .bc-left p {
          font-weight: 300;
          font-size: 14px;
          color: #666;
          line-height: 1.65;
        }

        .bc-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .bc-tabs {
          display: flex;
          gap: 8px;
        }

        .bc-tab {
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          font-size: 13px;
          color: #666;
          padding: 6px 16px;
          border-radius: 6px;
          cursor: pointer;
          background: transparent;
          border: none;
          transition: background 0.15s;
        }
        .bc-tab:hover { background: #f0f0f0; }
        .bc-tab.active {
          background: #e5e5e5;
          font-weight: 500;
          color: #1a1a1a;
        }

        .bc-chart-wrap {
          display: flex;
          gap: 12px;
          align-items: flex-end;
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
          width: 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          padding-right: 4px;
        }

        .bc-y-label {
          font-size: 11px;
          font-weight: 300;
          color: #999;
          line-height: 1;
        }

        .bc-chart-inner {
          margin-left: 34px;
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
          border-top: 1px solid #ebebeb;
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
          gap: 4px;
        }

        .bc-bar {
          width: 19px;
          border-radius: 0;
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
          50% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: scaleY(1);
          }
        }

        .bc-x-labels {
          display: flex;
          justify-content: space-around;
          margin-top: 8px;
        }

        .bc-x-label {
          font-size: 12px;
          font-weight: 300;
          color: #999;
          text-align: center;
          width: 68px;
        }

        .bc-legend {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-left: 6px;
          padding-bottom: 28px;
          align-self: center;
        }

        .bc-legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 300;
          color: #555;
          white-space: nowrap;
        }

        .bc-legend-dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        @media (max-width: 680px) {
          .bc-card {
            flex-direction: column;
            padding: 32px 24px;
            gap: 32px;
          }
          .bc-left {
            flex: unset;
          }
        }
      `}</style>

            <div className="bc-wrap" ref={sectionRef}>
                <div className="bc-card">

                    {/* LEFT CONTENT */}
                    <div className="bc-left">
                        <h1>Trust the process &amp; grow your business</h1>
                        <p>{tabDescriptions[activeTab]}</p>
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
                        <div className="bc-chart-wrap" key={animationKey}>
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
        </>
    );
}

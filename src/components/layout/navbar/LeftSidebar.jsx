import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHouse, FaRegHandshake } from "react-icons/fa6";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const buttons = [
    { id: "home", label: "Home", icon: FaHouse },
    { id: "join us", label: "Join Us", icon: FaRegHandshake },
  ];

  const handleAction = (id) => {
    if (id === "home") {
      if (location.pathname !== "/") {
        navigate("/");
        // Small delay to ensure navigation completes before scrolling if necessary
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
      } else {
        // Already on home, scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
    // Handle other button actions here
  };

  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-[100] hidden md:flex flex-col gap-1 items-start">
      {buttons.map((btn) => {
        const Icon = btn.icon;
        return (
          <div
            key={btn.id}
            onClick={() => handleAction(btn.id)}
            className="flex items-center justify-between bg-[#C9184A] text-white overflow-hidden shadow-md cursor-pointer group w-[36px] hover:w-[110px] transition-[width] duration-300 ease-out"
          >
            {/* Expandable text container on the left */}
            <div className="flex-1 w-0 group-hover:w-auto overflow-hidden flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-[50ms]">
              <span className="whitespace-nowrap text-[13px] font-medium tracking-wide pl-3">
                {btn.label}
              </span>
            </div>
            {/* Icon container on the right edge */}
            <div className="w-[36px] h-[36px] flex-shrink-0 flex items-center justify-center">
              <Icon size={16} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LeftSidebar;

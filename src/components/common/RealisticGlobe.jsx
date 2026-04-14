import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";

// Countries to highlight with different colors
const HIGHLIGHTED_COUNTRIES = {
  "United States of America": "#9FE870",
  "India": "#1E7A8C",
};

// Office locations
const OFFICE_LOCATIONS = [
  {
    name: "Wysele Technologies Hyderabad",
    address: "#308 4th floor DSL Abacus IT Park, Survey Colony, Industrial Development Area, Uppal, Hyderabad, Telangana 500039",
    lat: 17.406544,
    lng: 78.551033,
    color: "#C9184A"
  },
  {
    name: "Wysele Technologies Austin",
    address: "5900 Balcones Drive STE 100, Austin, TX 78731",
    lat: 30.3515,
    lng: -97.7559,
    color: "#C9184A"
  }
];

export default function RealisticGlobe() {
  const svgRef = useRef();
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const { width, height } = dimensions;

    // Create projection - adjusted to fit full world map
    const projection = d3.geoMercator()
      .scale(Math.min(width / 5, height / 3))
      .translate([width / 2, height / 2])
      .center([20, 10]);

    const path = d3.geoPath().projection(projection);

    // Create main group
    const g = svg.append("g");

    // Load world data
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then(response => response.json())
      .then(world => {
        const countries = feature(world, world.objects.countries);

        // Draw countries
        g.selectAll(".country")
          .data(countries.features)
          .enter()
          .append("path")
          .attr("class", "country")
          .attr("d", path)
          .attr("fill", d => {
            const countryName = d.properties.name;
            return HIGHLIGHTED_COUNTRIES[countryName] || "#E5E5E5";
          })
          .attr("stroke", "#ffffff")
          .attr("stroke-width", 0.5)
          .style("cursor", "pointer")
          .style("transition", "all 0.3s ease")
          .on("mouseenter", function(event, d) {
            d3.select(this)
              .attr("fill", d => {
                const countryName = d.properties.name;
                return HIGHLIGHTED_COUNTRIES[countryName] ? "#ffd200" : "#d0d0d0";
              })
              .attr("stroke-width", 1.5);
            setHoveredCountry(d.properties.name);
            setTooltipPos({ x: event.pageX, y: event.pageY });
          })
          .on("mousemove", function(event) {
            setTooltipPos({ x: event.pageX, y: event.pageY });
          })
          .on("mouseleave", function(event, d) {
            d3.select(this)
              .attr("fill", d => {
                const countryName = d.properties.name;
                return HIGHLIGHTED_COUNTRIES[countryName] || "#E5E5E5";
              })
              .attr("stroke-width", 0.5);
            setHoveredCountry(null);
          });

        // Add office location markers
        OFFICE_LOCATIONS.forEach(location => {
          const [x, y] = projection([location.lng, location.lat]);

          // Outer glow circle
          g.append("circle")
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 12)
            .attr("fill", location.color)
            .attr("opacity", 0.2)
            .style("pointer-events", "none");

          // Main pin marker
          g.append("circle")
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 8)
            .attr("fill", location.color)
            .attr("stroke", "#ffffff")
            .attr("stroke-width", 2)
            .style("cursor", "pointer")
            .style("filter", "drop-shadow(0 2px 6px rgba(0,0,0,0.4))")
            .on("mouseenter", function(event) {
              setHoveredCountry(location.name);
              setTooltipPos({ x: event.pageX, y: event.pageY });
            })
            .on("mousemove", function(event) {
              setTooltipPos({ x: event.pageX, y: event.pageY });
            })
            .on("mouseleave", function() {
              setHoveredCountry(null);
            });

          // Pulse animation
          g.append("circle")
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 8)
            .attr("fill", "none")
            .attr("stroke", location.color)
            .attr("stroke-width", 2)
            .attr("opacity", 0.8)
            .style("pointer-events", "none")
            .transition()
            .duration(2000)
            .ease(d3.easeLinear)
            .attr("r", 20)
            .attr("opacity", 0)
            .on("end", function repeat() {
              d3.select(this)
                .attr("r", 8)
                .attr("opacity", 0.8)
                .transition()
                .duration(2000)
                .ease(d3.easeLinear)
                .attr("r", 20)
                .attr("opacity", 0)
                .on("end", repeat);
            });
        });
      });
  }, [dimensions]);

  return (
    <div 
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "100%",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8f9fa",
      }}
    >
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{ display: "block" }}
      />

      {hoveredCountry && (
        <div
          style={{
            position: "fixed",
            left: tooltipPos.x + 15,
            top: tooltipPos.y - 10,
            pointerEvents: "none",
            background: "rgba(0, 0, 0, 0.85)",
            padding: "8px 16px",
            borderRadius: "6px",
            color: "#fff",
            fontSize: "13px",
            fontWeight: "600",
            letterSpacing: "0.5px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            zIndex: 1000,
            whiteSpace: "nowrap",
          }}
        >
          {hoveredCountry}
        </div>
      )}
    </div>
  );
}

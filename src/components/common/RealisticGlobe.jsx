import React, { useEffect, useRef, useState, useMemo } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import { GLOBE_TEXTURES } from "./data";

/* ── CDN assets ─────────────────────────────────────────────── */
const GEOJSON_URL = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson";
const TEX_DAY = GLOBE_TEXTURES.day;
const TEX_NIGHT = GLOBE_TEXTURES.night;
const TEX_BUMP = GLOBE_TEXTURES.bump;
const TEX_WATER = GLOBE_TEXTURES.water;
const TEX_CLOUDS = GLOBE_TEXTURES.clouds;
const TEX_SKY = GLOBE_TEXTURES.sky;
const TEX_MOON = GLOBE_TEXTURES.moon;

/* ── Strategic locations ─────────────────────────────────────── */
const CITIES = [
  { name: "Hyderabad", lat: 17.385, lng: 78.487, size: 0.95, color: "#ffd200" },
  { name: "New York", lat: 40.71, lng: -74.01, size: 0.75, color: "#fff" },
  { name: "Singapore", lat: 1.35, lng: 103.82, size: 0.75, color: "#fff" },
  { name: "London", lat: 51.51, lng: -0.12, size: 0.5, color: "#fff" },
  { name: "Dubai", lat: 25.20, lng: 55.27, size: 0.5, color: "#fff" },
];

/* ── Dynamic arcs ────────────────────────────────────────────── */
const ARCS = [
  { s: [17.385, 78.487], e: [40.71, -74.01] }, // Hyderabad - NY
  { s: [17.385, 78.487], e: [1.35, 103.82] },  // Hyderabad - Singapore
  { s: [40.71, -74.01], e: [51.51, -0.12] },  // NY - London
  { s: [51.51, -0.12], e: [1.35, 103.82] },  // London - Singapore
  { s: [25.2, 55.27], e: [17.385, 78.487] },// Dubai - Hyderabad
].map(({ s, e }, i) => ({
  startLat: s[0], startLng: s[1],
  endLat: e[0], endLng: e[1],
  color: i % 2 === 0 ? "rgba(255,210,0,0.5)" : "rgba(100,200,255,0.5)",
  alt: 0.22 + (i % 3) * 0.08,
}));

export default function RealisticGlobe() {
  const containerRef = useRef();
  const globeRef = useRef();
  const [countries, setCountries] = useState([]);
  const [hovered, setHovered] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dims, setDims] = useState({ width: 600, height: 600 });

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        setDims({ width: entry.contentRect.width, height: entry.contentRect.height });
      }
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch(GEOJSON_URL)
      .then(res => res.json())
      .then(data => { setCountries(data.features || []); setLoading(false); });
  }, []);

  // Explicitly set point of view when globe is ready or loading finishes
  useEffect(() => {
    if (globeRef.current && !loading) {
      // Short delay ensures the canvas has finalized its dimensions
      const timer = setTimeout(() => {
        globeRef.current.pointOfView({ lat: 20, lng: 15, altitude: 2.5 }, 1000);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading, dims]); // Added dims as dependency to reset zoom if window resizes

  // Removed separate useEffect for rotation to handle it inside onGlobeReady for reliability
  const onGlobeReady = () => {
    if (!globeRef.current) return;
    const globe = globeRef.current;

    // Set auto-rotation speed here
    const ctrl = globe.controls();
    if (ctrl) {
      ctrl.autoRotate = true;
      ctrl.autoRotateSpeed = 0.15; // Slightly faster for more dynamic feel
      ctrl.enableDamping = true;
      ctrl.dampingFactor = 0.08;
      ctrl.minDistance = 150;
      ctrl.maxDistance = 500;
      ctrl.update();
    }

    const scene = globe.scene();
    const R = globe.getGlobeRadius();
    const tl = new THREE.TextureLoader();
    tl.crossOrigin = "anonymous";

    // Sunlight (The Sun God)
    const sunLight = new THREE.DirectionalLight(0xffffff, 3.5);
    sunLight.position.set(200, 150, 150);
    sunLight.castShadow = true;
    scene.add(sunLight);

    // Add hemisphere light for more realistic ambient lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    scene.add(hemiLight);

    const ambientLight = scene.children.find(c => c.type === "AmbientLight");
    if (ambientLight) ambientLight.intensity = 0.25;

    // Solar cycle (Dynamic sunlight boundary)
    let angle = 0;
    const rotateSun = () => {
      angle += 0.00004; // Extremely slow solar cycle
      sunLight.position.set(Math.cos(angle) * 250, 100, Math.sin(angle) * 250);
      requestAnimationFrame(rotateSun);
    };
    rotateSun();

    // Earth material upgrades (Defensive approach to avoid "globeMaterial not a function")
    scene.traverse(obj => {
      if (obj.type === "Mesh" && obj.geometry?.type === "SphereGeometry") {
        const radius = obj.geometry.parameters?.radius;
        if (radius > 50 && radius < 110) { // Targeting the Earth mesh
          const mat = obj.material;
          mat.bumpScale = 18;
          mat.roughness = 0.9;
          mat.metalness = 0.1;
          tl.load(TEX_WATER, (t) => {
            mat.specularMap = t;
            mat.specular = new THREE.Color(0x333333);
            mat.shininess = 35;
          });
        }
      }
    });

    // Cloud + Shadow triple-layer for ultra-realism
    tl.load(TEX_CLOUDS, (tex) => {
      // 1. Cloud Shadows (Subtle, dark, low-altitude layer)
      const shadowMat = new THREE.MeshPhongMaterial({
        map: tex, transparent: true, opacity: 0.35, color: "black", depthWrite: false
      });
      const shadowMesh = new THREE.Mesh(new THREE.SphereGeometry(R * 1.006, 128, 128), shadowMat);
      scene.add(shadowMesh);

      // 2. Main Clouds (Actual textures, mid-altitude)
      const cloudMat = new THREE.MeshPhongMaterial({
        map: tex, transparent: true, opacity: 0.88, depthWrite: false, side: THREE.DoubleSide
      });
      const cloudMesh = new THREE.Mesh(new THREE.SphereGeometry(R * 1.015, 128, 128), cloudMat);
      scene.add(cloudMesh);

      // 3. High-altitude wispy clouds
      const wispyMat = new THREE.MeshPhongMaterial({
        map: tex, transparent: true, opacity: 0.25, depthWrite: false
      });
      const wispyMesh = new THREE.Mesh(new THREE.SphereGeometry(R * 1.022, 128, 128), wispyMat);
      scene.add(wispyMesh);

      const animateClouds = () => {
        cloudMesh.rotation.y += 0.00008; // Slightly faster cloud drift
        shadowMesh.rotation.y += 0.00008;
        wispyMesh.rotation.y += 0.00012; // High clouds move faster
        requestAnimationFrame(animateClouds);
      };
      animateClouds();
    });

    // Orbiting Moon
    tl.load(TEX_MOON, (t) => {
      const moonMesh = new THREE.Mesh(
        new THREE.SphereGeometry(R * 0.27, 48, 48),
        new THREE.MeshStandardMaterial({ map: t, roughness: 0.8 })
      );
      scene.add(moonMesh);

      let moonAngle = 0;
      const animateMoon = () => {
        moonAngle += 0.0001; // Extremely slow moon orbit
        moonMesh.position.set(Math.cos(moonAngle) * 300, 40, Math.sin(moonAngle) * 300);
        moonMesh.rotation.y += 0.0005;
        requestAnimationFrame(animateMoon);
      };
      animateMoon();
    });
  };

  return (
    <div ref={containerRef} style={{
      width: "100%",
      height: "100%",
      minHeight: "100%",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        transform: "scale(1.6)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Globe
          ref={globeRef}
          onGlobeReady={onGlobeReady}
          width={dims.width}
          height={dims.height}
          backgroundColor="rgba(0,0,0,0)"
          backgroundImageUrl={TEX_SKY}

          globeImageUrl={TEX_DAY}
          bumpImageUrl={TEX_BUMP}
          nightImageUrl={TEX_NIGHT}

          showAtmosphere={true}
          atmosphereColor="#4a9eff"
          atmosphereAltitude={0.25}

          polygonsData={countries}
          polygonGeoJsonGeometry={d => d.geometry}
          polygonCapColor={d => d === hovered ? "rgba(255,210,0,0.35)" : "rgba(255,255,255,0.03)"}
          polygonSideColor={() => "rgba(70,130,255,0.08)"}
          polygonStrokeColor={d => d === hovered ? "rgba(255,210,0,1)" : "rgba(180,210,255,0.2)"}
          polygonAltitude={d => d === hovered ? 0.02 : 0.001}
          onPolygonHover={setHovered}

          arcsData={ARCS}
          arcColor={d => d.color}
          arcAltitude={d => d.alt}
          arcStroke={0.42}
          arcDashLength={0.48}
          arcDashGap={0.12}
          arcDashAnimateTime={4200}

          labelsData={CITIES}
          labelLat={d => d.lat}
          labelLng={d => d.lng}
          labelText={d => d.name}
          labelSize={d => d.size}
          labelColor={d => d.color}
          labelDotRadius={0.45}
          labelAltitude={0.016}
          labelResolution={2}

          pointOfView={{ lat: 20, lng: 15, altitude: 2.5 }}
        />
      </div>

      {!loading && hovered && (
        <div style={{
          position: "absolute", bottom: 28, right: 30, pointerEvents: "none",
          background: "rgba(4,10,32,0.92)", padding: "8px 18px", borderRadius: "8px",
          border: "1px solid rgba(255,210,0,0.6)", color: "#fff",
          fontSize: "12px", letterSpacing: "1.2px", fontWeight: "600",
          backdropFilter: "blur(6px)", boxShadow: "0 0 20px rgba(255,210,0,0.2)"
        }}>
          {hovered.properties?.NAME || hovered.properties?.ADMIN || ""}
        </div>
      )}
    </div>
  );
}

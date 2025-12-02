"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import * as THREE from "three";

export default function NotFound() {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!canvasRef.current || typeof window === "undefined") {
      return;
    }

    const mountNode = canvasRef.current;
    let animationId: number;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountNode.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 1.2, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff6600, 0.8, 100);
    pointLight2.position.set(-10, -10, 5);
    scene.add(pointLight2);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(0, 5, 5);
    scene.add(directionalLight);

    const arcGeometry = createArcGeometry(3.5, 0.7, 1.8);
    const arcMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xff7733,
      transparent: true,
      opacity: 0.75,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.6,
      thickness: 0.5,
      envMapIntensity: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      side: THREE.DoubleSide,
    });
    const arcMaterial2 = arcMaterial.clone();

    const arc1 = new THREE.Mesh(arcGeometry, arcMaterial);
    const arc2 = new THREE.Mesh(arcGeometry, arcMaterial2);
    scene.add(arc1);
    scene.add(arc2);

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = Date.now() * 0.0003;
      const orbitRadius = 5.5;

      const angle1 = time;
      arc1.position.x = Math.cos(angle1) * orbitRadius;
      arc1.position.y = Math.sin(angle1) * orbitRadius;
      arc1.position.z = Math.sin(angle1) * 1.5;
      arc1.rotation.x = angle1 * 0.5;
      arc1.rotation.y = angle1 * 0.8;
      arc1.rotation.z = angle1;

      const angle2 = time + Math.PI;
      arc2.position.x = Math.cos(angle2) * orbitRadius;
      arc2.position.y = Math.sin(angle2) * orbitRadius;
      arc2.position.z = Math.sin(angle2) * 1.5;
      arc2.rotation.x = angle2 * 0.5;
      arc2.rotation.y = angle2 * 0.8;
      arc2.rotation.z = angle2;

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      mountNode.removeChild(renderer.domElement);
      renderer.dispose();
      arcGeometry.dispose();
      arcMaterial.dispose();
      arcMaterial2.dispose();
    };
  }, []);

  return (
    <div className="varyon404-page">
      <div className="logo">
        <div className="relative mx-auto h-10 w-40">
          <Image src="/branding/vs-logo-light.png" alt="Varyon Studios" fill className="object-contain" />
        </div>
      </div>
      <div id="canvas-container" ref={canvasRef} />
      <div className="content">
        <h1 className="error-code">404</h1>
        <p className="error-message">You’ve found a dead link — but we’d rather create something new for you.</p>
        <button className="cta-button" onClick={() => router.push("/")}>
          Back to homepage
        </button>
      </div>
    </div>
  );
}

function createArcGeometry(radius: number, thickness: number, depth: number) {
  const shape = new THREE.Shape();
  const arcAngle = (110 * Math.PI) / 180;
  const innerRadius = radius - thickness / 2;
  const outerRadius = radius + thickness / 2;

  for (let i = 0; i <= 50; i += 1) {
    const angle = -arcAngle / 2 + (arcAngle * i) / 50;
    const x = Math.cos(angle) * outerRadius;
    const y = Math.sin(angle) * outerRadius;
    if (i === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }

  for (let i = 50; i >= 0; i -= 1) {
    const angle = -arcAngle / 2 + (arcAngle * i) / 50;
    const x = Math.cos(angle) * innerRadius;
    const y = Math.sin(angle) * innerRadius;
    shape.lineTo(x, y);
  }

  shape.closePath();

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.15,
    bevelSize: 0.15,
    bevelSegments: 5,
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geometry.center();
  return geometry;
}

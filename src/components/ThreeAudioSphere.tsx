import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeAudioSphereProps {
  isRecording?: boolean;
  isPlaying?: boolean;
  audioLevel?: number;
  isDarkTheme?: boolean;
}

export const ThreeAudioSphere: React.FC<ThreeAudioSphereProps> = ({
  isRecording = false,
  isPlaying = false,
  audioLevel = 0.5,
  isDarkTheme = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 260;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Create 3D Particle Sphere
    const particleCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const radius = 1.6;
    const goldColor = new THREE.Color(isDarkTheme ? '#C084FC' : '#D49B53');
    const copperColor = new THREE.Color(isDarkTheme ? '#818CF8' : '#D96B43');
    const creamColor = new THREE.Color(isDarkTheme ? '#38BDF8' : '#8C7A6B');

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = radius + (Math.random() - 0.5) * 0.15;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      // Color variation
      const mixRatio = Math.random();
      const c = mixRatio > 0.6 ? goldColor : mixRatio > 0.3 ? copperColor : creamColor;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Texture / Material
    const material = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Inner glowing sphere core
    const coreGeo = new THREE.IcosahedronGeometry(0.9, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: isDarkTheme ? 0xA855F7 : 0xD49B53,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Mouse interactive rotater
    let isMouseDown = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      particles.rotation.y += deltaX * 0.008;
      particles.rotation.x += deltaY * 0.008;
      coreMesh.rotation.y += deltaX * 0.008;
      coreMesh.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;

      // Pulse speed & magnitude based on state
      const pulseSpeed = isRecording ? 8 : isPlaying ? 5 : 1.5;
      const pulseAmp = isRecording ? 0.25 : isPlaying ? 0.15 : 0.04;

      for (let i = 0; i < particleCount; i++) {
        const ox = originalPositions[i * 3];
        const oy = originalPositions[i * 3 + 1];
        const oz = originalPositions[i * 3 + 2];

        // Per-particle sine wave modulation
        const wave = Math.sin(time * pulseSpeed + ox * 3.0 + oy * 2.0) * pulseAmp;

        posArr[i * 3] = ox + ox * wave;
        posArr[i * 3 + 1] = oy + oy * wave;
        posArr[i * 3 + 2] = oz + oz * wave;
      }
      posAttr.needsUpdate = true;

      // Rotations
      particles.rotation.y += 0.004;
      coreMesh.rotation.y -= 0.006;
      coreMesh.rotation.z += 0.002;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      renderer.dispose();
    };
  }, [isRecording, isPlaying, audioLevel, isDarkTheme]);

  return (
    <div className="relative w-full h-[260px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
      <div ref={mountRef} className="w-full h-full" />
      <div className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 backdrop-blur-sm px-3 py-1 rounded-full text-xs shadow-sm border ${
        isDarkTheme ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-[#F3ECE0]/80 border-[#E6DCCB] text-[#6E615A]'
      }`}>
        {isRecording ? '🎙️ Recording 3D Audio Signal...' : isPlaying ? '🔊 Playing Audio Waveform' : '3D Voice Waveform (Click & Drag)'}
      </div>
    </div>
  );
};

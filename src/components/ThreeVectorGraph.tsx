import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { VectorChunk } from '../types';

interface ThreeVectorGraphProps {
  chunks: VectorChunk[];
  onSelectChunk?: (chunk: VectorChunk) => void;
  selectedChunkId?: string;
  isDarkTheme?: boolean;
}

export const ThreeVectorGraph: React.FC<ThreeVectorGraphProps> = ({
  chunks,
  onSelectChunk,
  selectedChunkId,
  isDarkTheme = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredChunk, setHoveredChunk] = useState<VectorChunk | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 350;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for all graph objects
    const graphGroup = new THREE.Group();
    scene.add(graphGroup);

    // Color palette mapping
    const categoryColors: Record<string, THREE.Color> = {
      'System Architecture': new THREE.Color('#D49B53'),
      'RAG Pipeline': new THREE.Color('#A855F7'),
      'Database Design': new THREE.Color('#10B981'),
      'Requirements': new THREE.Color('#06B6D4'),
      'Default': new THREE.Color('#B38048'),
    };

    // Create 3D Nodes based on chunk embeddings or pseudo positions
    const nodeMeshes: { mesh: THREE.Mesh; chunk: VectorChunk; position: THREE.Vector3 }[] = [];
    const positions: THREE.Vector3[] = [];

    chunks.forEach((chunk, index) => {
      const emb = chunk.embedding || [0, 0, 0];
      const x = (emb[0] || (Math.sin(index * 1.5) * 2.5)) * 2.8;
      const y = (emb[1] || (Math.cos(index * 1.5) * 2.5)) * 2.5;
      const z = (emb[2] || (Math.sin(index * 2.2) * 1.5)) * 2.0;

      const pos = new THREE.Vector3(x, y, z);
      positions.push(pos);

      const color = categoryColors[chunk.category] || categoryColors['Default'];

      // Node Geometry
      const isSelected = chunk.chunkId === selectedChunkId;
      const geo = new THREE.SphereGeometry(isSelected ? 0.35 : 0.24, 24, 24);
      const mat = new THREE.MeshPhysicalMaterial({
        color: color,
        roughness: 0.2,
        metalness: 0.1,
        clearcoat: 0.8,
        emissive: isSelected ? color : new THREE.Color('#000000'),
        emissiveIntensity: isSelected ? 0.5 : 0.0,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(pos);
      mesh.userData = { chunk };

      graphGroup.add(mesh);
      nodeMeshes.push({ mesh, chunk, position: pos });
    });

    // Connection lines
    const lineMat = new THREE.LineBasicMaterial({
      color: isDarkTheme ? 0x8B5CF6 : 0xC68E46,
      transparent: true,
      opacity: 0.35,
    });

    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const lineGeo = new THREE.BufferGeometry().setFromPoints([positions[i], positions[j]]);
        const line = new THREE.Line(lineGeo, lineMat);
        graphGroup.add(line);
      }
    }

    // Ambient & Directional Lighting
    const ambientLight = new THREE.AmbientLight(isDarkTheme ? 0x9333EA : 0xFFFBF5, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xFFF3E0, 1.2);
    dirLight.position.set(5, 8, 10);
    scene.add(dirLight);

    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - prevMouse.x;
        const deltaY = e.clientY - prevMouse.y;
        graphGroup.rotation.y += deltaX * 0.008;
        graphGroup.rotation.x += deltaY * 0.008;
        prevMouse = { x: e.clientX, y: e.clientY };
      }

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(graphGroup.children);
      const nodeIntersect = intersects.find((i) => i.object.userData.chunk);

      if (nodeIntersect) {
        setHoveredChunk(nodeIntersect.object.userData.chunk);
        container.style.cursor = 'pointer';
      } else {
        setHoveredChunk(null);
        container.style.cursor = isDragging ? 'grabbing' : 'grab';
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(graphGroup.children);
      const nodeIntersect = intersects.find((i) => i.object.userData.chunk);
      if (nodeIntersect && onSelectChunk) {
        onSelectChunk(nodeIntersect.object.userData.chunk);
      }
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domEl.addEventListener('click', handleClick);

    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      if (!isDragging) {
        graphGroup.rotation.y += 0.003;
      }

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
      cancelAnimationFrame(reqId);
      domEl.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domEl.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [chunks, selectedChunkId, isDarkTheme]);

  return (
    <div className={`relative w-full h-[360px] p-2 flex flex-col justify-between overflow-hidden rounded-2xl border ${
      isDarkTheme ? 'bg-slate-900/80 border-slate-800' : 'clay-card'
    }`}>
      <div className={`absolute top-3 left-4 z-10 px-3 py-1.5 rounded-xl border text-xs font-semibold shadow-sm flex items-center gap-2 ${
        isDarkTheme ? 'bg-slate-950/90 border-slate-800 text-slate-100' : 'bg-[#FAF4EA]/90 border-[#E6DCCB] text-[#2C221E]'
      }`}>
        <span className="w-2 h-2 rounded-full bg-[#D49B53] animate-ping" />
        3D ChromaDB Vector Space ({chunks.length} Nodes)
      </div>

      <div ref={mountRef} className="w-full h-full" />

      {/* Hover Info Banner */}
      {hoveredChunk && (
        <div className={`absolute bottom-3 left-4 right-4 z-10 p-3 rounded-xl border shadow-lg text-xs animate-fade-in ${
          isDarkTheme ? 'bg-slate-950/95 border-slate-800 text-slate-100' : 'bg-[#FFFDF9]/95 border-[#D9CFC0] text-[#2C221E]'
        }`}>
          <div className="font-bold text-[#D49B53] flex items-center justify-between mb-1">
            <span>{hoveredChunk.category} • {hoveredChunk.chunkId}</span>
            {hoveredChunk.similarityScore && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                isDarkTheme ? 'bg-purple-500/20 text-purple-300' : 'bg-[#EFE4D2] text-[#2C221E]'
              }`}>
                Similarity: {(hoveredChunk.similarityScore * 100).toFixed(1)}%
              </span>
            )}
          </div>
          <p className={`line-clamp-2 font-medium ${isDarkTheme ? 'text-slate-300' : 'text-[#6E615A]'}`}>{hoveredChunk.text}</p>
        </div>
      )}
    </div>
  );
};

'use client';

import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Center } from '@react-three/drei';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';
import * as THREE from 'three';

interface GameboyModelProps {
  isPlaying: boolean;
}

function GameboyModel({ isPlaying }: GameboyModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Load the COLLADA model
  const collada = useLoader(ColladaLoader, '/gameboy/source/model/model.dae');

  // Load textures
  const [albedoMap, aoMap, metallicMap, normalMap, roughnessMap] = useLoader(THREE.TextureLoader, [
    '/gameboy/source/model/textures/DefaultMaterial_albedo.jpg',
    '/gameboy/source/model/textures/DefaultMaterial_AO.jpg',
    '/gameboy/source/model/textures/DefaultMaterial_metallic.jpg',
    '/gameboy/source/model/textures/DefaultMaterial_normal.png',
    '/gameboy/source/model/textures/DefaultMaterial_roughness.jpg',
  ]);

  // Apply textures to the model
  useEffect(() => {
    collada.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          map: albedoMap,
          aoMap: aoMap,
          metalnessMap: metallicMap,
          normalMap: normalMap,
          roughnessMap: roughnessMap,
          metalness: 1,
          roughness: 1,
        });
      }
    });
  }, [collada, albedoMap, aoMap, metallicMap, normalMap, roughnessMap]);

  // Auto-rotate the gameboy (only when not playing)
  useFrame((state) => {
    if (groupRef.current && !isPlaying) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  // When play is clicked, animate to front position
  useEffect(() => {
    if (groupRef.current && isPlaying) {
      const startRotation = groupRef.current.rotation.y;
      const targetRotation = Math.PI / 4; // 45 degrees - front-facing view
      const duration = 1000; // 1 second
      const startTime = Date.now();

      // Normalize the rotation to find shortest path
      let diff = targetRotation - startRotation;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      const normalizedTarget = startRotation + diff;

      const animate = () => {
        if (!groupRef.current) return;

        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        // Calculate target rotation (shortest path)
        groupRef.current.rotation.y = startRotation + (normalizedTarget - startRotation) * easeProgress;

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    }
  }, [isPlaying]);

  // Set initial rotation to show the front
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = 0;
      groupRef.current.rotation.y = 0;
      groupRef.current.rotation.z = 0;
    }
  }, []);

  return (
    <Center>
      <group ref={groupRef} scale={0.5} position={[0, 0, 0]}>
        <primitive object={collada.scene} />
      </group>
    </Center>
  );
}

interface Gameboy3DProps {
  isPlaying?: boolean;
}

export function Gameboy3D({ isPlaying = false }: Gameboy3DProps) {
  // Responsive camera settings based on screen size
  const [cameraSettings, setCameraSettings] = useState({
    x: 250,
    y: 150,
    z: 200,
    fov: 43,
  });

  useEffect(() => {
    const updateCameraSettings = () => {
      const width = window.innerWidth;

      if (width < 640) {
        // Mobile - move camera further and wider FOV
        setCameraSettings({ x: 200, y: 120, z: 280, fov: 50 });
      } else if (width < 768) {
        // sm breakpoint
        setCameraSettings({ x: 220, y: 135, z: 240, fov: 47 });
      } else if (width < 1024) {
        // md breakpoint
        setCameraSettings({ x: 240, y: 145, z: 220, fov: 45 });
      } else if (width < 1280) {
        // lg breakpoint
        setCameraSettings({ x: 250, y: 150, z: 200, fov: 43 });
      } else {
        // xl and up - closest view
        setCameraSettings({ x: 260, y: 155, z: 190, fov: 42 });
      }
    };

    updateCameraSettings();
    window.addEventListener('resize', updateCameraSettings);
    return () => window.removeEventListener('resize', updateCameraSettings);
  }, []);

  return (
    <div className="w-full h-full">
      <Canvas shadows camera={{ position: [cameraSettings.x, cameraSettings.y, cameraSettings.z], fov: cameraSettings.fov }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />

          <GameboyModel isPlaying={isPlaying} />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            target={[0, 0, 0]}
          />

          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
}

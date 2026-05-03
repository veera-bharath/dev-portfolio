import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Icosahedron, MeshDistortMaterial, Float } from '@react-three/drei';

const AbstractShape = () => {
  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={3}>
      {/* Outer mesh */}
      <Icosahedron args={[1, 1]} scale={4.5}>
        <MeshDistortMaterial
          color="#00ffff"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          wireframe={true}
          transparent={true}
          opacity={0.8}
        />
      </Icosahedron>
      {/* Inner mesh for a cooler dual-layer effect */}
      <Icosahedron args={[1, 1]} scale={2.5}>
        <MeshDistortMaterial
          color="#915eff"
          attach="material"
          distort={0.5}
          speed={3}
          wireframe={true}
          transparent={true}
          opacity={0.9}
        />
      </Icosahedron>
    </Float>
  );
};

const HeroCanvas = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 75 }}
      style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0 }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <spotLight position={[0, 10, 0]} intensity={0.8} />
        
        <AbstractShape />
        
        <OrbitControls enableZoom={false} autoRotate />
      </Suspense>
    </Canvas>
  );
};

export default HeroCanvas;

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';

const CartoonBee = () => {
  const beeRef = useRef();
  const leftWingRef = useRef();
  const rightWingRef = useRef();

  useFrame((state) => {
    if (beeRef.current) {
      const t = state.clock.elapsedTime;
      // Gentle floating up and down
      beeRef.current.position.y = Math.sin(t * 2) * 0.1;
      // Slight rotation to feel alive
      beeRef.current.rotation.y = Math.sin(t * 1) * 0.1;
      beeRef.current.rotation.z = Math.sin(t * 1.5) * 0.05;
      
      // Flapping wings
      if (leftWingRef.current && rightWingRef.current) {
        leftWingRef.current.rotation.z = Math.sin(t * 40) * 0.6 + 0.3; 
        rightWingRef.current.rotation.z = -Math.sin(t * 40) * 0.6 - 0.3;
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
      {/* Container group moved down slightly so bubble fits above without clipping */}
      <group position={[0, -0.8, 0]}>
        
        {/* Floating Chat Bubble - Positioned ABOVE the bee */}
        <Html position={[0, 2.0, 0]} center zIndexRange={[100, 0]}>
          <div 
            style={{ 
              background: 'linear-gradient(135deg, #915eff, #88c0d0)',
              color: 'white',
              fontWeight: 'bold',
              fontFamily: 'monospace',
              padding: '12px 20px',
              borderRadius: '20px',
              fontSize: '14px',
              width: 'max-content',
              maxWidth: '220px',
              textAlign: 'center',
              boxShadow: '0px 10px 30px rgba(145, 94, 255, 0.4)',
              position: 'relative',
              animation: 'pulse 2s infinite'
            }}
          >
            "I don't surrender... I collaborate 🐝"
            <div 
              style={{
                position: 'absolute',
                width: '16px',
                height: '16px',
                background: 'linear-gradient(135deg, #915eff, #88c0d0)',
                transform: 'rotate(45deg) translateX(-50%)',
                left: '50%',
                bottom: '-8px',
                zIndex: -1
              }}
            ></div>
          </div>
        </Html>

        <group ref={beeRef} scale={1.3}>
          {/* Body - Main Yellow Capsule */}
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <capsuleGeometry args={[0.35, 0.4, 32, 32]} />
          <meshStandardMaterial color="#fcd34d" roughness={0.4} metalness={0.1} />
        </mesh>

        {/* Black Stripes */}
        <mesh position={[0, 0, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.36, 0.36, 0.15, 32]} />
          <meshStandardMaterial color="#1f2937" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.36, 0.36, 0.15, 32]} />
          <meshStandardMaterial color="#1f2937" roughness={0.6} />
        </mesh>

        {/* Head */}
        <mesh position={[0, 0.1, 0.45]}>
          <sphereGeometry args={[0.28, 32, 32]} />
          <meshStandardMaterial color="#fcd34d" roughness={0.4} />
        </mesh>

        {/* Large Friendly Eyes */}
        <mesh position={[-0.12, 0.15, 0.65]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.12, 0.15, 0.65]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        
        {/* Pupils */}
        <mesh position={[-0.12, 0.15, 0.73]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[0.12, 0.15, 0.73]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>

        {/* Friendly Smile */}
        <mesh position={[0, 0.02, 0.7]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.08, 0.015, 16, 16, Math.PI]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* Antennae */}
        <mesh position={[-0.1, 0.38, 0.5]} rotation={[0, 0, Math.PI / 6]}>
          <cylinderGeometry args={[0.015, 0.015, 0.2]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        <mesh position={[-0.15, 0.48, 0.5]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>

        <mesh position={[0.1, 0.38, 0.5]} rotation={[0, 0, -Math.PI / 6]}>
          <cylinderGeometry args={[0.015, 0.015, 0.2]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        <mesh position={[0.15, 0.48, 0.5]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>

        {/* Wings */}
        <group position={[-0.15, 0.3, 0]} ref={leftWingRef}>
          <mesh position={[-0.2, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <capsuleGeometry args={[0.15, 0.4, 16, 16]} />
            <meshStandardMaterial color="#a5f3fc" transparent opacity={0.5} roughness={0.1} />
          </mesh>
        </group>
        
        <group position={[0.15, 0.3, 0]} ref={rightWingRef}>
          <mesh position={[0.2, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <capsuleGeometry args={[0.15, 0.4, 16, 16]} />
            <meshStandardMaterial color="#a5f3fc" transparent opacity={0.5} roughness={0.1} />
          </mesh>
        </group>

        {/* Stinger */}
        <mesh position={[0, 0, -0.5]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.1, 0.3, 16]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>

        {/* Developer Touch: Tiny Headset */}
        <mesh position={[0, 0.28, 0.45]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.29, 0.02, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#374151" />
        </mesh>
        <mesh position={[-0.29, 0.1, 0.45]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.04, 32]} />
          <meshStandardMaterial color="#00ffff" />
        </mesh>
        <mesh position={[0.29, 0.1, 0.45]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.04, 32]} />
          <meshStandardMaterial color="#915eff" />
        </mesh>

      </group>
      </group>
    </Float>
  );
};

const PuzzleCanvas = () => {
  return (
    <div className="w-full h-[300px] md:h-[400px]">
      <Canvas
        camera={{ position: [0, 1.5, 4.5], fov: 45 }}
        className="w-full h-full cursor-pointer"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} />
          <pointLight position={[0, -2, 2]} intensity={1} color="#00ffff" />
          <pointLight position={[2, 2, 2]} intensity={1} color="#915eff" />
          
          <CartoonBee />
          
          <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2 + 0.2} minPolarAngle={Math.PI / 2 - 0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default PuzzleCanvas;

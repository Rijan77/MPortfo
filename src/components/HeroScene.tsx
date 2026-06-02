import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function TorusKnot() {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.12;
    mesh.current.rotation.y = t * 0.18;
    mesh.current.rotation.z = t * 0.06;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
      <mesh ref={mesh} scale={1.1}>
        <torusKnotGeometry args={[1, 0.32, 160, 20, 2, 3]} />
        <MeshDistortMaterial
          color="#06B6D4"
          roughness={0.05}
          metalness={0.9}
          distort={0.18}
          speed={2.5}
          emissive="#0891B2"
          emissiveIntensity={0.35}
        />
      </mesh>
    </Float>
  );
}

function RingAccent() {
  const ring = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ring.current.rotation.x = state.clock.getElapsedTime() * 0.08;
    ring.current.rotation.z = state.clock.getElapsedTime() * 0.14;
  });
  return (
    <mesh ref={ring} position={[0, 0, -0.5]}>
      <torusGeometry args={[2.2, 0.025, 12, 80]} />
      <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={0.5} opacity={0.5} transparent />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[4, 4, 4]} color="#06B6D4" intensity={4} />
      <pointLight position={[-4, -4, 2]} color="#8B5CF6" intensity={3} />
      <pointLight position={[0, 6, 0]} color="#ffffff" intensity={1.5} />
      <Suspense fallback={null}>
        <TorusKnot />
        <RingAccent />
      </Suspense>
    </Canvas>
  );
}

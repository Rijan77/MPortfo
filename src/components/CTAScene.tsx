import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function OrbitingSphere() {
  const mesh   = useRef<THREE.Mesh>(null!);
  const ring1  = useRef<THREE.Mesh>(null!);
  const ring2  = useRef<THREE.Mesh>(null!);
  const ring3  = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ring1.current.rotation.x = t * 0.28;
    ring1.current.rotation.z = t * 0.12;
    ring2.current.rotation.y = t * 0.22;
    ring2.current.rotation.z = t * 0.18;
    ring3.current.rotation.x = -t * 0.18;
    ring3.current.rotation.y = t * 0.24;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.5}>
      <group>
        <mesh ref={mesh}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial
            color="#8B5CF6"
            roughness={0.05}
            metalness={0.9}
            distort={0.2}
            speed={2.5}
            emissive="#6D28D9"
            emissiveIntensity={0.35}
          />
        </mesh>

        <mesh ref={ring1}>
          <torusGeometry args={[2, 0.02, 8, 60]} />
          <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={0.8} transparent opacity={0.65} />
        </mesh>

        <mesh ref={ring2} rotation={[Math.PI / 3, 0, Math.PI / 5]}>
          <torusGeometry args={[2.5, 0.014, 6, 60]} />
          <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={0.7} transparent opacity={0.45} />
        </mesh>

        <mesh ref={ring3} rotation={[Math.PI / 6, Math.PI / 4, 0]}>
          <torusGeometry args={[1.7, 0.016, 6, 60]} />
          <meshStandardMaterial color="#22D3EE" emissive="#22D3EE" emissiveIntensity={0.6} transparent opacity={0.35} />
        </mesh>
      </group>
    </Float>
  );
}

export default function CTAScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
    >
      <ambientLight intensity={0.25} />
      <pointLight position={[4, 4, 4]} color="#06B6D4" intensity={5} />
      <pointLight position={[-4, -4, 2]} color="#8B5CF6" intensity={4} />
      <Suspense fallback={null}>
        <OrbitingSphere />
      </Suspense>
    </Canvas>
  );
}

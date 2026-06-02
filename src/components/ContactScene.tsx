import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function WireGlobe() {
  const globeRef = useRef<THREE.LineSegments>(null!);
  const innerRef  = useRef<THREE.LineSegments>(null!);

  const outerWire = useMemo(() => {
    const geo = new THREE.SphereGeometry(1.8, 24, 18);
    return new THREE.WireframeGeometry(geo);
  }, []);

  const innerWire = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.1, 1);
    return new THREE.WireframeGeometry(geo);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    globeRef.current.rotation.y = t * 0.12;
    globeRef.current.rotation.x = Math.sin(t * 0.08) * 0.15;
    innerRef.current.rotation.y = -t * 0.2;
    innerRef.current.rotation.x = t * 0.1;
  });

  return (
    <Float speed={0.9} floatIntensity={0.4} rotationIntensity={0.05}>
      <group>
        {/* Outer sphere wireframe */}
        <lineSegments ref={globeRef} geometry={outerWire}>
          <lineBasicMaterial color="#06B6D4" transparent opacity={0.28} />
        </lineSegments>

        {/* Inner icosahedron wireframe */}
        <lineSegments ref={innerRef} geometry={innerWire}>
          <lineBasicMaterial color="#8B5CF6" transparent opacity={0.5} />
        </lineSegments>

        {/* Glowing core sphere */}
        <mesh>
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshStandardMaterial
            color="#06B6D4"
            emissive="#06B6D4"
            emissiveIntensity={0.8}
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Equatorial ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.82, 0.018, 8, 120]} />
          <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={1} transparent opacity={0.7} />
        </mesh>

        {/* Tilted accent ring */}
        <mesh rotation={[Math.PI / 5, 0, Math.PI / 6]}>
          <torusGeometry args={[1.82, 0.01, 6, 120]} />
          <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={0.8} transparent opacity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

export default function ContactScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 44 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} color="#06B6D4" intensity={4} />
      <pointLight position={[-3, -3, 2]} color="#8B5CF6" intensity={3} />
      <Suspense fallback={null}>
        <WireGlobe />
        <Sparkles count={50} scale={5} size={1.2} speed={0.3} color="#06B6D4" opacity={0.5} />
      </Suspense>
    </Canvas>
  );
}

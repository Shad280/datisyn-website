"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => {
    const COUNT = 750;
    const pos = new Float32Array(COUNT * 3);
    const cols = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      // Distribute in a subtle sphere volume
      // eslint-disable-next-line react-hooks/purity
      const r = Math.random() * 6.5;
      // eslint-disable-next-line react-hooks/purity
      const theta = Math.random() * Math.PI * 2;
      // eslint-disable-next-line react-hooks/purity
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = r * Math.cos(phi);
      // Color gradient from accent to primary
      // eslint-disable-next-line react-hooks/purity
      const t = Math.random();
      const c1 = new THREE.Color("#39B3FF");
      const c2 = new THREE.Color("#00AEEF");
      const mixed = c1.lerp(c2, t);
      cols[i3] = mixed.r;
      cols[i3 + 1] = mixed.g;
      cols[i3 + 2] = mixed.b;
    }
    return { positions: pos, colors: cols };
  }, []);

  const uniformsRef = useRef({
    uTime: { value: 0 },
    uSize: { value: 18 }
  });

  useFrame(({ clock }) => {
    uniformsRef.current.uTime.value = clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = uniformsRef.current.uTime.value * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <float32BufferAttribute attach="attributes-position" args={[positions, 3]} />
        <float32BufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <shaderMaterial
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniformsRef.current}
        vertexShader={`
          uniform float uTime; uniform float uSize; 
          attribute vec3 color; varying vec3 vColor;
          void main(){
            vColor = color;
            vec3 p = position;
            // subtle oscillation so particles sometimes nudge inward or outward
            float wobble = sin(uTime * 0.7 + length(p) * 0.3) * 0.02;
            p += normalize(p) * wobble;
            vec4 mvPosition = modelViewMatrix * vec4(p,1.0);
            gl_PointSize = uSize * (1.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;
          void main(){
            float d = length(gl_PointCoord - 0.5);
            float alpha = smoothstep(0.5,0.0,d);
            gl_FragColor = vec4(vColor, alpha*0.55);
          }
        `}
      />
    </points>
  );
}

export default function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <Particles />
      </Canvas>
    </div>
  );
}

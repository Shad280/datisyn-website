"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

interface Node {
  position: THREE.Vector3;
  size: number;
  color: string;
  type: string;
  label: string;
  description: string;
}

// Modal component for node details
function NodeModal({ node, onClose }: { node: Node | null; onClose: () => void }) {
  if (!node) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-gradient-to-br from-[#0A0F1E] to-[#1a1f2e] border border-[#00AEEF]/30 rounded-2xl p-8 max-w-lg mx-4 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-4 h-4 rounded-full"
              style={{
                background: node.color,
                boxShadow: `0 0 20px ${node.color}`
              }}
            />
            <h3 className="text-2xl font-bold text-white">{node.label}</h3>
          </div>
          <p className="text-zinc-300 leading-relaxed mb-6">
            {node.description}
          </p>
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-[#00AEEF] hover:bg-[#39B3FF] text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function NodeWithTooltip({ 
  node, 
  isHub, 
  onClick 
}: { 
  node: Node; 
  isHub: boolean; 
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const pulseRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (pulseRef.current && hovered) {
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 3) * 0.1;
      pulseRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={node.position}>
      {/* Main node sphere */}
      <mesh
        onPointerOver={(e) => {
          setHovered(true);
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          setHovered(false);
          e.stopPropagation();
          document.body.style.cursor = 'default';
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <sphereGeometry args={[node.size, 32, 32]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={hovered ? (isHub ? 1.5 : 1.0) : (isHub ? 1.2 : 0.6)}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Outer glow layer */}
      <mesh scale={hovered ? 1.4 : 1.3}>
        <sphereGeometry args={[node.size, 32, 32]} />
        <meshBasicMaterial
          color={node.color}
          transparent
          opacity={hovered ? 0.25 : 0.15}
        />
      </mesh>

      {/* Pulsing interaction ring on hover */}
      {hovered && (
        <mesh ref={pulseRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[node.size * 1.8, node.size * 2, 32]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Simple label on hover */}
      {hovered && (
        <Html
          center
          distanceFactor={6}
          style={{
            transition: 'opacity 0.2s',
            opacity: 1,
            pointerEvents: 'none'
          }}
        >
          <div
            style={{
              background: 'rgba(0, 174, 239, 0.85)',
              color: 'white',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
            }}
          >
            {node.label}
          </div>
        </Html>
      )}
      
      {/* Rotating ring for hub */}
      {isHub && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.45, 0.02, 16, 64]} />
          <meshBasicMaterial
            color="#00AEEF"
            transparent
            opacity={hovered ? 0.6 : 0.4}
          />
        </mesh>
      )}
      
      {/* Node type indicator (small inner sphere) */}
      {!isHub && (
        <mesh scale={0.4}>
          <sphereGeometry args={[node.size, 16, 16]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={hovered ? 0.8 : 0.6}
          />
        </mesh>
      )}
    </group>
  );
}

function DataOrchestrationViz({ 
  onNodeClick 
}: { 
  onNodeClick: (node: Node) => void;
}) {
  const nodesRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const flowParticlesRef = useRef<THREE.Points>(null);

  // Create nodes representing different data sources
  const nodes = useMemo(() => {
    const nodeConfigs = [
      { 
        pos: [0, 0, 0], 
        size: 0.3, 
        color: "#00AEEF", 
        type: "hub", 
        label: "Datisyn Hub",
        description: "The central orchestration hub that intelligently manages and routes data between all connected sources. It provides real-time monitoring, automated workflows, and ensures seamless data integration across your entire ecosystem."
      },
      { 
        pos: [2.5, 1.8, 0], 
        size: 0.18, 
        color: "#39B3FF", 
        type: "database", 
        label: "Database",
        description: "Connect to any database system including SQL, NoSQL, and cloud databases. Datisyn automatically discovers schemas, monitors changes, and ensures data consistency across your infrastructure."
      },
      { 
        pos: [2.5, -1.8, 0], 
        size: 0.18, 
        color: "#4FC3F7", 
        type: "api", 
        label: "API",
        description: "Integrate with REST APIs, GraphQL endpoints, and third-party services. Datisyn handles authentication, rate limiting, and transforms API responses into actionable insights."
      },
      { 
        pos: [-2.5, 1.8, 0], 
        size: 0.18, 
        color: "#39B3FF", 
        type: "cloud", 
        label: "Cloud Service",
        description: "Seamlessly connect to AWS, Azure, Google Cloud, and other cloud platforms. Datisyn orchestrates data flows across cloud services while maintaining security and compliance."
      },
      { 
        pos: [-2.5, -1.8, 0], 
        size: 0.18, 
        color: "#4FC3F7", 
        type: "stream", 
        label: "Data Stream",
        description: "Process real-time data streams from Kafka, Kinesis, and other streaming platforms. Datisyn provides low-latency processing and intelligent filtering for high-volume data pipelines."
      },
      { 
        pos: [1.8, 0, 2], 
        size: 0.16, 
        color: "#5DD5FA", 
        type: "database", 
        label: "Database",
        description: "Connect to any database system including SQL, NoSQL, and cloud databases. Datisyn automatically discovers schemas, monitors changes, and ensures data consistency across your infrastructure."
      },
      { 
        pos: [1.8, 0, -2], 
        size: 0.16, 
        color: "#5DD5FA", 
        type: "api", 
        label: "API",
        description: "Integrate with REST APIs, GraphQL endpoints, and third-party services. Datisyn handles authentication, rate limiting, and transforms API responses into actionable insights."
      },
      { 
        pos: [-1.8, 0, 2], 
        size: 0.16, 
        color: "#5DD5FA", 
        type: "cloud", 
        label: "Cloud Service",
        description: "Seamlessly connect to AWS, Azure, Google Cloud, and other cloud platforms. Datisyn orchestrates data flows across cloud services while maintaining security and compliance."
      },
      { 
        pos: [-1.8, 0, -2], 
        size: 0.16, 
        color: "#5DD5FA", 
        type: "stream", 
        label: "Data Stream",
        description: "Process real-time data streams from Kafka, Kinesis, and other streaming platforms. Datisyn provides low-latency processing and intelligent filtering for high-volume data pipelines."
      }
    ];
    return nodeConfigs.map(config => ({
      position: new THREE.Vector3(...config.pos as [number, number, number]),
      size: config.size,
      color: config.color,
      type: config.type,
      label: config.label,
      description: config.description
    }));
  }, []);

  // Create connecting lines with segments for flow animation
  const { linePositions, lineColors } = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    const centerColor = new THREE.Color("#00AEEF");
    const outerColor = new THREE.Color("#39B3FF");

    for (let i = 1; i < nodes.length; i++) {
      positions.push(0, 0, 0);
      positions.push(...nodes[i].position.toArray());
      
      colors.push(centerColor.r, centerColor.g, centerColor.b);
      colors.push(outerColor.r, outerColor.g, outerColor.b);
    }

    return { 
      linePositions: new Float32Array(positions), 
      lineColors: new Float32Array(colors) 
    };
  }, [nodes]);

  // Create flowing data particles along connections
  const flowParticles = useMemo(() => {
    const count = 40;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const color = new THREE.Color("#00AEEF");

    for (let i = 0; i < count; i++) {
      const nodeIndex = Math.floor(Math.random() * (nodes.length - 1)) + 1;
      const targetPos = nodes[nodeIndex].position;
      const t = Math.random();
      
      positions[i * 3] = targetPos.x * t;
      positions[i * 3 + 1] = targetPos.y * t;
      positions[i * 3 + 2] = targetPos.z * t;
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      speeds[i] = 0.3 + Math.random() * 0.4;
    }

    return { positions, colors, speeds };
  }, [nodes]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (nodesRef.current) {
      nodesRef.current.rotation.y = t * 0.12;
      nodesRef.current.rotation.x = Math.sin(t * 0.15) * 0.08;
    }

    if (linesRef.current) {
      const material = linesRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.35 + Math.sin(t * 1.5) * 0.15;
    }

    // Animate flow particles moving INWARDS toward the center
    if (flowParticlesRef.current) {
      const positions = flowParticlesRef.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < positions.length / 3; i++) {
        const nodeIndex = Math.floor(i / 5) % (nodes.length - 1) + 1;
        const targetPos = nodes[nodeIndex].position;
        const speed = flowParticles.speeds[i];

        // progress goes 0 -> 1 repeatedly; invert to move from node -> center
        let progress = ((t * speed) % 1);
        const inward = 1 - progress;

        positions[i * 3] = targetPos.x * inward;
        positions[i * 3 + 1] = targetPos.y * inward;
        positions[i * 3 + 2] = targetPos.z * inward;
      }

      flowParticlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={nodesRef} scale={1.4}>
      {/* Render nodes with glow */}
      {nodes.map((node, i) => (
        <NodeWithTooltip 
          key={i} 
          node={node} 
          isHub={i === 0} 
          onClick={() => onNodeClick(node)}
        />
      ))}
      
      {/* Connecting lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <float32BufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          <float32BufferAttribute attach="attributes-color" args={[lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial 
          vertexColors 
          transparent 
          opacity={0.4}
          linewidth={2}
        />
      </lineSegments>

      {/* Flowing data particles */}
      <points ref={flowParticlesRef}>
        <bufferGeometry>
          <float32BufferAttribute attach="attributes-position" args={[flowParticles.positions, 3]} />
          <float32BufferAttribute attach="attributes-color" args={[flowParticles.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Ambient data particles */}
      <DataParticles />
    </group>
  );
}

function DataParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const { positions, colors, count } = useMemo(() => {
    const count = 60;
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 1.5 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);

      const color = new THREE.Color().setHSL(0.55 + Math.random() * 0.05, 0.8, 0.6);
      cols[i3] = color.r;
      cols[i3 + 1] = color.g;
      cols[i3 + 2] = color.b;
    }

    return { positions: pos, colors: cols, count };
  }, []);

  // timers controlling occasional inward attraction for stray particles
  const attractTimersRef = useRef<Float32Array | null>(null);
  if (!attractTimersRef.current) attractTimersRef.current = new Float32Array((positions.length / 3));

  useFrame((state) => {
    if (particlesRef.current) {
      const positionsArr = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const timers = attractTimersRef.current!;

      for (let i = 0; i < positionsArr.length; i += 3) {
        const idx = i / 3;

        if (timers[idx] > 0) {
          // particle is currently attracted: move inward faster
          positionsArr[i] *= 0.94;
          positionsArr[i + 1] *= 0.94;
          positionsArr[i + 2] *= 0.94;
          timers[idx] -= 1;
        } else {
          // mostly stray behavior: small jitter and slow orbital drift
          positionsArr[i] += (Math.random() - 0.5) * 0.008;
          positionsArr[i + 1] += (Math.random() - 0.5) * 0.008;
          positionsArr[i + 2] += (Math.random() - 0.5) * 0.008;

          // occasional chance to become attracted for a short period
          if (Math.random() < 0.004) {
            timers[idx] = 90 + Math.floor(Math.random() * 120); // frames attracted (~1.5-3.5s)
          }
        }

        // respawn outward if the particle reached center
        const x = positionsArr[i];
        const y = positionsArr[i + 1];
        const z = positionsArr[i + 2];
        const distSq = x * x + y * y + z * z;
        if (distSq < 0.0025) {
          const radius = 1.5 + Math.random() * 2;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.random() * Math.PI;
          positionsArr[i] = radius * Math.sin(phi) * Math.cos(theta);
          positionsArr[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positionsArr[i + 2] = radius * Math.cos(phi);
          timers[idx] = 0;
        }
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      particlesRef.current.rotation.x = state.clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <float32BufferAttribute attach="attributes-position" args={[positions, 3]} />
        <float32BufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ThreeEye() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  return (
    <>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-5, -5, 5]} intensity={0.8} color="#00AEEF" />
        <pointLight position={[0, -5, -5]} intensity={0.6} color="#39B3FF" />
        <DataOrchestrationViz onNodeClick={setSelectedNode} />
      </Canvas>
      
      {selectedNode && (
        <NodeModal node={selectedNode} onClose={() => setSelectedNode(null)} />
      )}
    </>
  );
}

"use client";

import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random';
import * as THREE from 'three';
import { Points as DreiPoints } from '@react-three/drei';
import { ComponentProps } from 'react';

type PointsProps = ComponentProps<typeof DreiPoints>;

const StarBackground = (props:PointsProps) => {
    const ref = useRef<THREE.Points>(null);
    const [sphere] = useState(() =>
      random.inSphere(new Float32Array(6000), { radius: 1.2 }) as Float32Array
    );
    useFrame((state, delta) => {
        if (ref.current) {
          ref.current.rotation.x -= delta / 10;
          ref.current.rotation.y -= delta / 15;
        }
    })
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="$fff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

const StarCanvas = () => {
  return (
    <div className="w-full h-auto fixed inset-0 z-[20]">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarBackground />
      </Suspense>
    </Canvas>
    </div>
  )
}
export default StarCanvas

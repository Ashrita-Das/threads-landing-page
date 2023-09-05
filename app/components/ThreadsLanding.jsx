"use client";

import React, { useRef } from 'react';
import { OrbitControls, Sphere } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { pointsInner, pointsOuter } from './utils';
import QRCode from 'qrcode.react';

const ThreadsLanding = () => {
  return (
    <div className='relative'>
      <Canvas 
        camera={{
          position: [10, -7.5, -5],
        }}
        className='bg-[#101010]' style={{ height: "100vh" }}>
        <OrbitControls maxDistance={20} minDistance={10}/>
        <directionalLight />
        <pointLight position={[-30, 0, -30]} power={10.0}/>
        <PointCircle />
      </Canvas>
      <div className='absolute w-[200px] h-[250px] rounded-xl top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-[#ffffffe8] p-5 justify-evenly'>
      <h1 className='flex justify-center pb-4 text-2xl'>Hey!</h1>
      <QRCodegen />
      </div>    
  </div>
  )
}

const PointCircle = () => {
    const ref = useRef();

    useFrame(({ clock }) => {
        ref.current.rotation.z = clock.getElapsedTime() * 0.05;
    })

    return (
        <group ref={ref}>
            {pointsInner.map(point => <Point key={point.idx} position={point.position} color={point.color}/>)}
            {pointsOuter.map(point => <Point key={point.idx} position={point.position} color={point.color}/>)}
        </group>
    )
}

const Point = ({ position, color}) => {
    return (
        <Sphere
        position={position}
        args={[0.1,10,10]}
        >
          <meshStandardMaterial 
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            roughness={0.5}
          />
        </Sphere>   
    )
}

const QRCodegen = () => {
  const qrCodeValue = 'https://github.com/Ashrita-Das'
  return (
    <div className='flex justify-center'>
      <QRCode value={qrCodeValue} />
    </div>
  )
}

export default ThreadsLanding;

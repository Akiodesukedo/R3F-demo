import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const carFile = "/car_model.glb"

// 👇 This one has all the car body except for tires. 
export const CarDoors: React.FC = () => {
  const { nodes } = useGLTF(carFile);
  
  const doors = useMemo(() => {
    return Object.entries(nodes)
      .filter(([name]) =>  name.includes("BMWSM_Base"))
      .map(([_, obj]) => obj as THREE.Object3D);
  }, [nodes]);

  return (
    <group>
      {doors.map((door) => (
        <primitive key={door.uuid} object={door} />
      ))}
    </group>   
  )
}

export const CarFront: React.FC = () => {
  const { nodes } = useGLTF(carFile);

  const fronts = useMemo(() => {
    return Object.entries(nodes)
    .filter(([name]) =>  name.includes("BMWSM_FrontKit"))
    .map(([_, obj]) => obj as THREE.Object3D);
  }, [nodes]);

  return (
    <group>
      {fronts.map((front) => (
        <primitive key={front.uuid} object={front} />
      ))}
    </group>  
  )
}

export const CarHood: React.FC = () => {
  const { nodes } = useGLTF(carFile);
  // console.log(
  //   Object.entries(nodes)
  //     .filter(([_, obj]) => obj.type === "Mesh")
  //     .map(([name]) => name)
  // );

  console.log(nodes)

  const hoods = useMemo(() => {
    return Object.entries(nodes)
    .filter(([name]) =>  name.includes("BMWSM_Hood"))
    .map(([_, obj]) => obj as THREE.Object3D);
  }, [nodes]);

  return (
    <group>
      {hoods.map((hood) => (
        <primitive key={hood.uuid} object={hood} />
      ))}
    </group>  
  )
}

export const CarInterior: React.FC = () => {
  const { nodes } = useGLTF(carFile);

  const interiors = useMemo(() => {
    return Object.entries(nodes)
    .filter(([name]) =>  name.includes("BMWSM_Interior"))
    .map(([_, obj]) => obj as THREE.Object3D);
  }, [nodes]);

  return (
    <group>
      {interiors.map((interior) => (
        <primitive key={interior.uuid} object={interior} />
      ))}
    </group>  
  )
}

export const CarRear: React.FC = () => {
  const { nodes } = useGLTF(carFile);

  const rears = useMemo(() => {
    return Object.entries(nodes)
    .filter(([name]) =>  name.includes("BMWSM_RearKit"))
    .map(([_, obj]) => obj as THREE.Object3D);
  }, [nodes]);

  return (
    <group>
      {rears.map((rear) => (
        <primitive key={rear.uuid} object={rear} />
      ))}
    </group>  
  )
}

export const CarWheels:React.FC = () => {
  const { nodes } = useGLTF(carFile);

  const wheels = useMemo(() => {
    return Object.entries(nodes)
      .filter(([name]) =>  name.includes("3DWheel_"))
      .map(([_, obj]) => {
        const wheel = obj as THREE.Object3D
        return wheel
      });
  }, [nodes]);

  useFrame((_, delta) => {
    wheels.forEach((w) => (w.rotation.x += delta * 5));
  });

  return (
    <group>
      {wheels.map((wheel) => (
        <primitive key={wheel.uuid} object={wheel} />
      ))}
    </group>
  )
}




import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";
import Header from "../components/Header";
import { useMenu } from "../context/MenuContext";
import Menu from "../components/Menu";
// We need this type definition because I'm using TypeScript

// 🚨 This is a React component that will render a 3D cube mesh (object) inside the scene (here Canvas React Component includes the scene)
const SpinningBox = () => {
  const meshRef = useRef<Mesh>(null!);
  // No rerendering everytime Mesh (3D object) Object updates.
  // But keep track of the latest version of Mesh by making a reference here so Canvas can render the 3D object continuously without re-rendering the entire page.

  // Runs on every frame (~60fps)
  useFrame((_, delta) => {
    meshRef.current.rotation.y += delta / 2; // Spin the cube continuously
    meshRef.current.rotation.x += delta / 3;
  });
  // _ (First param) is the "state" object like camera, clocks, etc. I'm not using any of those now. So just name it "_"
  // And "delta" means "Time passed since the last frame". This makes animation consistent even on slower computer.

  return (
    <mesh ref={meshRef}>
    {/* 
    This is a React Three Fiber <mesh> component
    Under the hood, it creates a Three.js THREE.Mesh
    Now the actual mesh instance is attached to the meshRef.current reference
    */}
      <boxGeometry args={[1, 2, 3]} />
      {/*
      BoxGeometry creates a cube/recutangular prism. 
      args are [width, height, depth] 
      */}
      <meshStandardMaterial color="blue" />
      {/* Material = the skin/paint of the object. */}
    </mesh>
  );
}

const Basic = () => {
  const {isOpen, setIsOpen} = useMenu();

  return (
    <div style={{ height: "100vh" }}>
      <Menu isOpen={isOpen} closeMenu={() => setIsOpen(false)} />
      <Header absolute={true} openMenu={() => setIsOpen(true)}/>
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
      {/* 
      Creates 3D canvas here
      Camera position is [x, y, z] axis. So in this case, the camera backs away from origin
      "fov" is field of view. Usually 45-75
      */}
        <ambientLight intensity={0.5} />
        {/* 
        This is ambient light that lights up evetything evenly.
        Without this, the bottom side of the object gets completely dark.
        */}
        <directionalLight position={[3, 3, 3]} intensity={1} />
        {/* 
        This is a directional light like sunlight shining from a direction.
        position is also [x, y, z] axis. And the light is positioned there in space and shines towards the object naturally
        */}

        {/* Your “Hello World” object */}
        <SpinningBox />
      </Canvas>
    </div>
  )
}

export default Basic

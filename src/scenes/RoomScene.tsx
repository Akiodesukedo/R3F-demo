import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshWobbleMaterial, useGLTF } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'

// 👇 Take this "level" piece out of the model and place it as a component.
export const Level:React.FC = () => {
  const { nodes } = useGLTF('/level-react-draco.glb')
  const levelNodes = nodes.Level as THREE.Mesh
  // Loads 3D model file here. nodes is an object containing named meshes from the file.
  return <mesh geometry={levelNodes.geometry} material={levelNodes.material} position={[-0.38, 0.69, 0.62]} rotation={[Math.PI / 2, -Math.PI / 9, 0]} />
}

// 👇 I think this Sudo thing is for the dog neat the table. Static body with its head moving
export const Sudo = () => {
  const { nodes } = useGLTF('/level-react-draco.glb')
  const sudoNodes = nodes.Sudo as THREE.Mesh
  const sudoHeadNodes = nodes.SudoHead as THREE.Mesh
  const [spring, api] = useSpring(() => ({ 
    "rotation-x": Math.PI / 2,
    "rotation-y": 0,
    "rotation-z": 0.29,
    // rotation: [Math.PI / 2, 0, 0.29]  as [number, number, number], 
    config: { friction: 40 }
  }), [])
  // Creates a spring animation state
  // Initial rotation value [x, y, z] as usual. And friction is for how "smooth/slow" the motion is
  // "api" lets us start new animations later: eg) api.start({...})
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    const wander = () => {
      api.start({ 
        "rotation-x": Math.PI / 2 + THREE.MathUtils.randFloatSpread(2) * 0.3,
        "rotation-y": 0,
        "rotation-z": 0.29 + THREE.MathUtils.randFloatSpread(2) * 0.2
      })
      // This part creates random movement of the head
      timeout = setTimeout(wander, (1 + Math.random() * 2) * 800)
    }
    wander()
    return () => clearTimeout(timeout)
    // Once unmount, timers stop
  }, [])
  return (
    <>
      {/* 🐕 First mesh is the body of the dog */}
      <mesh geometry={sudoNodes.geometry} material={sudoNodes.material} position={[0.68, 0.33, -0.67]} rotation={[Math.PI / 2, 0, 0.29]} />
      {/* 🐶 Second mesh is the head of the dog. "a" for animation 
          {...spring} spreads the spring values onto the mesh, so the head's rotation is controlled by spring*/}
      <a.mesh geometry={sudoHeadNodes.geometry} material={sudoHeadNodes.material} position={[0.68, 0.33, -0.67]} {...spring} />
    </>
  )
}

// Here goes the camera
export const Camera = () => {
  const { nodes, materials } = useGLTF('/level-react-draco.glb')
  const cameraNodes = nodes.Camera as THREE.Mesh
  const camera1Nodes = nodes.Camera_1 as THREE.Mesh
  const [spring, api] = useSpring(() => ({ 'rotation-z': 0, config: { friction: 40 } }), [])
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    const wander = () => {
      api.start({ 'rotation-z': Math.random() })
      // This time just rotation of the camera head on z axis
      timeout = setTimeout(wander, (1 + Math.random() * 2) * 800)
    }
    wander()
    return () => clearTimeout(timeout)
  }, [])
  return (
    // The same thing here. spring spreads to set rotation every random seconds
    <a.group position={[-0.58, 0.83, -0.03]} rotation={[Math.PI / 2, 0, 0.47]} {...spring}>
      <mesh geometry={cameraNodes.geometry} material={cameraNodes.material} />
      <mesh geometry={camera1Nodes.geometry} material={materials.Lens} />
    </a.group>
  )
}

export const Cactus = () => {
  const { nodes, materials } = useGLTF('/level-react-draco.glb')
  const cactusNodes = nodes.Cactus as THREE.Mesh
  const cactusMaterials = materials.Cactus as THREE.Material
  return (
    <mesh geometry={cactusNodes.geometry} position={[-0.42, 0.51, -0.62]} rotation={[Math.PI / 2, 0, 0]}>
      <MeshWobbleMaterial factor={0.4} map={cactusMaterials.map} />
    </mesh>
  )
}

export const Box = ({ scale = 1, ...props }) => {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  useFrame((_, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta;
  })
  return (
    <mesh
      {...props}
      ref={ref}
      scale={(clicked ? 1.5 : 1) * scale}
      onClick={() => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

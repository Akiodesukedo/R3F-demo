import { Canvas } from '@react-three/fiber'
import { Fisheye, CameraControls, PerspectiveCamera, Environment } from '@react-three/drei'
import { Level, Sudo, Camera, Cactus, Box } from '../scenes/RoomScene'
import Menu from '../components/Menu'
import Header from '../components/Header'
import { useMenu } from '../context/MenuContext'

const Room = () => {
  const {isOpen, setIsOpen} = useMenu();

  return (
    <div style={{ height: "100vh" }}>
      <Menu isOpen={isOpen} closeMenu={() => setIsOpen(false)} />
      <Header absolute={true} openMenu={() => setIsOpen(true)}/>
      <Canvas flat>
        <Fisheye zoom={0}>
          <CameraControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.6} />
          <ambientLight intensity={Math.PI / 2} />
          <group scale={20} position={[5, -11, -5]}>
            <Level />
            <Sudo />
            <Camera />
            <Cactus />
            <Box position={[-0.8, 1.4, 0.4]} scale={0.15} />
          </group>
          <Environment preset="city" background blur={1} />
          <PerspectiveCamera makeDefault position={[0, 0, 18.5]} />
        </Fisheye>
      </Canvas>      
    </div>

  )
}

export default Room

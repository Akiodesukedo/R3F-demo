import { Canvas } from "@react-three/fiber";
import Header from "../components/Header";
import Menu from "../components/Menu";
import { useMenu } from "../context/MenuContext";
import { CameraControls, Environment, PerspectiveCamera } from "@react-three/drei";
import { CarDoors, CarFront, CarHood, CarInterior, CarRear, CarWheels, } from "../scenes/CarScene";

const Car:React.FC = () => {
  const {isOpen, setIsOpen} = useMenu();
  return (
    <div className="h-screen">
      <Menu isOpen={isOpen} closeMenu={() => setIsOpen(false)} />
      <Header absolute={true} openMenu={() => setIsOpen(true)}/>
      <Canvas flat>
        <CameraControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.6} />
        <ambientLight intensity={0.5} />
        <group>
          <CarDoors />
          <CarFront />
          <CarHood />
          <CarInterior />
          <CarRear />
          <CarWheels />
        </group>  
        <Environment preset="city" background blur={1} />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      </Canvas>
    </div>
  )
}

export default Car
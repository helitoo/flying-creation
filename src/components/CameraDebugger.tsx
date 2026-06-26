import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export default function CameraDebugger({
  target,
}: {
  target: [number, number, number];
}) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();

  useEffect(() => {
    const controls = controlsRef.current;

    const handleChange = () => {
      console.clear();

      console.log("Position:", [
        camera.position.x,
        camera.position.y,
        camera.position.z,
      ]);

      console.log("Rotation:", [
        camera.rotation.x,
        camera.rotation.y,
        camera.rotation.z,
      ]);

      console.log("Target:", [
        controls?.target.x,
        controls?.target.y,
        controls?.target.z,
      ]);
    };

    controls?.addEventListener("change", handleChange);

    return () => {
      controls?.removeEventListener("change", handleChange);
    };
  }, [camera]);

  return <OrbitControls ref={controlsRef} target={target} />;
}

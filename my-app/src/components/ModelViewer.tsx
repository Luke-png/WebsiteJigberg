import React, { useRef, Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { Stats, OrbitControls, useGLTF, Loader } from "@react-three/drei";
import mushPath from "../resources/3D/mushrooms.glb";
import ratPath from "../resources/3D/rat.glb";

const MyModel = ({ name }: { name: string }) => {
  let modelPath = '';

  switch (name) {
    case "mushroom":
      modelPath = mushPath;
      break;
    case "rat":
      modelPath = ratPath;
      break;
    default:
      break;
  }

  const { scene } = useGLTF(modelPath) as any;
  const modelRef = useRef();

  return (
    <primitive
      object={scene}
      position={[0, -1, 0]}
      ref={modelRef}
      scale={[2.3, 2.3, 2.3]}
      rotation={[Math.PI / 8, -1, 0]}
    />
  );
};

const ModelViewer: React.FC<{ modelName: string }> = ({ modelName }) => {
  return (
    <div className="w-screen h-screen">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <MyModel name={modelName}/>
        </Suspense>
        <OrbitControls />
        {/* {<Stats />} */}
      </Canvas>
      <Loader />
    </div>
  );
};

export default ModelViewer;

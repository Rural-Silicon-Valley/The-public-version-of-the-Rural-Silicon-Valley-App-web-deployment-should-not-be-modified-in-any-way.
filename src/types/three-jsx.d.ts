import { ReactThreeFiber } from '@react-three/fiber'
import * as THREE from 'three'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Object3D elements
      mesh: ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh>
      group: ReactThreeFiber.Object3DNode<THREE.Group, typeof THREE.Group>
      
      // Geometry elements
      cylinderGeometry: ReactThreeFiber.BufferGeometryNode<THREE.CylinderGeometry, typeof THREE.CylinderGeometry>
      coneGeometry: ReactThreeFiber.BufferGeometryNode<THREE.ConeGeometry, typeof THREE.ConeGeometry>
      planeGeometry: ReactThreeFiber.BufferGeometryNode<THREE.PlaneGeometry, typeof THREE.PlaneGeometry>
      boxGeometry: ReactThreeFiber.BufferGeometryNode<THREE.BoxGeometry, typeof THREE.BoxGeometry>
      sphereGeometry: ReactThreeFiber.BufferGeometryNode<THREE.SphereGeometry, typeof THREE.SphereGeometry>
      
      // Material elements
      meshStandardMaterial: ReactThreeFiber.MaterialNode<THREE.MeshStandardMaterial, typeof THREE.MeshStandardMaterial>
      meshBasicMaterial: ReactThreeFiber.MaterialNode<THREE.MeshBasicMaterial, typeof THREE.MeshBasicMaterial>
      
      // Light elements
      ambientLight: ReactThreeFiber.LightNode<THREE.AmbientLight, typeof THREE.AmbientLight>
      directionalLight: ReactThreeFiber.LightNode<THREE.DirectionalLight, typeof THREE.DirectionalLight>
      pointLight: ReactThreeFiber.LightNode<THREE.PointLight, typeof THREE.PointLight>
      spotLight: ReactThreeFiber.LightNode<THREE.SpotLight, typeof THREE.SpotLight>
      hemisphereLight: ReactThreeFiber.LightNode<THREE.HemisphereLight, typeof THREE.HemisphereLight>
      
      // Helpers
      gridHelper: ReactThreeFiber.Object3DNode<THREE.GridHelper, typeof THREE.GridHelper>
      axesHelper: ReactThreeFiber.Object3DNode<THREE.AxesHelper, typeof THREE.AxesHelper>
      
      // Controls
      orbitControls: any
      
      // Other elements
      color: any
      cloud: any
      primitive: any
      
      // Drei specific elements
      Sky: any
      Stars: any
      Environment: any
      Cloud: any
      Text: any
      Html: any
    }
  }
}

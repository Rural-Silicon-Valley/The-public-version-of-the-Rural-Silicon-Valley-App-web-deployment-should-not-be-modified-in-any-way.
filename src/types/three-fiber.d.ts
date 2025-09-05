/// <reference types="@react-three/fiber" />
/// <reference types="@react-three/drei" />

declare module '@react-three/fiber' {
  import { ReactThreeFiber } from '@react-three/fiber'
  import { Object3D } from 'three'

  export interface ThreeElements {
    mesh: ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh>
    group: ReactThreeFiber.Object3DNode<THREE.Group, typeof THREE.Group>
    cylinderGeometry: ReactThreeFiber.BufferGeometryNode<THREE.CylinderGeometry, typeof THREE.CylinderGeometry>
    coneGeometry: ReactThreeFiber.BufferGeometryNode<THREE.ConeGeometry, typeof THREE.ConeGeometry>
    planeGeometry: ReactThreeFiber.BufferGeometryNode<THREE.PlaneGeometry, typeof THREE.PlaneGeometry>
    sphereGeometry: ReactThreeFiber.BufferGeometryNode<THREE.SphereGeometry, typeof THREE.SphereGeometry>
    meshStandardMaterial: ReactThreeFiber.MaterialNode<THREE.MeshStandardMaterial, typeof THREE.MeshStandardMaterial>
    meshBasicMaterial: ReactThreeFiber.MaterialNode<THREE.MeshBasicMaterial, typeof THREE.MeshBasicMaterial>
    ambientLight: ReactThreeFiber.LightNode<THREE.AmbientLight, typeof THREE.AmbientLight>
    directionalLight: ReactThreeFiber.LightNode<THREE.DirectionalLight, typeof THREE.DirectionalLight>
    color: ReactThreeFiber.Node<{ attach: string; args: [string] }>
    cloud: ReactThreeFiber.Node<{ opacity: number; speed: number; segments: number }>
  }
}

declare module '@react-three/drei' {
  export const Cloud: React.FC<{ opacity: number; speed: number; segments: number }>
  export const Sky: React.FC<any>
  export const Stars: React.FC<any>
  export const Environment: React.FC<any>
  export const Text: React.FC<any>
  export const Html: React.FC<any>
}

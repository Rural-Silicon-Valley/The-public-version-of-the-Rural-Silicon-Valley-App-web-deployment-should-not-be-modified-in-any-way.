import React, { useRef, useState, useMemo } from 'react';
import { Box, Container, Typography, Slider, Stack, IconButton } from '@mui/material';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Cloud } from '@react-three/drei';
import * as THREE from 'three';
import { PlayArrow, Pause } from '@mui/icons-material';
import PageLayout from '../components/PageLayout';

const Ground = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#90EE90" />
    </mesh>
  );
};

const Tree = ({ position = [0, 0, 0] as [number, number, number], scale = 1 }) => {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.3, 2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0, 2.5, 0]} castShadow>
        <coneGeometry args={[1, 2, 8]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
    </group>
  );
};

interface SceneProps {
  dayTime: number;
  isPlaying: boolean;
}

const Scene: React.FC<SceneProps> = ({ dayTime, isPlaying }) => {
  const time = useRef(0);
  
  useFrame((_, delta) => {
    if (isPlaying) {
      time.current += delta;
    }
  });
  
  const sunPosition = useMemo(() => {
    const angle = (dayTime / 100) * Math.PI;
    const x = Math.cos(angle) * 50;
    const y = Math.sin(angle) * 50;
    return [x, y, 0] as [number, number, number];
  }, [dayTime]);

  const skyColor = useMemo(() => {
    if (dayTime < 25 || dayTime > 75) return "#000020"; // 夜晚
    if (dayTime < 40 || dayTime > 60) return "#FF7F50"; // 日出/日落
    return "#87CEEB"; // 白天
  }, [dayTime]);

  const ambientIntensity = useMemo(() => {
    return Math.max(0.1, Math.sin((dayTime / 100) * Math.PI) * 0.5);
  }, [dayTime]);

  return (
    <>
      <color attach="background" args={[skyColor]} />
      <ambientLight intensity={ambientIntensity} />
      <directionalLight
        position={sunPosition}
        intensity={Math.max(0.2, Math.sin((dayTime / 100) * Math.PI) * 2)}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* 月亮 - 当太阳落山时可见 */}
      {(dayTime < 25 || dayTime > 75) && (
        <mesh position={[-sunPosition[0], -sunPosition[1], 0] as [number, number, number]}>
          <sphereGeometry args={[5, 32, 32]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.5} />
        </mesh>
      )}
      
      {/* 星星 - 夜间可见 */}
      {(dayTime < 25 || dayTime > 75) && Array.from({ length: 200 }).map((_, i) => {
        const x = Math.random() * 200 - 100;
        const y = Math.abs(Math.random() * 100); // 只在上半球
        const z = Math.random() * 200 - 100;
        return (
          <mesh key={i} position={[x, y, z] as [number, number, number]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
        );
      })}

      {/* 云朵 */}
      {Array.from({ length: 8 }).map((_, i) => {
        const x = Math.sin(time.current * 0.1 + i * Math.PI / 4) * 20;
        const y = 15 + Math.sin(time.current * 0.2 + i) * 2;
        const z = Math.cos(time.current * 0.1 + i * Math.PI / 4) * 20;
        return (
          <group key={i} position={[x, y, z] as [number, number, number]}>
            <Cloud
              opacity={0.5}
              speed={0.4}
              segments={20}
            />
          </group>
        );
      })}
      
      <Tree position={[-4, 0, -4] as [number, number, number]} scale={1.2} />
      <Tree position={[3, 0, -2] as [number, number, number]} scale={0.8} />
      <Tree position={[0, 0, -6] as [number, number, number]} scale={1.5} />
      <Tree position={[4, 0, -8] as [number, number, number]} scale={1.3} />
      <Tree position={[-3, 0, -10] as [number, number, number]} scale={1.1} />
      
      <Ground />
      
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
      />
    </>
  );
};

const ExploreView3DPage: React.FC = () => {
  const [dayTime, setDayTime] = useState(50);
  const [isPlaying, setIsPlaying] = useState(true);

  const boxStyles = {
    height: '70vh',
    width: '100%',
    position: 'relative'
  } as const;

  return (
    <PageLayout>
      <Container maxWidth="md" sx={{ pt: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 2,
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>
            🌳 乡村硅谷3D预览
          </Typography>
          
          {/* 3D场景 */}
          <Box sx={boxStyles}>
            <Canvas
              shadows
              camera={{ position: [10, 10, 10], fov: 60 }}
            >
              <Scene isPlaying={isPlaying} dayTime={dayTime} />
            </Canvas>
          </Box>
          
          {/* 控制面板 */}
          <Box sx={{ width: '100%', mt: 2, p: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <IconButton 
                  onClick={() => setIsPlaying(!isPlaying)}
                  color="primary"
                >
                  {isPlaying ? <Pause /> : <PlayArrow />}
                </IconButton>
                <Typography>动画控制</Typography>
              </Stack>
              
              <Stack spacing={1}>
                <Typography>时间控制：{
                  dayTime <= 25 ? "夜晚" :
                  dayTime <= 40 ? "日出" :
                  dayTime <= 60 ? "正午" :
                  dayTime <= 75 ? "日落" : "夜晚"
                }</Typography>
                <Slider
                  value={dayTime}
                  onChange={(_, value) => setDayTime(value as number)}
                  min={0}
                  max={100}
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 0, label: '午夜' },
                    { value: 25, label: '日出' },
                    { value: 50, label: '正午' },
                    { value: 75, label: '日落' },
                    { value: 100, label: '午夜' },
                  ]}
                />
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Container>
    </PageLayout>
  );
};

export default ExploreView3DPage;

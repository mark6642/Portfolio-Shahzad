import * as THREE from 'three';

// Global state for 3D scene
let scene, camera, renderer;
let particlesGeometry, particles;
let shapes = [];
let targetMouse = { x: 0, y: 0 };
let currentMouse = { x: 0, y: 0 };
let scrollProgress = 0;
let targetScrollProgress = 0;

// Dynamic texture generator to create sharp circular dots without external assets
function createParticleTexture() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  // Radial gradient for soft glowing dot
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
  gradient.addColorStop(0.5, 'rgba(0, 242, 254, 0.2)'); // Subtle cyan glow
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

// Initialize Three.js scene
export function init3D() {
  const canvas = document.getElementById('webgl-canvas');
  if (!canvas) return;

  // Scene setup
  scene = new THREE.Scene();

  // Camera setup
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 8;

  // Renderer setup (alpha: true to let CSS background show through)
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lights Setup
  const ambientLight = new THREE.AmbientLight(0x0a0a14, 2);
  scene.add(ambientLight);

  // Purple glowing point light (top-left)
  const purpleLight = new THREE.PointLight(0xa855f7, 25, 50);
  purpleLight.position.set(-10, 8, 5);
  scene.add(purpleLight);

  // Cyan glowing point light (bottom-right)
  const cyanLight = new THREE.PointLight(0x06b6d4, 20, 50);
  cyanLight.position.set(10, -8, 5);
  scene.add(cyanLight);

  // Build Particle Field (Constellation)
  buildParticles();

  // Build Glassmorphic Geometric Shapes
  buildGlassShapes();

  // Event Listeners
  window.addEventListener('resize', onWindowResize);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('scroll', onScroll);

  // Start Render Loop
  animate();
}

// Generate the interactive background particle constellation
function buildParticles() {
  const count = 1200;
  const positions = new Float32Array(count * 3);
  const randomSpeeds = new Float32Array(count);

  for (let i = 0; i < count * 3; i += 3) {
    // Distribute in a box around the camera
    positions[i] = (Math.random() - 0.5) * 25;
    positions[i + 1] = (Math.random() - 0.5) * 20;
    positions[i + 2] = (Math.random() - 0.5) * 15 - 5;
    randomSpeeds[i / 3] = 0.1 + Math.random() * 0.4;
  }

  particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particleTexture = createParticleTexture();
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.12,
    sizeAttenuation: true,
    map: particleTexture,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  // Store speed on geometry user data for simulation
  particlesGeometry.userData = { speeds: randomSpeeds };
}

// Generate the three floating glass geometries
function buildGlassShapes() {
  // Common premium physical material mimicking frosted glass
  const createGlassMaterial = (color) => {
    return new THREE.MeshPhysicalMaterial({
      color: color,
      metalness: 0.05,
      roughness: 0.15,
      transmission: 0.6, // Transparent glass transmission
      thickness: 1.8,
      ior: 1.5,
      specularIntensity: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide
    });
  };

  // Shape 1: Torus (Donut) - Primary visual
  const torusGeom = new THREE.TorusGeometry(1.6, 0.5, 32, 64);
  const torusMat = createGlassMaterial(0xa855f7); // Purple
  const torus = new THREE.Mesh(torusGeom, torusMat);
  torus.position.set(4, 0, 0); // Center-right in Hero
  scene.add(torus);
  shapes.push({
    mesh: torus,
    baseX: 4,
    baseY: 0,
    baseZ: 0,
    rotXSpeed: 0.005,
    rotYSpeed: 0.008
  });

  // Shape 2: Octahedron (Diamond)
  const octGeom = new THREE.OctahedronGeometry(1.5, 0);
  const octMat = createGlassMaterial(0x06b6d4); // Cyan
  const oct = new THREE.Mesh(octGeom, octMat);
  oct.position.set(-5, -6, -2); // Lower-left, visible during scroll
  scene.add(oct);
  shapes.push({
    mesh: oct,
    baseX: -5,
    baseY: -6,
    baseZ: -2,
    rotXSpeed: 0.007,
    rotYSpeed: 0.004
  });

  // Shape 3: Knot or Sphere
  const sphereGeom = new THREE.SphereGeometry(1.2, 32, 32);
  const sphereMat = createGlassMaterial(0xec4899); // Pink
  const sphere = new THREE.Mesh(sphereGeom, sphereMat);
  sphere.position.set(3, -12, -1);
  scene.add(sphere);
  shapes.push({
    mesh: sphere,
    baseX: 3,
    baseY: -12,
    baseZ: -1,
    rotXSpeed: 0.003,
    rotYSpeed: 0.006
  });
}

// Window resize handler
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

// Mouse movement tracker
function onMouseMove(event) {
  // Normalize between -1 and 1
  targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

// Scroll position tracker
function onScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (docHeight > 0) {
    targetScrollProgress = scrollTop / docHeight;
  }
}

// Core animation loop (Render Loop)
function animate(time) {
  requestAnimationFrame(animate);

  const t = time * 0.001; // elapsed seconds

  // Smooth mouse movement interpolation (lerp)
  currentMouse.x += (targetMouse.x - currentMouse.x) * 0.06;
  currentMouse.y += (targetMouse.y - currentMouse.y) * 0.06;

  // Smooth scroll interpolation (lerp)
  scrollProgress += (targetScrollProgress - scrollProgress) * 0.08;

  // 1. Animate particle field
  if (particles) {
    const positions = particlesGeometry.attributes.position.array;
    const speeds = particlesGeometry.userData.speeds;
    const count = positions.length;

    for (let i = 0; i < count; i += 3) {
      const idx = i / 3;
      // Drift particles slowly upwards/downwards
      positions[i + 1] += Math.sin(t * speeds[idx] + idx) * 0.005;
      positions[i] += Math.cos(t * speeds[idx] * 0.5 + idx) * 0.003;
    }
    particlesGeometry.attributes.position.needsUpdate = true;

    // Tilt particle group based on mouse movement
    particles.rotation.x = currentMouse.y * 0.15;
    particles.rotation.y = currentMouse.x * 0.15;
  }

  // 2. Animate and position floating glass shapes
  shapes.forEach((item, index) => {
    // Continuous rotation
    item.mesh.rotation.x += item.rotXSpeed;
    item.mesh.rotation.y += item.rotYSpeed;

    // React slightly to mouse coordinates (adds parallax depth)
    const mouseOffsetMul = (index === 0) ? 0.4 : 0.2;
    const mx = currentMouse.x * mouseOffsetMul;
    const my = currentMouse.y * mouseOffsetMul;

    // React to Scroll Progress
    // We adjust the Y coordinates to scroll the shapes up or move them in/out of screen center
    let scrollYOffset = 0;
    let scrollXOffset = 0;

    if (index === 0) { // Torus
      scrollYOffset = scrollProgress * 15; // Move up and out
      scrollXOffset = -scrollProgress * 6; // Shift left
    } else if (index === 1) { // Octahedron
      scrollYOffset = scrollProgress * 12; // Shift up into view
      scrollXOffset = scrollProgress * 7;
    } else if (index === 2) { // Sphere
      scrollYOffset = scrollProgress * 14;
      scrollXOffset = -scrollProgress * 2;
    }

    item.mesh.position.x = item.baseX + mx + scrollXOffset;
    item.mesh.position.y = item.baseY + my + scrollYOffset;
    item.mesh.position.z = item.baseZ + Math.sin(t + index) * 0.15; // floating drift
  });

  // 3. Render
  renderer.render(scene, camera);
}

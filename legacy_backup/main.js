/**
 * ArchVision 3D AI — Interactive Scripts & Three.js 3D Viewport Engines
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  /* ==========================================================================
     1. Theme Management (Light / Dark Mode)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve stored theme or system preference
  const savedTheme = localStorage.getItem('archvision_theme');
  if (savedTheme) {
    htmlRoot.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    htmlRoot.setAttribute('data-theme', 'light');
  }

  function toggleTheme() {
    const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlRoot.setAttribute('data-theme', nextTheme);
    localStorage.setItem('archvision_theme', nextTheme);

    // Update ThreeJS background color
    updateThreeSceneThemes(nextTheme);

    // Re-render icons if needed
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  /* ==========================================================================
     2. Mobile Navigation Drawer
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        mobileDrawer.classList.remove('open');
        mobileMenuBtn.classList.remove('active');
      } else {
        mobileDrawer.classList.add('open');
        mobileMenuBtn.classList.add('active');
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileMenuBtn.classList.remove('active');
      });
    });
  }

  /* ==========================================================================
     3. FAQ Accordion Interaction
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  /* ==========================================================================
     4. Animated Counter Stats
     ========================================================================== */
  const counters = document.querySelectorAll('.counter');
  let hasAnimated = false;

  function runCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const speed = 25;
      const step = Math.ceil(target / (1000 / speed));

      const updateCount = () => {
        count += step;
        if (count < target) {
          counter.innerText = count;
          setTimeout(updateCount, speed);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        runCounters();
        hasAnimated = true;
      }
    });
  }, { threshold: 0.5 });

  const metricsEl = document.querySelector('.hero-metrics');
  if (metricsEl) {
    observer.observe(metricsEl);
  }

  /* ==========================================================================
     5. Hero Three.js Miniature Scene
     ========================================================================== */
  let heroRenderer, heroScene, heroCamera, heroHouseGroup;
  initHeroThree();

  function initHeroThree() {
    const container = document.getElementById('hero-3d-container');
    const canvas = document.getElementById('hero-webgl-canvas');
    if (!container || !canvas || !window.THREE) return;

    heroScene = new THREE.Scene();
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 360;

    heroCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    heroCamera.position.set(7, 5, 8);
    heroCamera.lookAt(0, 1, 0);

    heroRenderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    heroRenderer.setSize(width, height);
    heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Ambient & Directional light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    heroScene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x00f2fe, 1.2);
    dirLight.position.set(5, 10, 7);
    heroScene.add(dirLight);

    const backLight = new THREE.DirectionalLight(0x6366f1, 0.8);
    backLight.position.set(-5, -2, -5);
    heroScene.add(backLight);

    // Group for the miniature house
    heroHouseGroup = new THREE.Group();

    // Base Grid
    const grid = new THREE.GridHelper(10, 10, 0x00f2fe, 0x334155);
    grid.position.y = -0.01;
    heroScene.add(grid);

    // Main House Body (Slab + Walls)
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.3,
      metalness: 0.2,
      wireframe: false
    });

    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });

    // Outer Walls
    const wallGeo = new THREE.BoxGeometry(4, 2, 3);
    const wallMesh = new THREE.Mesh(wallGeo, wallMaterial);
    wallMesh.position.set(0, 1, 0);
    heroHouseGroup.add(wallMesh);

    const wallWire = new THREE.Mesh(wallGeo, wireMaterial);
    wallWire.position.set(0, 1, 0);
    heroHouseGroup.add(wallWire);

    // Roof (Gable style)
    const roofGeo = new THREE.ConeGeometry(3.2, 1.2, 4);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x6366f1, roughness: 0.4 });
    const roofMesh = new THREE.Mesh(roofGeo, roofMat);
    roofMesh.position.set(0, 2.6, 0);
    roofMesh.rotation.y = Math.PI / 4;
    heroHouseGroup.add(roofMesh);

    // Balcony / Extension
    const extGeo = new THREE.BoxGeometry(1.8, 1.4, 1.8);
    const extMesh = new THREE.Mesh(extGeo, new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 }));
    extMesh.position.set(2, 0.7, 0.6);
    heroHouseGroup.add(extMesh);

    heroScene.add(heroHouseGroup);

    // Animation Loop
    let animId;
    function animateHero() {
      animId = requestAnimationFrame(animateHero);
      if (heroHouseGroup) {
        heroHouseGroup.rotation.y += 0.006;
      }
      heroRenderer.render(heroScene, heroCamera);
    }
    animateHero();

    window.addEventListener('resize', () => {
      if (!container || !heroCamera || !heroRenderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      heroCamera.aspect = w / h;
      heroCamera.updateProjectionMatrix();
      heroRenderer.setSize(w, h);
    });
  }

  /* ==========================================================================
     6. Main Interactive 3D Simulator (Full Viewport with Controls)
     ========================================================================== */
  let stageRenderer, stageScene, stageCamera, stageControls;
  let architecturalModelGroup, roofMeshGroup;
  let currentRoofType = 'gable';
  let currentMaterialTheme = 'modern';
  let isWireframeMode = false;
  let sunState = 0; // 0: Noon, 1: Golden Hour, 2: Twilight / Night
  let stageDirLight, stageAmbientLight;

  initMainInteractiveStage();

  function initMainInteractiveStage() {
    const stageContainer = document.getElementById('interactive-3d-stage');
    const stageCanvas = document.getElementById('interactive-webgl-canvas');
    if (!stageContainer || !stageCanvas || !window.THREE) return;

    stageScene = new THREE.Scene();
    const isDark = (document.documentElement.getAttribute('data-theme') || 'dark') === 'dark';
    stageScene.background = new THREE.Color(isDark ? 0x070a12 : 0xcbd5e1);

    const width = stageContainer.clientWidth || 800;
    const height = stageContainer.clientHeight || 520;

    stageCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 200);
    stageCamera.position.set(12, 9, 14);

    stageRenderer = new THREE.WebGLRenderer({ canvas: stageCanvas, antialias: true });
    stageRenderer.setSize(width, height);
    stageRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    stageRenderer.shadowMap.enabled = true;
    stageRenderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Orbit Controls
    if (window.THREE.OrbitControls) {
      stageControls = new THREE.OrbitControls(stageCamera, stageRenderer.domElement);
      stageControls.enableDamping = true;
      stageControls.dampingFactor = 0.05;
      stageControls.maxPolarAngle = Math.PI / 2 - 0.05; // don't go below ground
      stageControls.minDistance = 4;
      stageControls.maxDistance = 35;
      stageControls.target.set(0, 1.5, 0);
    }

    // Lighting
    stageAmbientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.6 : 0.8);
    stageScene.add(stageAmbientLight);

    stageDirLight = new THREE.DirectionalLight(0xfff7ed, 1.4);
    stageDirLight.position.set(10, 18, 12);
    stageDirLight.castShadow = true;
    stageDirLight.shadow.mapSize.width = 2048;
    stageDirLight.shadow.mapSize.height = 2048;
    stageDirLight.shadow.camera.near = 0.5;
    stageDirLight.shadow.camera.far = 40;
    stageDirLight.shadow.camera.left = -10;
    stageDirLight.shadow.camera.right = 10;
    stageDirLight.shadow.camera.top = 10;
    stageDirLight.shadow.camera.bottom = -10;
    stageDirLight.shadow.bias = -0.0005;
    stageScene.add(stageDirLight);

    // Ground Grid & Floor Slab
    const grid = new THREE.GridHelper(24, 24, 0x00f2fe, isDark ? 0x1e293b : 0x94a3b8);
    grid.position.y = 0;
    stageScene.add(grid);

    const groundPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(24, 24),
      new THREE.MeshStandardMaterial({
        color: isDark ? 0x0c1322 : 0xe2e8f0,
        roughness: 0.8,
        metalness: 0.1
      })
    );
    groundPlane.rotation.x = -Math.PI / 2;
    groundPlane.position.y = -0.02;
    groundPlane.receiveShadow = true;
    stageScene.add(groundPlane);

    // Build the architectural parametric model
    buildArchitecturalScene();

    // Render loop
    function renderStage() {
      requestAnimationFrame(renderStage);
      if (stageControls) stageControls.update();
      stageRenderer.render(stageScene, stageCamera);
    }
    renderStage();

    // Handle Window Resize
    window.addEventListener('resize', () => {
      if (!stageContainer || !stageCamera || !stageRenderer) return;
      const w = stageContainer.clientWidth;
      const h = stageContainer.clientHeight;
      stageCamera.aspect = w / h;
      stageCamera.updateProjectionMatrix();
      stageRenderer.setSize(w, h);
    });

    // Bind Controls Toolbar
    setupToolbarControls();
  }

  function getMaterialPalette(type) {
    if (type === 'brick') {
      return {
        wall: new THREE.MeshStandardMaterial({ color: 0x993d3d, roughness: 0.7, metalness: 0.1 }),
        wood: new THREE.MeshStandardMaterial({ color: 0x5a3d28, roughness: 0.5 }),
        glass: new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6, roughness: 0.1, metalness: 0.9 }),
        roof: new THREE.MeshStandardMaterial({ color: 0x78281f, roughness: 0.6 }),
        slab: new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.8 })
      };
    } else if (type === 'concrete') {
      return {
        wall: new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.9, metalness: 0.1 }),
        wood: new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4 }),
        glass: new THREE.MeshStandardMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.7, roughness: 0.05, metalness: 0.95 }),
        roof: new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 }),
        slab: new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9 })
      };
    } else {
      // Modern Clean (Default)
      return {
        wall: new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.4, metalness: 0.05 }),
        wood: new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.4 }),
        glass: new THREE.MeshStandardMaterial({ color: 0x0284c7, transparent: true, opacity: 0.5, roughness: 0.1, metalness: 0.8 }),
        roof: new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4 }),
        slab: new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6 })
      };
    }
  }

  function buildArchitecturalScene() {
    if (architecturalModelGroup) {
      stageScene.remove(architecturalModelGroup);
    }

    architecturalModelGroup = new THREE.Group();
    const mats = getMaterialPalette(currentMaterialTheme);

    // Foundation Slab (Living Area)
    const foundationGeo = new THREE.BoxGeometry(8, 0.3, 6);
    const foundationMesh = new THREE.Mesh(foundationGeo, mats.slab);
    foundationMesh.position.set(0, 0.15, 0);
    foundationMesh.receiveShadow = true;
    foundationMesh.castShadow = true;
    architecturalModelGroup.add(foundationMesh);

    // Exterior Walls (Parametric compound walls with openings)
    // Front Wall with Door and Window Opening
    createParametricWall(architecturalModelGroup, -3.85, 1.45, 2.9, 0.3, 2.6, 2.5, mats.wall); // left side
    createParametricWall(architecturalModelGroup, 2.0, 1.45, 2.9, 0.3, 2.6, 3.6, mats.wall); // right side
    createParametricWall(architecturalModelGroup, -0.6, 2.45, 2.9, 0.3, 0.6, 1.6, mats.wall); // above door lintel

    // Glass Door
    const doorGeo = new THREE.BoxGeometry(1.2, 2.1, 0.05);
    const doorMesh = new THREE.Mesh(doorGeo, mats.wood);
    doorMesh.position.set(-0.6, 1.1, 2.9);
    doorMesh.castShadow = true;
    architecturalModelGroup.add(doorMesh);

    // Glass Window in Front Wall
    const winGeo = new THREE.BoxGeometry(1.8, 1.2, 0.08);
    const winMesh = new THREE.Mesh(winGeo, mats.glass);
    winMesh.position.set(2.0, 1.5, 2.9);
    architecturalModelGroup.add(winMesh);

    // Window Frame
    const frameGeo = new THREE.BoxGeometry(1.86, 1.26, 0.12);
    const frameWire = new THREE.Mesh(frameGeo, new THREE.MeshBasicMaterial({ color: 0x0f172a, wireframe: true }));
    frameWire.position.set(2.0, 1.5, 2.9);
    architecturalModelGroup.add(frameWire);

    // Back Wall
    createParametricWall(architecturalModelGroup, 0, 1.45, -2.9, 0.3, 2.6, 7.7, mats.wall);

    // Left Wall
    createParametricWall(architecturalModelGroup, -3.85, 1.45, 0, 5.8, 2.6, 0.3, mats.wall);

    // Right Wall (With Corner Panoramic Window)
    createParametricWall(architecturalModelGroup, 3.85, 1.45, -1.2, 3.2, 2.6, 0.3, mats.wall);
    const sideWin = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.8, 2.2), mats.glass);
    sideWin.position.set(3.85, 1.5, 1.5);
    architecturalModelGroup.add(sideWin);

    // Interior Partition Wall
    createParametricWall(architecturalModelGroup, -0.5, 1.45, -0.8, 4.0, 2.6, 0.2, mats.wall);

    // Modern Porch Columns
    const colGeo = new THREE.CylinderGeometry(0.12, 0.12, 2.6, 16);
    const col1 = new THREE.Mesh(colGeo, mats.wood);
    col1.position.set(3.6, 1.45, 3.8);
    col1.castShadow = true;
    architecturalModelGroup.add(col1);

    // Terraced Front Deck
    const deckGeo = new THREE.BoxGeometry(7.6, 0.15, 1.8);
    const deckMesh = new THREE.Mesh(deckGeo, mats.wood);
    deckMesh.position.set(0, 0.08, 3.8);
    deckMesh.receiveShadow = true;
    architecturalModelGroup.add(deckMesh);

    // Roof Generation according to active Roof Type
    buildRoofGeometry(mats);

    stageScene.add(architecturalModelGroup);
  }

  function createParametricWall(parentGroup, x, y, z, depth, height, width, material) {
    const geo = new THREE.BoxGeometry(width, height, depth);
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parentGroup.add(mesh);
    return mesh;
  }

  function buildRoofGeometry(mats) {
    if (roofMeshGroup) {
      architecturalModelGroup.remove(roofMeshGroup);
    }
    roofMeshGroup = new THREE.Group();

    if (currentRoofType === 'gable') {
      // Gable Roof (Dos Aguas)
      const prismGeo = new THREE.ConeGeometry(5.4, 2.0, 4);
      const roofMesh = new THREE.Mesh(prismGeo, mats.roof);
      roofMesh.position.set(0, 3.75, 0);
      roofMesh.rotation.y = Math.PI / 4;
      roofMesh.scale.set(1.15, 1, 0.85);
      roofMesh.castShadow = true;
      roofMeshGroup.add(roofMesh);
    } else if (currentRoofType === 'shed') {
      // Shed Roof (Una Pendiente moderna)
      const shedGeo = new THREE.BoxGeometry(8.6, 0.35, 6.6);
      const shedMesh = new THREE.Mesh(shedGeo, mats.roof);
      shedMesh.position.set(0, 3.4, 0);
      shedMesh.rotation.z = -0.15; // single pitch slope
      shedMesh.castShadow = true;
      roofMeshGroup.add(shedMesh);
    } else {
      // Flat Roof (Plana con voladizo contemporáneo)
      const flatGeo = new THREE.BoxGeometry(8.8, 0.35, 6.8);
      const flatMesh = new THREE.Mesh(flatGeo, mats.roof);
      flatMesh.position.set(0, 2.9, 0);
      flatMesh.castShadow = true;
      roofMeshGroup.add(flatMesh);

      // Parapet rim
      const rimGeo = new THREE.BoxGeometry(8.9, 0.2, 6.9);
      const rimMesh = new THREE.Mesh(rimGeo, mats.wood);
      rimMesh.position.set(0, 3.1, 0);
      roofMeshGroup.add(rimMesh);
    }

    architecturalModelGroup.add(roofMeshGroup);
  }

  function setupToolbarControls() {
    // View Buttons (3D, 2D Floorplan, Wireframe)
    const btn3D = document.getElementById('btn-view-3d');
    const btn2D = document.getElementById('btn-view-2d');
    const btnWire = document.getElementById('btn-view-wire');

    const viewBtns = [btn3D, btn2D, btnWire];
    function setViewActive(btn) {
      viewBtns.forEach(b => b && b.classList.remove('active'));
      if (btn) btn.classList.add('active');
    }

    if (btn3D) {
      btn3D.addEventListener('click', () => {
        setViewActive(btn3D);
        setWireframe(false);
        animateCameraTo(12, 9, 14, 0, 1.5, 0);
      });
    }

    if (btn2D) {
      btn2D.addEventListener('click', () => {
        setViewActive(btn2D);
        setWireframe(false);
        // Top-down Orthographic-like view
        animateCameraTo(0.01, 18, 0, 0, 0, 0);
      });
    }

    if (btnWire) {
      btnWire.addEventListener('click', () => {
        setViewActive(btnWire);
        setWireframe(true);
      });
    }

    // Roof Buttons
    const roofGableBtn = document.getElementById('btn-roof-gable');
    const roofFlatBtn = document.getElementById('btn-roof-flat');
    const roofShedBtn = document.getElementById('btn-roof-shed');
    const roofBtns = [roofGableBtn, roofFlatBtn, roofShedBtn];

    function setRoofActive(btn, type) {
      roofBtns.forEach(b => b && b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      currentRoofType = type;
      const mats = getMaterialPalette(currentMaterialTheme);
      buildRoofGeometry(mats);
    }

    if (roofGableBtn) roofGableBtn.addEventListener('click', () => setRoofActive(roofGableBtn, 'gable'));
    if (roofFlatBtn) roofFlatBtn.addEventListener('click', () => setRoofActive(roofFlatBtn, 'flat'));
    if (roofShedBtn) roofShedBtn.addEventListener('click', () => setRoofActive(roofShedBtn, 'shed'));

    // Material Swatches
    const swatches = document.querySelectorAll('.swatch-btn');
    swatches.forEach(swatch => {
      swatch.addEventListener('click', () => {
        swatches.forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        currentMaterialTheme = swatch.getAttribute('data-material') || 'modern';
        buildArchitecturalScene();
      });
    });

    // Sun Lighting Study Toggle
    const sunBtn = document.getElementById('btn-sun-toggle');
    const sunLabel = document.getElementById('sun-label');
    const sunIcon = document.getElementById('sun-icon');

    if (sunBtn) {
      sunBtn.addEventListener('click', () => {
        sunState = (sunState + 1) % 3;
        if (sunState === 0) {
          // Noon
          sunLabel.innerText = 'Mediodía';
          stageDirLight.position.set(10, 18, 12);
          stageDirLight.color.setHex(0xffffff);
          stageDirLight.intensity = 1.4;
          stageAmbientLight.intensity = 0.7;
        } else if (sunState === 1) {
          // Golden Hour
          sunLabel.innerText = 'Atardecer';
          stageDirLight.position.set(16, 4, 10);
          stageDirLight.color.setHex(0xff7733);
          stageDirLight.intensity = 1.8;
          stageAmbientLight.intensity = 0.4;
        } else {
          // Blue Hour / Night
          sunLabel.innerText = 'Noche';
          stageDirLight.position.set(-8, 10, -8);
          stageDirLight.color.setHex(0x38bdf8);
          stageDirLight.intensity = 0.6;
          stageAmbientLight.intensity = 0.25;
        }
      });
    }
  }

  function setWireframe(enable) {
    if (!architecturalModelGroup) return;
    isWireframeMode = enable;
    architecturalModelGroup.traverse(child => {
      if (child.isMesh && child.material) {
        child.material.wireframe = enable;
      }
    });
  }

  function animateCameraTo(tx, ty, tz, lookX, lookY, lookZ) {
    if (!stageCamera || !stageControls) return;
    const startPos = stageCamera.position.clone();
    const endPos = new THREE.Vector3(tx, ty, tz);
    const startTarget = stageControls.target.clone();
    const endTarget = new THREE.Vector3(lookX, lookY, lookZ);

    let progress = 0;
    const duration = 30; // frames

    function step() {
      progress++;
      const t = progress / duration;
      const ease = t * (2 - t); // ease out

      stageCamera.position.lerpVectors(startPos, endPos, ease);
      stageControls.target.lerpVectors(startTarget, endTarget, ease);
      stageControls.update();

      if (progress < duration) {
        requestAnimationFrame(step);
      }
    }
    step();
  }

  function updateThreeSceneThemes(theme) {
    const isDark = theme === 'dark';
    if (stageScene) {
      stageScene.background = new THREE.Color(isDark ? 0x070a12 : 0xcbd5e1);
      if (stageAmbientLight) {
        stageAmbientLight.intensity = isDark ? 0.6 : 0.85;
      }
    }
  }

  /* ==========================================================================
     7. AI Assistant Chat Simulator
     ========================================================================== */
  const chatForm = document.getElementById('chat-sim-form');
  const chatInput = document.getElementById('chat-user-input');
  const chatContainer = document.getElementById('chat-messages-container');
  const quickPromptChips = document.querySelectorAll('.quick-prompt-chip');
  const chatResetBtn = document.getElementById('btn-chat-reset');

  function appendChatMessage(text, sender = 'ai') {
    if (!chatContainer) return;
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender === 'user' ? 'user-bubble' : 'ai-bubble'}`;
    bubble.innerHTML = `<p>${text}</p>`;
    chatContainer.appendChild(bubble);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  function handleUserPrompt(text) {
    if (!text.trim()) return;
    appendChatMessage(text, 'user');

    // Simulate AI thinking
    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();

      if (lower.includes('auditar') || lower.includes('reglas') || lower.includes('coherencia')) {
        reply = `🔍 <strong>Auditoría finalizada con éxito:</strong><br>
        • ✅ Todas las estancias poseen puertas de acceso válidas.<br>
        • ✅ Sin vanos flotantes en los 14 muros analizados.<br>
        • ⚠️ <em>Sugerencia:</em> El dormitorio principal tiene un ratio de iluminación del 12% (mínimo recomendado: 15%). ¿Deseas agrandar la ventana este?`;
      } else if (lower.includes('habitación') || lower.includes('dormitorio') || lower.includes('crear')) {
        reply = `✨ He generado la propuesta en memoria: <strong>Estancia de 4.00m x 4.00m</strong> (16 m²) adosada al muro norte con 2 ventanas de 1.50m. Pulsa <code>Aceptar</code> o presiona <code>Ctrl+Z</code> para deshacer.`;
      } else if (lower.includes('cubierta') || lower.includes('techo')) {
        reply = `🏠 He recalculado las cumbreras para la <strong>Cubierta a Dos Aguas</strong> con inclinación del 28%. Geometría paramétrica actualizada sin fisuras topológicas.`;
        // Trigger roof update in 3D simulator if loaded
        const gableBtn = document.getElementById('btn-roof-gable');
        if (gableBtn) gableBtn.click();
      } else if (lower.includes('exportar') || lower.includes('dxf') || lower.includes('bim')) {
        reply = `📦 Los módulos de exportación avanzada (GLTF 2.0, OBJ, STL y planos CAD DXF) están en la fase activa de integración. Puedes seguir su avance en la sección <strong>Próximos Hitos</strong>.`;
      } else {
        reply = `Comprendido. He parametrizado tu solicitud: <em>"${text}"</em>. La escena conserva la integridad dimensional y las cotas han sido actualizadas en tiempo real.`;
      }

      appendChatMessage(reply, 'ai');
    }, 600);
  }

  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = chatInput.value;
      chatInput.value = '';
      handleUserPrompt(val);
    });
  }

  quickPromptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      if (prompt) {
        handleUserPrompt(prompt);
      }
    });
  });

  if (chatResetBtn && chatContainer) {
    chatResetBtn.addEventListener('click', () => {
      chatContainer.innerHTML = `
        <div class="chat-bubble ai-bubble">
          <p>¡Hola! Soy tu asistente de diseño espacial. He analizado el proyecto actual: tienes <strong>142.8 m²</strong> construidos con 3 estancias principales. ¿En qué te gustaría avanzar?</p>
        </div>
      `;
    });
  }

  /* ==========================================================================
     8. GIF Fullscreen Lightbox Modal
     ========================================================================== */
  const expandGifBtn = document.getElementById('btn-expand-gif');
  const heroGifImage = document.getElementById('hero-gif-image');
  const gifModal = document.getElementById('gif-modal');
  const gifModalClose = document.getElementById('gif-modal-close');
  const gifModalBackdrop = document.getElementById('gif-modal-backdrop');

  function openGifModal() {
    if (gifModal) {
      gifModal.classList.add('active');
      gifModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeGifModal() {
    if (gifModal) {
      gifModal.classList.remove('active');
      gifModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (expandGifBtn) expandGifBtn.addEventListener('click', openGifModal);
  if (heroGifImage) heroGifImage.addEventListener('click', openGifModal);
  if (gifModalClose) gifModalClose.addEventListener('click', closeGifModal);
  if (gifModalBackdrop) gifModalBackdrop.addEventListener('click', closeGifModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && gifModal && gifModal.classList.contains('active')) {
      closeGifModal();
    }
  });
});


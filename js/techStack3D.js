// 3D Tech Stack Visualization using Three.js
class TechStack3D {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.nodes = [];
        this.animationId = null;
        this.nodeInfo = null;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        
        this.techStackData = [
            { name: 'React', position: [-4, 2, 0], color: 0x61dafb, category: 'Frontend', description: 'JavaScript library for building user interfaces' },
            { name: 'Node.js', position: [0, 2, 0], color: 0x68a063, category: 'Backend', description: 'JavaScript runtime for server-side development' },
            { name: 'MongoDB', position: [4, 2, 0], color: 0x4db33d, category: 'Database', description: 'NoSQL document database' },
            { name: 'Express', position: [-2, 0, 0], color: 0xffffff, category: 'Backend', description: 'Web application framework for Node.js' },
            { name: 'Python', position: [2, 0, 0], color: 0x3776ab, category: 'Backend', description: 'High-level programming language' },
            { name: 'TensorFlow', position: [0, -2, 0], color: 0xff6f00, category: 'AI/ML', description: 'Machine learning framework' }
        ];
        
        this.connections = [
            [0, 1], // React -> Node.js
            [1, 2], // Node.js -> MongoDB
            [1, 3], // Node.js -> Express
            [1, 4], // Node.js -> Python
            [4, 5]  // Python -> TensorFlow
        ];
        
        this.init();
    }
    
    init() {
        if (!this.container || this.container.offsetWidth === 0) {
            console.warn('Container not ready, retrying...');
            setTimeout(() => this.init(), 100);
            return;
        }
        
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupLighting();
        this.createTechNodes();
        this.createConnections();
        this.setupInteraction();
        this.createInfoPanel();
        this.animate();
        this.setupResize();
    }
    
    setupScene() {
        this.scene = new THREE.Scene();
    }
    
    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.container.offsetWidth / this.container.offsetHeight,
            0.1,
            1000
        );
        this.camera.position.z = 8;
    }
    
    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.container.appendChild(this.renderer.domElement);
    }
    
    setupLighting() {
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);
        
        const pointLight = new THREE.PointLight(0x00d4ff, 0.5, 10);
        pointLight.position.set(-3, 3, 3);
        this.scene.add(pointLight);
    }
    
    createTechNodes() {
        this.techStackData.forEach((tech, index) => {
            // Create sphere geometry
            const geometry = new THREE.SphereGeometry(0.5, 32, 32);
            const material = new THREE.MeshPhongMaterial({
                color: tech.color,
                shininess: 100,
                transparent: true,
                opacity: 0.9
            });
            
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(...tech.position);
            sphere.userData = tech;
            sphere.userData.originalPosition = tech.position.slice();
            sphere.userData.originalScale = 1;
            
            this.scene.add(sphere);
            this.nodes.push(sphere);
            
            // Add text label
            this.createTextLabel(tech, sphere);
            
            // Add glow effect
            this.addGlowEffect(sphere, tech.color);
        });
    }
    
    createTextLabel(tech, sphere) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 64;
        
        // Clear canvas
        context.fillStyle = 'rgba(0, 0, 0, 0)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw text
        context.fillStyle = '#ffffff';
        context.font = 'bold 20px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(tech.name, canvas.width / 2, canvas.height / 2);
        
        const textTexture = new THREE.CanvasTexture(canvas);
        const textMaterial = new THREE.SpriteMaterial({ map: textTexture });
        const textSprite = new THREE.Sprite(textMaterial);
        
        textSprite.position.set(tech.position[0], tech.position[1] - 1, tech.position[2]);
        textSprite.scale.set(2, 0.5, 1);
        textSprite.userData = { isLabel: true, parentNode: sphere };
        
        this.scene.add(textSprite);
    }
    
    addGlowEffect(mesh, color) {
        const glowGeometry = new THREE.SphereGeometry(0.6, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.1,
            side: THREE.BackSide
        });
        
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.position.copy(mesh.position);
        glow.userData = { isGlow: true, parentNode: mesh };
        
        this.scene.add(glow);
    }
    
    createConnections() {
        const connectionMaterial = new THREE.LineBasicMaterial({
            color: 0x00d4ff,
            opacity: 0.6,
            transparent: true,
            linewidth: 2
        });
        
        this.connections.forEach(([fromIndex, toIndex]) => {
            const points = [
                new THREE.Vector3(...this.techStackData[fromIndex].position),
                new THREE.Vector3(...this.techStackData[toIndex].position)
            ];
            
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, connectionMaterial);
            line.userData = { isConnection: true };
            
            this.scene.add(line);
        });
    }
    
    createInfoPanel() {
        this.nodeInfo = document.createElement('div');
        this.nodeInfo.style.cssText = `
            position: absolute;
            top: 10px;
            left: 10px;
            background: rgba(0, 0, 0, 0.9);
            color: #00d4ff;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid rgba(0, 212, 255, 0.3);
            max-width: 250px;
            font-family: 'Segoe UI', sans-serif;
            font-size: 14px;
            line-height: 1.4;
            display: none;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        `;
        this.container.appendChild(this.nodeInfo);
    }
    
    setupInteraction() {
        this.container.addEventListener('mousemove', (event) => this.onMouseMove(event));
        this.container.addEventListener('click', (event) => this.onClick(event));
        this.container.addEventListener('mouseleave', () => this.onMouseLeave());
    }
    
    onMouseMove(event) {
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / this.container.offsetWidth) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / this.container.offsetHeight) * 2 + 1;
        
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.nodes);
        
        // Reset all nodes
        this.nodes.forEach(node => {
            node.scale.set(1, 1, 1);
            node.material.opacity = 0.9;
        });
        
        if (intersects.length > 0) {
            const intersected = intersects[0].object;
            
            // Highlight intersected node
            intersected.scale.set(1.3, 1.3, 1.3);
            intersected.material.opacity = 1;
            
            // Show info panel
            this.showNodeInfo(intersected.userData, event);
            this.container.style.cursor = 'pointer';
            
            // Highlight connected nodes
            this.highlightConnections(intersected.userData.name);
        } else {
            this.hideNodeInfo();
            this.container.style.cursor = 'default';
        }
    }
    
    onClick(event) {
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / this.container.offsetWidth) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / this.container.offsetHeight) * 2 + 1;
        
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.nodes);
        
        if (intersects.length > 0) {
            const tech = intersects[0].object.userData;
            this.showDetailedInfo(tech);
        }
    }
    
    onMouseLeave() {
        this.hideNodeInfo();
        this.container.style.cursor = 'default';
        
        // Reset all nodes
        this.nodes.forEach(node => {
            node.scale.set(1, 1, 1);
            node.material.opacity = 0.9;
        });
    }
    
    showNodeInfo(tech, event) {
        this.nodeInfo.innerHTML = `
            <div style="color: #fff; font-weight: bold; margin-bottom: 8px;">
                ${tech.name}
            </div>
            <div style="color: #4ecdc4; font-size: 12px; margin-bottom: 8px;">
                ${tech.category}
            </div>
            <div style="color: #ccc; font-size: 12px;">
                ${tech.description}
            </div>
            <div style="color: #00d4ff; font-size: 11px; margin-top: 8px;">
                Click for more details
            </div>
        `;
        
        const rect = this.container.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        this.nodeInfo.style.left = (x + 20) + 'px';
        this.nodeInfo.style.top = (y - 50) + 'px';
        this.nodeInfo.style.display = 'block';
    }
    
    hideNodeInfo() {
        this.nodeInfo.style.display = 'none';
    }
    
    showDetailedInfo(tech) {
        const details = {
            'React': 'A declarative, efficient, and flexible JavaScript library for building user interfaces. Great for creating interactive UIs.',
            'Node.js': 'JavaScript runtime built on Chrome\'s V8 engine. Enables server-side JavaScript development.',
            'MongoDB': 'Document-oriented NoSQL database. Perfect for flexible, scalable data storage.',
            'Express': 'Fast, unopinionated, minimalist web framework for Node.js. Simplifies server-side development.',
            'Python': 'High-level programming language known for its simplicity and versatility. Great for backend and AI.',
            'TensorFlow': 'Open-source machine learning framework. Enables building and training neural networks.'
        };
        
        alert(`${tech.name}\n\n${details[tech.name] || tech.description}`);
    }
    
    highlightConnections(nodeName) {
        const nodeIndex = this.techStackData.findIndex(tech => tech.name === nodeName);
        if (nodeIndex === -1) return;
        
        // Find connected nodes
        const connectedIndices = [];
        this.connections.forEach(([from, to]) => {
            if (from === nodeIndex) connectedIndices.push(to);
            if (to === nodeIndex) connectedIndices.push(from);
        });
        
        // Highlight connected nodes
        connectedIndices.forEach(index => {
            if (this.nodes[index]) {
                this.nodes[index].material.opacity = 1;
                this.nodes[index].scale.set(1.1, 1.1, 1.1);
            }
        });
    }
    
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        const time = Date.now() * 0.001;
        
        this.nodes.forEach((node, index) => {
            // Rotate nodes
            node.rotation.y += 0.01;
            node.rotation.x += 0.005;
            
            // Float animation
            const originalY = node.userData.originalPosition[1];
            node.position.y = originalY + Math.sin(time + index) * 0.1;
            
            // Pulse effect
            const scale = 1 + Math.sin(time * 2 + index) * 0.05;
            if (!node.userData.isHovered) {
                node.scale.set(scale, scale, scale);
            }
        });
        
        this.renderer.render(this.scene, this.camera);
    }
    
    setupResize() {
        window.addEventListener('resize', () => {
            if (this.container.offsetWidth > 0) {
                this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
            }
        });
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        if (this.renderer && this.renderer.domElement) {
            this.container.removeChild(this.renderer.domElement);
        }
        
        if (this.nodeInfo) {
            this.container.removeChild(this.nodeInfo);
        }
        
        // Clean up Three.js objects
        if (this.scene) {
            this.scene.clear();
        }
        
        if (this.renderer) {
            this.renderer.dispose();
        }
        
        // Remove event listeners
        this.container.removeEventListener('mousemove', this.onMouseMove);
        this.container.removeEventListener('click', this.onClick);
        this.container.removeEventListener('mouseleave', this.onMouseLeave);
    }
}

// Export for use in main.js
window.TechStack3D = TechStack3D;
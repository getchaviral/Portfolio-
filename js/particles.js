// Particles Background Animation
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        this.resizeCanvas();
        this.createParticles();
        this.animate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createParticles();
        });
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        this.particles = [];
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                pulse: Math.random() * Math.PI * 2
            });
        }
    }
    
    updateParticle(particle) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.pulse += 0.02;
        
        // Bounce off walls
        if (particle.x < 0 || particle.x > this.canvas.width) {
            particle.vx *= -1;
        }
        if (particle.y < 0 || particle.y > this.canvas.height) {
            particle.vy *= -1;
        }
        
        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
    }
    
    drawParticle(particle) {
        const pulsedOpacity = particle.opacity * (0.5 + 0.5 * Math.sin(particle.pulse));
        
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(0, 212, 255, ${pulsedOpacity})`;
        this.ctx.fill();
    }
    
    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const opacity = 0.1 * (1 - distance / 100);
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach(particle => {
            this.updateParticle(particle);
            this.drawParticle(particle);
        });
        
        // Draw connections
        this.drawConnections();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        window.removeEventListener('resize', this.resizeCanvas);
    }
}

// Mouse interaction with particles
class MouseInteraction {
    constructor(particleSystem) {
        this.particleSystem = particleSystem;
        this.mouse = { x: 0, y: 0 };
        this.isMouseActive = false;
        
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.isMouseActive = true;
            
            this.attractParticles();
        });
        
        document.addEventListener('mouseleave', () => {
            this.isMouseActive = false;
        });
    }
    
    attractParticles() {
        const attractionRadius = 150;
        const attractionStrength = 0.02;
        
        this.particleSystem.particles.forEach(particle => {
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < attractionRadius) {
                const force = (attractionRadius - distance) / attractionRadius;
                particle.vx += (dx / distance) * force * attractionStrength;
                particle.vy += (dy / distance) * force * attractionStrength;
                
                // Limit velocity
                const maxVel = 2;
                const vel = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
                if (vel > maxVel) {
                    particle.vx = (particle.vx / vel) * maxVel;
                    particle.vy = (particle.vy / vel) * maxVel;
                }
            }
        });
    }
}

// Initialize particle system when DOM is loaded
let particleSystem = null;
let mouseInteraction = null;

function initParticles() {
    if (particleSystem) {
        particleSystem.destroy();
    }
    
    particleSystem = new ParticleSystem();
    mouseInteraction = new MouseInteraction(particleSystem);
}

// Export for use in main.js
window.ParticleSystem = {
    init: initParticles,
    destroy: () => {
        if (particleSystem) {
            particleSystem.destroy();
            particleSystem = null;
        }
    }
};
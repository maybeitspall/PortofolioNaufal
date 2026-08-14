/**
 * Liquid Background Canvas Physics Engine
 * Creates organic morphing ambient fluid blobs with smooth particle motion and mouse repulsion.
 */

class LiquidBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.blobs = [];
    this.mouse = { x: -1000, y: -1000, radius: 150 };
    this.colors = [
      { r: 99, g: 102, b: 241, a: 0.18 },   // Indigo
      { r: 139, g: 92, b: 246, a: 0.15 },  // Violet
      { r: 6, g: 182, b: 212, a: 0.12 },   // Cyan
      { r: 236, g: 72, b: 153, a: 0.08 },  // Pink
      { r: 16, g: 185, b: 129, a: 0.08 }   // Emerald
    ];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    this.createBlobs();
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  createBlobs() {
    this.blobs = [];
    const count = window.innerWidth < 768 ? 4 : 6;

    for (let i = 0; i < count; i++) {
      const color = this.colors[i % this.colors.length];
      this.blobs.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 200 + (window.innerWidth < 768 ? 150 : 250),
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        color: color,
        baseRadius: Math.random() * 200 + (window.innerWidth < 768 ? 150 : 250),
        pulseSpeed: Math.random() * 0.02 + 0.01,
        angle: Math.random() * Math.PI * 2
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let blob of this.blobs) {
      // Movement
      blob.x += blob.vx;
      blob.y += blob.vy;
      blob.angle += blob.pulseSpeed;

      // Soft breathing effect
      blob.radius = blob.baseRadius + Math.sin(blob.angle) * 30;

      // Boundary bounce with damping
      if (blob.x - blob.radius < -100) {
        blob.x = -100 + blob.radius;
        blob.vx *= -1;
      }
      if (blob.x + blob.radius > this.width + 100) {
        blob.x = this.width + 100 - blob.radius;
        blob.vx *= -1;
      }
      if (blob.y - blob.radius < -100) {
        blob.y = -100 + blob.radius;
        blob.vy *= -1;
      }
      if (blob.y + blob.radius > this.height + 100) {
        blob.y = this.height + 100 - blob.radius;
        blob.vy *= -1;
      }

      // Mouse gentle interaction
      const dx = blob.x - this.mouse.x;
      const dy = blob.y - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < this.mouse.radius + blob.radius) {
        const force = (1 - dist / (this.mouse.radius + blob.radius)) * 2;
        blob.x += (dx / dist) * force;
        blob.y += (dy / dist) * force;
      }

      // Render gradient blob
      const gradient = this.ctx.createRadialGradient(
        blob.x, blob.y, 0,
        blob.x, blob.y, blob.radius
      );
      gradient.addColorStop(0, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, ${blob.color.a})`);
      gradient.addColorStop(0.6, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, ${blob.color.a * 0.4})`);
      gradient.addColorStop(1, 'rgba(6, 8, 24, 0)');

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }

    requestAnimationFrame(() => this.animate());
  }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new LiquidBackground('liquid-canvas');
});

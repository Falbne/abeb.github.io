import React, { useEffect, useRef } from 'react';
import './style.css';
import * as THREE from 'three';

function App() {
  const canvasRef = useRef<HTMLDivElement>(null);

  // 3D Animation logic
  useEffect(() => {
    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, particles: THREE.Points, animationId: number;
    const container = canvasRef.current;
    if (!container) return;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 1500; i++) {
      vertices.push(
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000
      );
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 2, transparent: true, opacity: 0.8 });
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
    camera.position.z = 500;

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize);

    function animate() {
      animationId = requestAnimationFrame(animate);
      particles.rotation.x += 0.0005;
      particles.rotation.y += 0.0005;
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Typewriter effect for tagline
  useEffect(() => {
    const el = document.querySelector('.tagline');
    if (!el) return;
    const text = el.getAttribute('data-text') || el.textContent?.trim() || '';
    el.textContent = '';
    el.classList.add('typing');
    let i = 0;
    function type() {
      if (i < text.length && el) {
        el.textContent += text.charAt(i++);
        setTimeout(type, 100);
      }
    }
    type();
  }, []);

  // Fade-in animations
  useEffect(() => {
    setTimeout(() => {
      const header = document.querySelector('.header');
      if (header) header.classList.add('visible');
      document.querySelectorAll('section').forEach((section, idx) => {
        setTimeout(() => section.classList.add('visible'), 200 * (idx + 1));
      });
      const footer = document.querySelector('.footer');
      if (footer) footer.classList.add('visible');
    }, 500);
  }, []);

  return (
    <>
      <div id="canvas-container" ref={canvasRef}></div>
      <nav className="navbar">
        <ul className="nav-list">
          <li><a href="#about">About</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#contact">Connect</a></li>
        </ul>
      </nav>
      <div className="app-container">
        <header className="header">
          <div className="header-content">
            <h1 className="glitch" data-text="Falbne">Falbne</h1>
            <p className="tagline" data-text="Innopolis University Student">Innopolis University Student</p>
          </div>
        </header>
        <main>
          <section id="about" className="about-section glass-panel">
            <h2>About Me</h2>
            <div className="about-content">
              <div className="about-text">
                <p>
                  Hello! I'm a student at Innopolis University, pursuing my passion for technology and innovation.
                  Innopolis University is a leading institution specializing in IT education and research in Russia.
                </p>
                <p>
                  My academic journey involves exploring various aspects of computer science, 
                  from software development to artificial intelligence and beyond.
                </p>
              </div>
            </div>
          </section>
          <section id="education" className="education-section glass-panel">
            <h2>Education</h2>
            <div className="education-card">
              <div className="university-logo">
                <div className="logo-3d">IU</div>
              </div>
              <div className="education-details">
                <h3>Innopolis University</h3>
                <p className="education-program">Computer Science Program</p>
                <p>
                  Studying at one of Russia's most innovative technical universities, 
                  focusing on cutting-edge technology and computer science.
                </p>
              </div>
            </div>
          </section>
          <section id="contact" className="contact-section glass-panel">
            <h2>Connect With Me</h2>
            <div className="contact-methods">
              <a href="https://t.me/falbne" className="contact-card" target="_blank" rel="noopener noreferrer">
                <div className="contact-icon">
                  <img src={process.env.PUBLIC_URL + '/telegram.svg'} width="100%" alt="Telegram" />
                </div>
                <div className="contact-info">
                  <h3>Telegram</h3>
                  <p className="contact-value">@falbne</p>
                </div>
              </a>
            </div>
          </section>
        </main>
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Falbne | Innopolis University Student</p>
        </footer>
      </div>
    </>
  );
}

export default App;

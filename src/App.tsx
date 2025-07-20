import React, { useEffect, useRef } from 'react';
import './style.css';
import * as THREE from 'three';
import StackIcon from "tech-stack-icons";

function App() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const hasTyped = useRef(false); // guard for typewriter

  // 3D Animation logic
  useEffect(() => {
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let particles: THREE.Points;
    let animationId: number;
    const container = canvasRef.current;
    if (!container) return;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    for (let i = 0; i < 1500; i++) {
      vertices.push(
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000
      );
    }
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2,
      transparent: true,
      opacity: 0.8,
    });
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
    if (hasTyped.current) return; // do it only once
    hasTyped.current = true;

    const el = document.querySelector('.tagline');
    if (!el) return;
    const text =
      el.getAttribute('data-text') || el.textContent?.trim() || '';
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
          <li><a href="#stack">Stack</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#contact">Connect</a></li>
        </ul>
      </nav>
      <div className="app-container">
        <header className="header">
          <div className="header-content">
            <h1 className="glitch" data-text="abeb">
              abeb
            </h1>
            <p
              className="tagline"
              data-text="Innopolis University Student"
            >
              Innopolis University Student
            </p>
          </div>
        </header>
        <main>
          <section id="about" className="about-section glass-panel">
            <h2>About Me</h2>
            <div className="about-content">
              <div className="about-text">
                <p>
                  Hello! I'm a student at Innopolis University,
                  pursuing my passion for technology and innovation.
                  Innopolis University is a leading institution
                  specializing in IT education and research in Russia.
                </p>
                <p>
                  My academic journey involves exploring various
                  aspects of computer science, from software
                  development to artificial intelligence and beyond.
                </p>
              </div>
            </div>
          </section>
          <section id="stack" className="stack-section glass-panel">
            <h2>Stack</h2>
            <div className="stack-category">
              <h3>Web Development</h3>
              <div className="stack-icons">
                <div className="stack-icon-item">
                  <StackIcon name="html5" style={{ width: 64, height: 64 }} />
                  <span>HTML5</span>
                </div>
                <div className="stack-icon-item">
                  <StackIcon name="css3" style={{ width: 64, height: 64 }} />
                  <span>CSS3</span>
                </div>
                <div className="stack-icon-item">
                  <StackIcon name="js" style={{ width: 64, height: 64 }} />
                  <span>JavaScript</span>
                </div>
                <div className="stack-icon-item">
                  <StackIcon name="typescript" style={{ width: 64, height: 64 }} />
                  <span>TypeScript</span>
                </div>
                <div className="stack-icon-item">
                  <StackIcon name="react" style={{ width: 64, height: 64 }} />
                  <span>React</span>
                </div>
              </div>
            </div>
            <div className="stack-category">
              <h3>Programming Languages</h3>
              <div className="stack-icons">
                <div className="stack-icon-item">
                  <StackIcon name="python" style={{ width: 64, height: 64 }} />
                  <span>Python</span>
                </div>
                <div className="stack-icon-item">
                  <StackIcon name="c++" style={{ width: 64, height: 64 }} />
                  <span>C++</span>
                </div>
                <div className="stack-icon-item">
                  <StackIcon name="java" style={{ width: 64, height: 64 }} />
                  <span>Java</span>
                </div>
              </div>
            </div>
            <div className="stack-category">
              <h3>Tools & Platforms</h3>
              <div className="stack-icons">
                <div className="stack-icon-item">
                  <StackIcon name="git" style={{ width: 64, height: 64 }} />
                  <span>Git</span>
                </div>
                <div className="stack-icon-item">
                  <StackIcon name="github" style={{ width: 64, height: 64 }} />
                  <span>GitHub</span>
                </div>
              </div>
            </div>
            <div className="stack-category">
              <h3>Operating Systems & Shells</h3>
              <div className="stack-icons">
                <div className="stack-icon-item">
                  <StackIcon name="linux" style={{ width: 64, height: 64 }} />
                  <span>Linux</span>
                </div>
                <div className="stack-icon-item">
                  <StackIcon name="bash" style={{ width: 64, height: 64 }} />
                  <span>Bash</span>
                </div>
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
                <p className="education-program">
                  Computer Science Program
                </p>
                <p>
                  Studying at one of Russia's most innovative technical
                  universities, focusing on cutting-edge technology and
                  computer science.
                </p>
              </div>
            </div>
          </section>
          <section id="contact" className="contact-section glass-panel">
            <h2>Connect With Me</h2>
            <div className="contact-methods">
              <a
                href="https://t.me/abeb_dev"
                className="contact-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="contact-icon">
                  <img
                    src="/telegram-svgrepo-com.svg"
                    width="100%"
                  />
                </div>
                <div className="contact-info">
                  <h3>Telegram</h3>
                  <p className="contact-value">@abeb_dev</p>
                </div>
              </a>
              <a
                href="https://github.com/abeb021"
                className="contact-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="contact-icon">
                  <StackIcon name="github" />
                </div>
                <div className="contact-info">
                  <h3>Github</h3>
                  <p className="contact-value">@abeb021</p>
                </div>
              </a>
            </div>
          </section>
        </main>
        <footer className="footer">
          <p>
            &copy; {new Date().getFullYear()} Abeb |
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;

// animations.js

// 3D Background Animation
let scene, camera, renderer, particles;

function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    
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
    window.addEventListener('resize', onWindowResize);
    animate();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.0005;
    renderer.render(scene, camera);
}

// Typewriter effect for tagline
function typewriterEffect(selector, speed = 100) {
    const el = document.querySelector(selector);
    const text = el.textContent.trim();
    el.textContent = '';
    el.classList.add('typing');
    let i = 0;
    function type() {
        if (i < text.length) {
            el.textContent += text.charAt(i++);
            setTimeout(type, speed);
        }
    }
    type();
}

document.addEventListener('DOMContentLoaded', () => {
    initThree();

    // Fade-in animations
    setTimeout(() => {
        document.querySelector('.header').classList.add('visible');
        document.querySelectorAll('section').forEach((section, idx) => {
            setTimeout(() => section.classList.add('visible'), 200 * (idx + 1));
        });
        document.querySelector('.footer').classList.add('visible');
    }, 500);

    // Start typewriter on tagline
    typewriterEffect('.tagline', 100);
});

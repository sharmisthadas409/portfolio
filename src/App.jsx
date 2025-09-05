import React, { useState, useEffect, useRef } from 'react';

// --- This component injects all necessary CSS directly into the page ---
const GlobalStyles = () => (
    <style>{`
        :root {
            --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
            --secondary-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            --accent-gradient: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
            --glass-bg: rgba(255, 255, 255, 0.1);
            --glass-border: rgba(255, 255, 255, 0.2);
            --text-primary: #1a1a1a;
            --text-secondary: #666666;
            --bg-primary: #ffffff;
            --bg-secondary: #f8fafc;
            --bg-tertiary: #e2e8f0;
            --card-bg: rgba(255, 255, 255, 0.8);
            --shadow-light: 0 8px 32px rgba(31, 38, 135, 0.37);
            --shadow-medium: 0 20px 40px rgba(0, 0, 0, 0.1);
            --shadow-heavy: 0 30px 60px rgba(0, 0, 0, 0.2);
            --border-radius: 24px;
            --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        [data-theme="dark"] {
            --text-primary: #ffffff;
            --text-secondary: #a0a0a0;
            --bg-primary: #0a0a0a;
            --bg-secondary: #111111;
            --bg-tertiary: #1a1a1a;
            --card-bg: rgba(26, 26, 26, 0.8);
            --glass-bg: rgba(26, 26, 26, 0.3);
            --glass-border: rgba(255, 255, 255, 0.1);
            --shadow-light: 0 8px 32px rgba(0, 0, 0, 0.5);
            --shadow-medium: 0 20px 40px rgba(0, 0, 0, 0.3);
            --shadow-heavy: 0 30px 60px rgba(0, 0, 0, 0.5);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: var(--text-primary);
            background: var(--bg-primary);
            overflow-x: hidden;
            transition: var(--transition);
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        /* Navigation */
        .navbar {
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1000;
            padding: 1rem 0;
            transition: var(--transition);
        }

        .navbar.scrolled {
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--glass-border);
        }

        .nav-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 800;
            background: var(--primary-gradient);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            font-family: 'JetBrains Mono', monospace;
        }

        .nav-links {
            display: flex;
            list-style: none;
            gap: 2.5rem;
            align-items: center;
        }

        .nav-links a {
            text-decoration: none;
            color: var(--text-primary);
            font-weight: 500;
            font-size: 0.95rem;
            position: relative;
            transition: var(--transition);
        }

        .nav-links a::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--primary-gradient);
            transition: var(--transition);
        }

        .nav-links a:hover::after {
            width: 100%;
        }

        .theme-toggle {
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: 50px;
            padding: 0.5rem;
            cursor: pointer;
            transition: var(--transition);
            display: flex;
            align-items: center;
            gap: 0.5rem;
            backdrop-filter: blur(10px);
        }

        .theme-toggle:hover {
            transform: scale(1.05);
        }

        .theme-icon {
            font-size: 1rem;
            color: var(--text-primary);
            transition: var(--transition);
        }

        /* Hero Section */
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            position: relative;
            background: var(--bg-primary);
            overflow: hidden;
        }

        .floating-shapes {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 1;
        }

        .shape {
            position: absolute;
            background: var(--primary-gradient);
            border-radius: 50%;
            filter: blur(40px);
            animation: float 8s ease-in-out infinite;
        }
        .shape-1 { width: 300px; height: 300px; top: 20%; left: 10%; animation-delay: 0s; }
        .shape-2 { width: 200px; height: 200px; top: 60%; right: 15%; animation-delay: 2s; }
        .shape-3 { width: 150px; height: 150px; bottom: 20%; left: 60%; animation-delay: 4s; }

        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
            50% { transform: translateY(-30px) rotate(180deg); opacity: 0.6; }
        }

        .hero-content {
            display: grid;
            grid-template-columns: 1.2fr 1fr;
            gap: 4rem;
            align-items: center;
            position: relative;
            z-index: 2;
            min-height: 80vh;
        }

        .hero-text { animation: slideInLeft 1s ease-out; }
        .hero-text .eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem; letter-spacing: 2px; text-transform: uppercase; }
        .hero-text h1 { font-size: clamp(3rem, 8vw, 5rem); font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; }
        .text-gradient { background: var(--primary-gradient); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-text .subtitle { font-size: 1.4rem; color: var(--text-secondary); margin-bottom: 2rem; font-weight: 400; }

        .hero-cta { display: flex; gap: 1rem; margin-bottom: 3rem; flex-wrap: wrap; }

        .btn { padding: 1rem 2rem; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 0.95rem; display: inline-flex; align-items: center; gap: 0.5rem; transition: var(--transition); position: relative; overflow: hidden; border: none; cursor: pointer; }
        .btn-primary { background: var(--primary-gradient); color: white; box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4); }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(102, 126, 234, 0.6); }
        .btn-secondary { background: #eef2ff; color: #4338ca; border: 1px solid transparent; }
        .btn-secondary:hover { transform: translateY(-3px); background: #e0e7ff; }

        [data-theme="dark"] .btn-secondary { background: var(--glass-bg); color: var(--text-primary); border: 1px solid var(--glass-border); backdrop-filter: blur(10px); }
        [data-theme="dark"] .btn-secondary:hover { background: var(--glass-border); }

        .social-proof { display: flex; gap: 2rem; align-items: center; }
        .social-proof a { text-decoration: none; color: inherit; }
        .social-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: var(--text-secondary); }
        
        [data-tooltip] { position: relative; cursor: pointer; }
        [data-tooltip]::after { content: attr(data-tooltip); position: absolute; bottom: 125%; left: 50%; transform: translateX(-50%) scale(0.8); background-color: var(--text-primary); color: var(--bg-primary); padding: 0.5rem 1rem; border-radius: 8px; font-size: 0.85rem; font-weight: 500; white-space: nowrap; opacity: 0; visibility: hidden; z-index: 10; box-shadow: var(--shadow-medium); transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease; }
        [data-tooltip]:hover::after { opacity: 1; visibility: visible; animation: pop-up 0.3s ease-out forwards; }
        @keyframes pop-up {
            0% { opacity: 0; transform: translateX(-50%) translateY(10px) scale(0.8); }
            100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }

        .hero-visual { position: relative; display: flex; justify-content: center; align-items: center; animation: slideInRight 1s ease-out; }
        .profile-container { position: relative; z-index: 2; }
        .profile-card { background: var(--glass-bg); backdrop-filter: blur(20px); border: 1px solid var(--glass-border); border-radius: var(--border-radius); padding: 2.5rem; text-align: center; position: relative; overflow: hidden; }
        .profile-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: var(--primary-gradient); }
        .profile-image { width: 200px; height: 200px; border-radius: 50%; background: var(--primary-gradient); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; position: relative; overflow: hidden; }
        .profile-image img { width: 100%; height: 100%; object-fit: cover; }
        .profile-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 1.5rem; }
        .stat-item { text-align: center; }
        .stat-number { font-size: 1.5rem; font-weight: 700; background: var(--primary-gradient); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; display: block; }
        .stat-label { font-size: 0.8rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px; }

        /* Sections */
        .section { padding: 6rem 0; position: relative; }
        .section-header { text-align: center; margin-bottom: 4rem; }
        .section-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: var(--text-secondary); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 1rem; }
        .section-title { font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 800; background: var(--primary-gradient); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 1rem; }
        .section-subtitle { font-size: 1.2rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto; }

        /* About Section */
        .about { background: var(--bg-secondary); }
        .about-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 4rem; align-items: start; }
        .about-stats { display: grid; gap: 1.5rem; }
        .metric-card { background: var(--card-bg); backdrop-filter: blur(20px); border: 1px solid var(--glass-border); border-radius: var(--border-radius); padding: 2rem; text-align: center; transition: var(--transition); position: relative; overflow: hidden; }
        .metric-card:hover { transform: translateY(-5px); }
        .metric-card a { text-decoration: none; color: inherit; display: block; cursor: pointer; }
        .metric-value { font-size: 2.5rem; font-weight: 800; background: var(--primary-gradient); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; display: block; margin-bottom: 0.5rem; }
        .metric-label { color: var(--text-secondary); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }
        .about-content { background: var(--card-bg); backdrop-filter: blur(20px); border: 1px solid var(--glass-border); border-radius: var(--border-radius); padding: 3rem; }
        .about-text { font-size: 1.1rem; line-height: 1.8; color: var(--text-secondary); margin-bottom: 2rem; }
        .skills-preview { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-top: 2rem; }
        .skill-badge { background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 50px; padding: 0.5rem 1rem; text-align: center; font-size: 0.9rem; font-weight: 500; transition: var(--transition); }
        .skill-badge:hover { background: var(--primary-gradient); color: white; transform: translateY(-2px); }

        /* Skills Section */
        .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; }
        .skill-category { background: var(--card-bg); backdrop-filter: blur(20px); border: 1px solid var(--glass-border); border-radius: var(--border-radius); padding: 2.5rem; transition: var(--transition); position: relative; overflow: hidden; }
        .skill-category::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 3px; background: var(--primary-gradient); }
        .skill-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; }
        .skill-icon { width: 50px; height: 50px; background: var(--primary-gradient); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; }
        .skill-title { font-size: 1.3rem; font-weight: 700; color: var(--text-primary); }
        .skill-list { list-style: none; display: grid; gap: 1rem; }
        .skill-item { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--glass-border); }
        .skill-item:last-child { border-bottom: none; }
        .skill-name { font-weight: 600; color: var(--text-primary); }
        .skill-level { display: flex; align-items: center; gap: 0.5rem; }
        .skill-bar { width: 100px; height: 6px; background: var(--bg-tertiary); border-radius: 3px; position: relative; overflow: hidden; }
        .skill-progress { height: 100%; background: var(--primary-gradient); border-radius: 3px; }

        /* Projects Section */
        .projects { background: var(--bg-secondary); }
        .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 2rem; }
        .project-card { background: var(--card-bg); backdrop-filter: blur(20px); border: 1px solid var(--glass-border); border-radius: var(--border-radius); overflow: hidden; transition: var(--transition); position: relative; }
        .project-card:hover { transform: translateY(-10px); box-shadow: var(--shadow-heavy); }
        .project-header { background: var(--primary-gradient); color: white; padding: 2rem; position: relative; }
        .project-header::after { content: ''; position: absolute; bottom: -10px; left: 0; width: 100%; height: 20px; background: var(--primary-gradient); clip-path: ellipse(100% 100% at 50% 0%); }
        .project-title { font-size: 1.4rem; font-weight: 700; margin-bottom: 0.5rem; }
        .project-tech { font-size: 0.9rem; opacity: 0.9; font-family: 'JetBrains Mono', monospace; }
        .project-content { padding: 2rem; }
        .project-description { color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.6; }
        .project-highlights { list-style: none; margin-bottom: 2rem; }
        .project-highlights li { padding: 0.5rem 0; position: relative; padding-left: 2rem; color: var(--text-secondary); }
        .project-highlights li::before { content: '→'; position: absolute; left: 0; color: transparent; background: var(--primary-gradient); -webkit-background-clip: text; background-clip: text; font-weight: bold; }
        .project-metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 1rem; padding-top: 1.5rem; border-top: 1px solid var(--glass-border); }
        .metric { text-align: center; }
        .metric-number { font-size: 1.3rem; font-weight: 700; color: var(--text-primary); display: block; }
        .metric-text { font-size: 0.8rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px; }

        /* Contact Section */
        .contact { background: var(--bg-primary); position: relative; overflow: hidden; }
        .contact-content { text-align: center; max-width: 800px; margin: 0 auto; position: relative; z-index: 1; }
        .contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin: 3rem 0; }
        .contact-item { background: var(--card-bg); backdrop-filter: blur(20px); border: 1px solid var(--glass-border); border-radius: var(--border-radius); padding: 2rem; text-align: center; transition: var(--transition); }
        .contact-item:hover { transform: translateY(-5px); }
        .contact-item a { text-decoration: none; color: inherit; }
        .contact-icon { width: 60px; height: 60px; background: var(--primary-gradient); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; margin: 0 auto 1rem; }
        .contact-label { font-weight: 600; color: var(--text-primary); margin-bottom: 0.5rem; }
        .contact-value { color: var(--text-secondary); font-size: 0.95rem; }

        /* Animations */
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { opacity: 0; transform: translateY(30px); transition: all 0.6s ease-out; }
        .fade-in.visible { opacity: 1; transform: translateY(0); }

        /* Mobile Menu */
        .mobile-menu-btn { display: none; background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 12px; padding: 0.75rem; cursor: pointer; backdrop-filter: blur(10px); }
        .mobile-menu-btn i { color: var(--text-primary); font-size: 1.2rem; }

        @media (max-width: 768px) {
            .container { padding: 0 1rem; }
            .hero { padding-top: 6rem; }
            .mobile-menu-btn { display: block; }
            .nav-links { position: fixed; top: 0; right: -100%; width: 80%; height: 100vh; background: var(--card-bg); backdrop-filter: blur(20px); border-left: 1px solid var(--glass-border); flex-direction: column; justify-content: center; padding: 2rem; gap: 2rem; transition: var(--transition); }
            .nav-links.active { right: 0; }
            .hero-content { grid-template-columns: 1fr; gap: 2rem; text-align: center; }
            .hero-text h1 { font-size: clamp(2.5rem, 10vw, 3.5rem); }
            .about-grid { grid-template-columns: 1fr; gap: 2rem; }
            .skills-grid, .projects-grid { grid-template-columns: 1fr; }
            .hero-cta, .social-proof { justify-content: center; }
        }

        /* Loading Animation */
        .loading-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: var(--bg-primary); display: flex; align-items: center; justify-content: center; z-index: 9999; opacity: 1; transition: opacity 0.5s ease-out; }
        .loading-overlay.hidden { opacity: 0; pointer-events: none; }
        .loading-spinner { width: 50px; height: 50px; border: 3px solid var(--glass-border); border-top: 3px solid; border-image: var(--primary-gradient) 1; border-radius: 50%; animation: spin 1s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    `}</style>
);

// --- Custom Hooks ---
const useIntersectionObserver = (options) => {
    const [entry, setEntry] = useState(null);
    const [node, setNode] = useState(null);
    const observer = useRef(null);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new window.IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.current.unobserve(entry.target);
            }
        }, options);

        const { current: currentObserver } = observer;
        if (node) currentObserver.observe(node);

        return () => currentObserver.disconnect();
    }, [node, options]);

    return [setNode];
};


// --- Main Components ---

const LoadingScreen = () => {
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 500);
        return () => clearTimeout(timer);
    }, []);
    
    return (
        <div className={`loading-overlay ${!visible ? 'hidden' : ''}`}>
            <div className="loading-spinner"></div>
        </div>
    );
};

const Header = () => {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);
    
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 100);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
    const toggleMenu = () => setIsMenuOpen(prev => !prev);
    const closeMenu = () => setIsMenuOpen(false);

    const navLinks = [
        { href: "#home", label: "Home" },
        { href: "#about", label: "About" },
        { href: "#skills", label: "Skills" },
        { href: "#projects", label: "Projects" },
        { href: "#contact", label: "Contact" },
    ];

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="nav-container">
                    <div className="logo">SD.</div>
                    <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                        {navLinks.map(link => (
                            <li key={link.href}><a href={link.href} onClick={closeMenu}>{link.label}</a></li>
                        ))}
                        <li>
                            <div className="theme-toggle" onClick={toggleTheme}>
                                <i className={theme === 'light' ? 'theme-icon fas fa-moon' : 'theme-icon fas fa-sun'}></i>
                            </div>
                        </li>
                    </ul>
                    <button className="mobile-menu-btn" onClick={toggleMenu}>
                        <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>
                </div>
            </div>
        </nav>
    );
};

const Hero = () => {
    const [heroTitle, setHeroTitle] = useState('');
    const fullTitle = "Transforming Data Into Insights";

    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < fullTitle.length) {
                setHeroTitle(prev => prev + fullTitle.charAt(i));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 80);
        return () => clearInterval(typingInterval);
    }, []);
    
    return (
        <section id="home" className="hero">
            <div className="floating-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
            </div>
            <div className="container">
                <div className="hero-content">
                    <div className="hero-text">
                        <div className="eyebrow">Data Analytics Professional</div>
                        <h1 className="text-gradient">{heroTitle}</h1>
                        <p className="subtitle">I architect intelligent data solutions that drive business growth through advanced analytics, database optimization, and compelling visualizations.</p>
                        <div className="hero-cta">
                            <a href="#projects" className="btn btn-primary"><i className="fas fa-rocket"></i>Explore My Work</a>
                            <a href="#contact" className="btn btn-secondary"><i className="fas fa-paper-plane"></i>Let's Connect</a>
                        </div>
                        <div className="social-proof">
                            <a href="https://www.hackerrank.com/profile/sharmisthad914" target="_blank" rel="noopener noreferrer" data-tooltip="View HackerRank Profile">
                                <div className="social-item"><i className="fab fa-hackerrank"></i><span>5★ HackerRank</span></div>
                            </a>
                            <a href="https://leetcode.com/u/sharmisthad914/" target="_blank" rel="noopener noreferrer" data-tooltip="View LeetCode Profile">
                                <div className="social-item"><i className="fas fa-code"></i><span>2★ LeetCode</span></div>
                            </a>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="profile-container">
                            <div className="profile-card">
                                <div className="profile-image">
                                    <img src="profile.png" alt="Sharmistha Das" />
                                </div>
                                <h3>Sharmistha Das</h3>
                                <p>Data Analytics Specialist</p>
                                <div className="profile-stats">
                                    <div className="stat-item"><span className="stat-number">10+</span><span className="stat-label">Projects</span></div>
                                    <div className="stat-item"><span className="stat-number">3+</span><span className="stat-label">Databases</span></div>
                                    <div className="stat-item"><span className="stat-number">75%</span><span className="stat-label">Time Saved</span></div>
                                    <div className="stat-item"><span className="stat-number">5</span><span className="stat-label">Tech Stack</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const AnimatedSectionContent = ({ children }) => {
    const [setRef] = useIntersectionObserver({ threshold: 0.1 });
    return <div ref={setRef} className="fade-in">{children}</div>
}

const About = () => (
    <section id="about" className="section about">
        <div className="container">
          <AnimatedSectionContent>
            <div className="section-header">
                <div className="section-eyebrow">Get to know me</div>
                <h2 className="section-title">About Me</h2>
                <p className="section-subtitle">Passionate about turning complex data challenges into elegant solutions</p>
            </div>
            <div className="about-grid">
                <div className="about-stats">
                    <div className="metric-card"><a href="https://www.hackerrank.com/profile/sharmisthad914" target="_blank" rel="noopener noreferrer"><span className="metric-value">5★</span><span className="metric-label">HackerRank</span></a></div>
                    <div className="metric-card"><a href="https://leetcode.com/u/sharmisthad914/" target="_blank" rel="noopener noreferrer"><span className="metric-value">2★</span><span className="metric-label">LeetCode</span></a></div>
                    <div className="metric-card"><span className="metric-value">10K+</span><span className="metric-label">Records Managed</span></div>
                    <div className="metric-card"><span className="metric-value">5+</span><span className="metric-label">Tech Stacks</span></div>
                </div>
                <div className="about-content">
                    <div className="about-text">
                        <p>I'm a results-driven Computer Science Engineering graduate from JIS College of Engineering, Kalyani, specializing in transforming complex datasets into actionable business intelligence. My expertise spans database architecture, advanced analytics, and interactive dashboard development.</p>
                        <p>With proven experience in PostgreSQL, Power BI, and statistical analysis, I've successfully delivered solutions that reduce manual analysis time by 75% while enabling data-driven decision making across organizations.</p>
                    </div>
                    <div className="skills-preview">
                        {['PostgreSQL', 'Power BI', 'Python', 'SQL', 'Analytics', 'ETL/ELT'].map(skill => <div key={skill} className="skill-badge">{skill}</div>)}
                    </div>
                </div>
            </div>
          </AnimatedSectionContent>
        </div>
    </section>
);

const SkillBar = ({ width }) => {
    const [ref, entry] = useIntersectionObserver({ threshold: 0.5 });
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (entry?.isIntersecting) {
            setProgress(width);
        }
    }, [entry, width]);

    return (
        <div ref={ref} className="skill-bar">
            <div className="skill-progress" style={{ width: `${progress}%`, transition: 'width 1s ease-in-out' }}></div>
        </div>
    );
};

const Skills = () => {
    const skillsData = [
        {
            icon: "fa-database", title: "Database Systems",
            skills: [{ name: "PostgreSQL", level: 95 }, { name: "MySQL", level: 85 }, { name: "Database Design", level: 90 }, { name: "Query Optimization", level: 88 }]
        },
        {
            icon: "fa-chart-bar", title: "Business Intelligence",
            skills: [{ name: "Power BI", level: 93 }, { name: "DAX", level: 82 }, { name: "Data Modeling", level: 85 }, { name: "Dashboard Development", level: 90 }]
        },
        {
            icon: "fa-code", title: "Programming & Analytics",
            skills: [{ name: "Python", level: 78 }, { name: "Advanced SQL", level: 95 }, { name: "Statistical Analysis", level: 85 }, { name: "ETL/ELT", level: 88 }]
        },
        {
            icon: "fa-tools", title: "Professional Tools",
            skills: [{ name: "Data Visualization", level: 90 }, { name: "Report Automation", level: 85 }, { name: "Data Warehousing", level: 82 }, { name: "Performance Tuning", level: 88 }]
        },
    ];

    return (
        <section id="skills" className="section skills">
            <div className="container">
                <AnimatedSectionContent>
                    <div className="section-header">
                        <div className="section-eyebrow">Technical Expertise</div>
                        <h2 className="section-title">Skills & Technologies</h2>
                        <p className="section-subtitle">Comprehensive toolkit for modern data challenges</p>
                    </div>
                    <div className="skills-grid">
                        {skillsData.map(category => (
                            <div key={category.title} className="skill-category">
                                <div className="skill-header">
                                    <div className="skill-icon"><i className={`fas ${category.icon}`}></i></div>
                                    <div className="skill-title">{category.title}</div>
                                </div>
                                <ul className="skill-list">
                                    {category.skills.map(skill => (
                                        <li key={skill.name} className="skill-item">
                                            <span className="skill-name">{skill.name}</span>
                                            <div className="skill-level"><SkillBar width={skill.level} /></div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </AnimatedSectionContent>
            </div>
        </section>
    );
};

const Projects = () => {
    const projectsData = [
        {
            title: "Sales Performance Analytics Dashboard",
            tech: "Power BI • ETL • Data Visualization",
            description: "Comprehensive sales analytics solution featuring 20+ interactive visualizations and automated reporting processes, transforming raw business data into actionable insights.",
            highlights: [
                "Integrated multiple data sources with complex transformations",
                "Built dynamic dashboards with trend analysis and geographic mapping",
                "Established robust data relationships using DAX"
            ],
            metrics: [{ value: "75%", label: "Time Reduction" }, { value: "20+", label: "Visualizations" }, { value: "5", label: "Data Sources" }]
        },
        {
            title: "Digital Music Store Data Analysis",
            tech: "PostgreSQL • Advanced SQL • Statistics",
            description: "Comprehensive exploratory data analysis on a digital music store database using advanced SQL techniques to uncover business insights.",
            highlights: [
                "Solved 10+ complex analytical problems using advanced SQL",
                "Applied subqueries, CTEs, and window functions for deep insights",
                "Identified customer purchasing patterns and seasonal trends"
            ],
            metrics: [{ value: "10+", label: "SQL Queries" }, { value: "30+", label: "Insights" }, { value: "100%", label: "Accuracy" }]
        },
        {
            title: "Student Attendance Management System",
            tech: "PostgreSQL • Database Design • Application",
            description: "Robust PostgreSQL database application for academic attendance tracking with comprehensive data management and real-time reporting capabilities.",
            highlights: [
                "Created normalized PostgreSQL schema with relational integrity",
                "Wrote optimized SQL queries with JOIN clauses for reports",
                "Designed time-based reporting with flexible date range filtering"
            ],
            metrics: [{ value: "10K+", label: "Records" }, { value: "95%", label: "Performance" }, { value: "100%", label: "Uptime" }]
        },
    ];

    return (
        <section id="projects" className="section projects">
            <div className="container">
                <AnimatedSectionContent>
                    <div className="section-header">
                        <div className="section-eyebrow">Portfolio</div>
                        <h2 className="section-title">Featured Projects</h2>
                        <p className="section-subtitle">Real-world solutions that drive business impact</p>
                    </div>
                    <div className="projects-grid">
                        {projectsData.map(project => (
                            <div key={project.title} className="project-card">
                                <div className="project-header">
                                    <div className="project-title">{project.title}</div>
                                    <div className="project-tech">{project.tech}</div>
                                </div>
                                <div className="project-content">
                                    <p className="project-description">{project.description}</p>
                                    <ul className="project-highlights">
                                        {project.highlights.map(item => <li key={item}>{item}</li>)}
                                    </ul>
                                    <div className="project-metrics">
                                        {project.metrics.map(metric => (
                                            <div key={metric.label} className="metric">
                                                <span className="metric-number">{metric.value}</span>
                                                <span className="metric-text">{metric.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </AnimatedSectionContent>
            </div>
        </section>
    );
};

const Contact = () => (
    <section id="contact" className="section contact">
        <div className="container">
            <AnimatedSectionContent>
                <div className="section-header">
                    <div className="section-eyebrow">Let's Connect</div>
                    <h2 className="section-title">Ready to Collaborate?</h2>
                    <p className="section-subtitle">Transform your data challenges into growth opportunities. Let's discuss how I can help your organization unlock the power of analytics.</p>
                </div>
                <div className="contact-content">
                    <div className="contact-grid">
                        <div className="contact-item"><a href="https://www.linkedin.com/in/sharmi-d/" target="_blank" rel="noopener noreferrer"><div className="contact-icon"><i className="fab fa-linkedin"></i></div><div className="contact-label">LinkedIn</div><div className="contact-value">/in/sharmi-d</div></a></div>
                        <div className="contact-item"><a href="tel:+919749862064"><div className="contact-icon"><i className="fas fa-phone"></i></div><div className="contact-label">Phone</div><div className="contact-value">+91 9749862064</div></a></div>
                        <div className="contact-item"><a href="mailto:sharmi.das2711@gmail.com"><div className="contact-icon"><i className="fas fa-envelope"></i></div><div className="contact-label">Email</div><div className="contact-value">sharmi.das2711@gmail.com</div></a></div>
                        <div className="contact-item"><div className="contact-icon"><i className="fas fa-map-marker-alt"></i></div><div className="contact-label">Location</div><div className="contact-value">West Bengal, India</div></div>
                    </div>
                    <div className="hero-cta" style={{ justifyContent: 'center' }}>
                        <a href="mailto:sharmi.das2711@gmail.com" className="btn btn-primary"><i className="fas fa-paper-plane"></i>Send Message</a>
                        <a href="Sharmistha_resume.pdf" download className="btn btn-secondary"><i className="fas fa-download"></i>Download Resume</a>
                    </div>
                </div>
            </AnimatedSectionContent>
        </div>
    </section>
);

export default function App() {
  return (
    <>
      <GlobalStyles />
      <LoadingScreen />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
}


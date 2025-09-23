import React, { useState, useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// --- This component injects all necessary CSS directly into the page ---
const GlobalStyles = () => (
    <style>{`
        :root {
            --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
            --primary-gradient-static: #667eea;
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
        
        /* Custom Carousel Styles */
        .carousel-container {
            position: relative;
            max-width: 600px;
            margin: 0 auto;
        }
        .skills-carousel-container {
             max-width: 500px;
        }
        .carousel-wrapper {
            overflow: hidden;
            position: relative;
            min-height: 550px; /* Adjust as needed */
        }
        .project-carousel-wrapper {
             min-height: 650px;
        }
        .carousel-slide {
            width: 100%;
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
            position: absolute;
            top: 0;
            left: 0;
        }
        .carousel-slide.active {
            opacity: 1;
            position: relative;
        }
        .carousel-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-70%);
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: var(--card-bg);
            border: 1px solid var(--glass-border);
            color: var(--text-primary);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
            transition: var(--transition);
        }
        .carousel-nav:hover {
            color: var(--primary-gradient-static);
            background: var(--glass-bg);
        }
        .carousel-prev { left: -60px; }
        .carousel-next { right: -60px; }
        .carousel-pagination {
            position: absolute;
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 8px;
        }
        .pagination-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: var(--text-secondary);
            cursor: pointer;
            transition: var(--transition);
        }
        .pagination-dot.active {
            background: var(--primary-gradient-static);
            transform: scale(1.2);
        }
        @media (max-width: 768px) {
            .carousel-nav { display: none; }
        }


        /* ENHANCED STYLES */
        .btn {
            padding: 1rem 2rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.95rem;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: var(--transition);
            position: relative;
            overflow: hidden;
            border: none;
            cursor: pointer;
            background-size: 200% auto;
        }

        .btn:hover {
            transform: translateY(-3px);
            background-position: right center;
        }
        
        .btn-primary {
             background-image: var(--primary-gradient);
             color: white;
             box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
        }
        .btn-primary:hover {
             box-shadow: 0 12px 40px rgba(102, 126, 234, 0.6);
        }
        
        .btn-secondary { 
            background-color: #eef2ff; 
            color: #4338ca; 
            border: 1px solid transparent; 
        }
        .btn-secondary:hover { 
            background-color: #e0e7ff; 
        }

        [data-theme="dark"] .btn-secondary { 
            background: var(--glass-bg); 
            color: var(--text-primary); 
            border: 1px solid var(--glass-border); 
            backdrop-filter: blur(10px); 
        }
        [data-theme="dark"] .btn-secondary:hover { 
            background: var(--glass-border); 
        }
        
        .btn i {
             transition: var(--transition);
        }
        [data-theme="dark"] .btn-secondary i {
            color: var(--text-primary);
        }
        .btn-secondary i {
            color: #4338ca;
        }


        .neo-card {
            background: var(--card-bg);
            backdrop-filter: blur(20px);
            border-radius: var(--border-radius);
            border: 1px solid var(--glass-border);
            box-shadow: var(--shadow-medium);
            transition: var(--transition);
            position: relative;
            overflow: hidden;
            height: 100%;
            width: 100%;
        }

        .neo-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-heavy);
            border-color: rgba(102, 126, 234, 0.5);
        }
        
        .skill-icon {
             background: var(--primary-gradient);
             background-size: 200% 200%;
             animation: gradient-animation 4s ease infinite;
        }
        
        @keyframes gradient-animation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
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
            cursor: pointer;
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
        .section { padding: 6rem 0; position: relative; scroll-margin-top: 80px; }
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
        .skill-category { background: var(--card-bg); backdrop-filter: blur(20px); border: 1px solid var(--glass-border); border-radius: var(--border-radius); padding: 2.5rem; transition: var(--transition); position: relative; overflow: hidden; }
        .skill-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
        .skill-icon { width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; }
        .skill-title { font-size: 1.3rem; font-weight: 700; color: var(--text-primary); }
       
        /* Projects Section */
        .projects { background: var(--bg-secondary); }
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
        .metric { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
        .metric i { font-size: 1.2rem; color: var(--text-primary); }
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
        
        /* Footer */
        .footer {
            padding: 2rem 0;
            text-align: center;
            color: var(--text-secondary);
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.9rem;
            border-top: 1px solid var(--glass-border);
            margin-top: 2rem;
        }

        /* Animations */
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { opacity: 0; transform: translateY(30px); transition: all 0.6s ease-out; }
        .fade-in.visible { opacity: 1; transform: translateY(0); }

        /* Mobile Menu */
        .mobile-menu-btn { display: none; background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 12px; padding: 0.75rem; cursor: pointer; backdrop-filter: blur(10px); z-index: 1001;}
        .mobile-menu-btn i { color: var(--text-primary); font-size: 1.2rem; }

        @media (max-width: 992px) {
            .about-grid { grid-template-columns: 1fr; }
            .hero-content { grid-template-columns: 1fr; text-align: center; }
            .hero-cta, .social-proof { justify-content: center; }
        }

        @media (max-width: 768px) {
            .container { padding: 0 1rem; }
            .section { padding: 4rem 0; }
            .hero { padding-top: 6rem; }
            .mobile-menu-btn { display: block; }
            .nav-links { position: fixed; top: 0; right: -100%; width: 80%; max-width: 300px; height: 100vh; background: var(--card-bg); backdrop-filter: blur(20px); border-left: 1px solid var(--glass-border); flex-direction: column; justify-content: center; padding: 2rem; gap: 2rem; transition: var(--transition); }
            .nav-links.active { right: 0; }
            .hero-text h1 { font-size: clamp(2.5rem, 10vw, 3.5rem); }
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
    const observer = useRef(null);
    const attachRef = (node) => {
        if (observer.current) observer.current.disconnect();
        observer.current = new window.IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.current.unobserve(entry.target);
            }
        }, options);
        if (node) observer.current.observe(node);
    };
    return [attachRef];
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

const Header = ({ data, theme, onThemeToggle }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 100);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const handleSmoothScroll = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
             targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setIsMenuOpen(false);
    };

    const navLinks = [
        { to: "home", label: "Home" },
        { to: "about", label: "About" },
        { to: "skills", label: "Skills" },
        { to: "projects", label: "Projects" },
        { to: "contact", label: "Contact" },
    ];

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="nav-container">
                    <div className="logo">{data.logo}</div>
                    <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                        {navLinks.map(link => (
                            <li key={link.to}>
                                <a href={`#${link.to}`} onClick={handleSmoothScroll}>{link.label}</a>
                            </li>
                        ))}
                        <li>
                            <div className="theme-toggle" onClick={onThemeToggle}>
                                <i className={theme === 'light' ? 'theme-icon fas fa-moon' : 'theme-icon fas fa-sun'}></i>
                            </div>
                        </li>
                    </ul>
                    <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>
                </div>
            </div>
        </nav>
    );
};

const Hero = ({ data, personalInfo }) => {
    const [heroTitle, setHeroTitle] = useState('');
    const fullTitle = data.headline;

    useEffect(() => {
        if (!fullTitle) return;
        let i = 0;
        setHeroTitle(''); 
        const typingInterval = setInterval(() => {
            if (i <= fullTitle.length) {
                setHeroTitle(fullTitle.substring(0, i));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 80);
        return () => clearInterval(typingInterval);
    }, [fullTitle]);
    
    const handleSmoothScroll = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
             targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    
    return (
        <section id="home" className="section hero">
            <div className="floating-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
            </div>
            <div className="container">
                <div className="hero-content">
                    <div className="hero-text">
                        <div className="eyebrow">{data.eyebrow}</div>
                        <h1 className="text-gradient">{heroTitle}</h1>
                        <p className="subtitle">{data.subtitle}</p>
                        <div className="hero-cta">
                            <a href="#projects" onClick={handleSmoothScroll} className="btn btn-primary"><i className={data.cta1.icon}></i>{data.cta1.text}</a>
                            <a href="#contact" onClick={handleSmoothScroll} className="btn btn-secondary"><i className={data.cta2.icon}></i>{data.cta2.text}</a>
                        </div>
                        <div className="social-proof">
                            {data.socialProof.map(item => (
                                <a key={item.platform} href={item.link} target="_blank" rel="noopener noreferrer" data-tooltip={`View ${item.platform} Profile`}>
                                    <div className="social-item"><i className={item.icon}></i><span>{item.text}</span></div>
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="profile-container">
                            <div className="profile-card">
                                <div className="profile-image">
                                    <img src={personalInfo.profilePicture} alt={personalInfo.name} />
                                </div>
                                <h3>{personalInfo.name}</h3>
                                <p>{personalInfo.title}</p>
                                <div className="profile-stats">
                                    {data.stats.map(stat => (
                                        <div key={stat.label} className="stat-item">
                                            <span className="stat-number">{stat.value}</span>
                                            <span className="stat-label">{stat.label}</span>
                                        </div>
                                    ))}
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
    const [attachRef] = useIntersectionObserver({ threshold: 0.1 });
    return <div ref={attachRef} className="fade-in">{children}</div>
}

const About = ({ data }) => (
    <section id="about" className="section about">
        <div className="container">
          <AnimatedSectionContent>
            <div className="section-header">
                <div className="section-eyebrow">{data.eyebrow}</div>
                <h2 className="section-title">{data.title}</h2>
                <p className="section-subtitle">{data.subtitle}</p>
            </div>
            <div className="about-grid">
                <div className="about-stats">
                    {data.stats.map(stat => (
                        <div key={stat.label} className="metric-card">
                            {stat.link ? (
                                <a href={stat.link} target="_blank" rel="noopener noreferrer">
                                    <span className="metric-value">{stat.value}</span>
                                    <span className="metric-label">{stat.label}</span>
                                </a>
                            ) : (
                                <>
                                    <span className="metric-value">{stat.value}</span>
                                    <span className="metric-label">{stat.label}</span>
                                </>
                            )}
                        </div>
                    ))}
                </div>
                <div className="about-content">
                    <div className="about-text">
                        {data.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                    <div className="skills-preview">
                        {data.previewSkills.map(skill => <div key={skill} className="skill-badge">{skill}</div>)}
                    </div>
                </div>
            </div>
          </AnimatedSectionContent>
        </div>
    </section>
);

const CustomCarousel = ({ children, containerClass = '' }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const items = React.Children.toArray(children);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? items.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === items.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };
    
    const goToSlide = (index) => {
        setCurrentIndex(index);
    }

    const handleTouchStart = (e) => {
        touchEndX.current = 0; // Reset end position
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current && touchEndX.current) {
            const difference = touchStartX.current - touchEndX.current;
            // Swipe left
            if (difference > 50) {
                goToNext();
            }
            // Swipe right
            if (difference < -50) {
                goToPrevious();
            }
        }
    };


    return (
        <div className={`carousel-container ${containerClass}`}>
            <div 
                className="carousel-wrapper project-carousel-wrapper"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                 {items.map((child, index) => (
                    <div key={index} className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}>
                       {child}
                    </div>
                ))}
            </div>
            <button onClick={goToPrevious} className="carousel-nav carousel-prev"><i className="fas fa-chevron-left"></i></button>
            <button onClick={goToNext} className="carousel-nav carousel-next"><i className="fas fa-chevron-right"></i></button>
            <div className="carousel-pagination">
                {items.map((_, index) => (
                    <div key={index} className={`pagination-dot ${index === currentIndex ? 'active' : ''}`} onClick={() => goToSlide(index)}></div>
                ))}
            </div>
        </div>
    );
};


const Skills = ({ data, theme }) => {
    const [attachRef] = useIntersectionObserver({ threshold: 0.2 });
    
    // Memoize options to prevent re-creation on every render
    const chartOptions = React.useMemo(() => ({
        scales: {
            r: {
                angleLines: { color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
                grid: { color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
                pointLabels: {
                    color: theme === 'dark' ? '#ccc' : '#333',
                    font: {
                        family: "'Inter', sans-serif",
                        size: 12,
                    },
                },
                ticks: {
                    color: theme === 'dark' ? '#999' : '#666',
                    backdropColor: 'transparent',
                    stepSize: 25,
                    max: 100,
                    min: 0
                }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                 callbacks: {
                    label: (context) => {
                       const label = Array.isArray(context.label) ? context.label.join(' ') : context.label;
                       return `${label}: ${context.raw}%`;
                    }
                }
            }
        },
        maintainAspectRatio: false
    }), [theme]);

    return (
        <section id="skills" className="section skills">
            <div className="container" ref={attachRef}>
                <AnimatedSectionContent>
                    <div className="section-header">
                        <div className="section-eyebrow">{data.eyebrow}</div>
                        <h2 className="section-title">{data.title}</h2>
                        <p className="section-subtitle">{data.subtitle}</p>
                    </div>
                     <CustomCarousel containerClass="skills-carousel-container">
                        {data.categories.map(category => (
                            <div key={category.title} className="skill-category neo-card">
                                <div className="skill-header">
                                    <div className="skill-icon"><i className={`fas ${category.icon}`}></i></div>
                                    <div className="skill-title">{category.title}</div>
                                </div>
                                <div style={{ height: '350px' }}>
                                    <Radar 
                                        data={{
                                            labels: category.skills.map(s => s.name),
                                            datasets: [{
                                                label: 'Proficiency',
                                                data: category.skills.map(s => s.level),
                                                backgroundColor: 'rgba(118, 75, 162, 0.2)',
                                                borderColor: 'rgba(102, 126, 234, 1)',
                                                borderWidth: 2,
                                            }]
                                        }} 
                                        options={chartOptions} 
                                    />
                                </div>
                            </div>
                        ))}
                    </CustomCarousel>
                </AnimatedSectionContent>
            </div>
        </section>
    );
};

const Projects = ({ data }) => (
    <section id="projects" className="section projects">
        <div className="container">
            <AnimatedSectionContent>
                <div className="section-header">
                    <div className="section-eyebrow">{data.eyebrow}</div>
                    <h2 className="section-title">{data.title}</h2>
                    <p className="section-subtitle">{data.subtitle}</p>
                </div>
                <CustomCarousel>
                    {data.items.map(project => (
                        <div key={project.title} className="project-card neo-card">
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
                                            <i className={metric.icon}></i>
                                            <span className="metric-number">{metric.value}</span>
                                            <span className="metric-text">{metric.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </CustomCarousel>
            </AnimatedSectionContent>
        </div>
    </section>
);

const Contact = ({ data }) => (
    <section id="contact" className="section contact">
        <div className="container">
            <AnimatedSectionContent>
                <div className="section-header">
                    <div className="section-eyebrow">{data.eyebrow}</div>
                    <h2 className="section-title">{data.title}</h2>
                    <p className="section-subtitle">{data.subtitle}</p>
                </div>
                <div className="contact-content">
                    <div className="contact-grid">
                        {data.items.map(item => (
                            <div key={item.label} className="contact-item neo-card">
                                <a href={item.link} target="_blank" rel="noopener noreferrer">
                                    <div className="contact-icon"><i className={item.icon}></i></div>
                                    <div className="contact-label">{item.label}</div>
                                    <div className="contact-value">{item.value}</div>
                                </a>
                            </div>
                        ))}
                    </div>
                    <div className="hero-cta" style={{ justifyContent: 'center' }}>
                        <a href="mailto:sharmi.das2711@gmail.com" className="btn btn-primary"><i className="fas fa-paper-plane"></i>Send Message</a>
                        <a href="Sharmistha_resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-secondary"><i className="fas fa-download"></i>View Resume</a>
                    </div>
                </div>
            </AnimatedSectionContent>
        </div>
    </section>
);

const Footer = ({ data }) => (
    <footer className="footer">
        <p>{data.text}</p>
    </footer>
);

export default function App() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
      document.body.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  useEffect(() => {
      fetch('./data.json')
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => setPortfolioData(data))
          .catch(error => console.error("Failed to fetch portfolio data:", error));
  }, []);

  if (!portfolioData) {
    return <LoadingScreen />;
  }

  return (
    <>
      <GlobalStyles />
      <Header data={portfolioData.personalInfo} theme={theme} onThemeToggle={toggleTheme} />
      <main>
        <Hero data={portfolioData.hero} personalInfo={portfolioData.personalInfo} />
        <About data={portfolioData.about} />
        <Skills data={portfolioData.skills} theme={theme} />
        <Projects data={portfolioData.projects} />
        <Contact data={portfolioData.contact} />
      </main>
      <Footer data={portfolioData.footer} />
    </>
  );
}


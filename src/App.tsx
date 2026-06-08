/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  X, 
  Check, 
  MapPin, 
  Calendar, 
  Home, 
  Ruler, 
  User, 
  Mail, 
  Menu, 
  Compass, 
  ChevronRight, 
  ExternalLink,
  Users
} from 'lucide-react';
import { PROJECTS, SERVICES } from './data';
import { Project, ServiceDetail } from './types';

export default function App() {
  // Navigation & Interactive UI settings
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeService, setActiveService] = useState<ServiceDetail | null>(null);
  const [isProjectPlannerOpen, setIsProjectPlannerOpen] = useState(false);
  const [plannerStep, setPlannerStep] = useState(0);
  const [plannerData, setPlannerData] = useState({
    serviceType: 'architecture',
    budget: '500k-1M',
    scale: '150-300',
    style: 'Béton contemporain & Verre',
    name: '',
    email: '',
    message: ''
  });

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNavSection, setActiveNavSection] = useState('hero');

  // Contact status message simulation
  const [plannerSubmitted, setPlannerSubmitted] = useState(false);

  // Monitor scroll height to highlights links optionally
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      if (scrollPos < 500) {
        setActiveNavSection('hero');
      } else if (scrollPos < 1200) {
        setActiveNavSection('services');
      } else {
        setActiveNavSection('projets');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim().includes('@')) {
      setNewsletterSuccess(true);
      setTimeout(() => {
        setNewsletterSuccess(false);
        setNewsletterEmail('');
      }, 5000);
    }
  };

  const handlePlannerNext = () => {
    if (plannerStep < 3) {
      setPlannerStep(plannerStep + 1);
    } else {
      setPlannerSubmitted(true);
      setTimeout(() => {
        setIsProjectPlannerOpen(false);
        setPlannerStep(0);
        setPlannerSubmitted(false);
        setPlannerData({
          serviceType: 'architecture',
          budget: '500k-1M',
          scale: '150-300',
          style: 'Béton contemporain & Verre',
          name: '',
          email: '',
          message: ''
        });
      }, 5000);
    }
  };

  const handlePlannerBack = () => {
    if (plannerStep > 0) {
      setPlannerStep(plannerStep - 1);
    }
  };

  const selectProjectById = (id: string) => {
    const found = PROJECTS.find(p => p.id === id);
    if (found) {
      setActiveProject(found);
    }
  };

  return (
    <div id="app_root" className="min-h-screen relative font-sans text-[#f7ebe1] selection:bg-[#bb4e11] selection:text-[#fbf7f4] noise-overlay bg-[#0a1017]">
      
      {/* HEADER / NAVIGATION */}
      <header id="app_header" className="absolute top-0 left-0 w-full z-40 bg-gradient-to-b from-black/60 to-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
          
          {/* LOGO */}
          <a href="#" id="brand_logo" className="flex flex-col select-none group focus:outline-none">
            <span className="font-display font-medium text-2xl tracking-[0.25em] text-white transition-colors duration-400 group-hover:text-[#bb4e11]">
              STRIKE
            </span>
            <span className="font-display font-light text-[0.6rem] tracking-[0.55em] text-gray-400 -mt-1 group-hover:text-gray-300 uppercase">
              STUDIO
            </span>
          </a>

          {/* DESKTOP MENU */}
          <nav id="desktop_nav" className="hidden md:flex items-center space-x-10 lg:space-x-12">
            <a 
              href="#projets_section" 
              className={`font-display text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:text-white ${activeNavSection === 'projets' ? 'text-[#bb4e11]' : 'text-gray-300'}`}
            >
              Projets
            </a>
            <a 
              href="#services_section" 
              className={`font-display text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:text-white ${activeNavSection === 'services' ? 'text-[#bb4e11]' : 'text-gray-300'}`}
            >
              Services
            </a>
            <a 
              href="#about_anchor" 
              onClick={() => {
                setActiveService({
                  id: 'about',
                  title: 'STRIKE STUDIO À PROPOS',
                  tagline: 'Ancrés dans le contexte. Tournés vers l\'avenir.',
                  description: 'Strike Studio est une agence d\'architecture pluridisciplinaire fondée sur la conviction que l\'excellence spatiale nait du respect de la matière brute, de la précision géométrique, et de l\'intégration environnementale.',
                  methodology: [
                    'Sincérité constructive',
                    'Faisabilité foncière et performance passive',
                    'Accompagnement humain complet',
                    'Recherche constante d\'avant-garde architecturale'
                  ],
                  materials: [
                    'Béton matricé',
                    'Bois massif local certifié',
                    'Pisé à forte inertie thermique',
                    'Laiton patiné artisanalement'
                  ]
                });
              }}
              className="font-display text-xs tracking-[0.2em] uppercase text-gray-300 transition-all duration-300 hover:text-white cursor-pointer"
            >
              À Propos
            </a>
            <a 
              href="#newsletter_block" 
              className="font-display text-xs tracking-[0.2em] uppercase text-gray-300 transition-all duration-300 hover:text-white"
            >
              Journal
            </a>
            <a 
              href="#footer"
              className="font-display text-xs tracking-[0.2em] uppercase text-gray-300 transition-all duration-300 hover:text-white"
            >
              Contact
            </a>
          </nav>

          {/* RIGHT ACTION */}
          <div className="hidden md:block">
            <button 
              id="cta_start_project"
              onClick={() => setIsProjectPlannerOpen(true)}
              className="font-display text-[11px] font-medium tracking-[0.18em] text-white bg-[#bb4e11] hover:bg-[#973a06] transition-all duration-300 px-6 py-3 border border-[#bb4e11] active:scale-97 select-none uppercase"
            >
              Démarrer un projet
            </button>
          </div>

          {/* MOBILE NAV TOGGLE */}
          <button 
            id="mobile_menu_button"
            onClick={() => setMobileMenuOpen(true)}
            src-id="btn-menu"
            className="md:hidden text-white p-2 hover:text-[#bb4e11] transition-colors focus:outline-none"
            aria-label="Open navigation menu"
          >
            <Menu size={24} />
          </button>

        </div>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            id="mobile_drawer_overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/95 z-50 flex justify-end"
          >
            <motion.div 
              id="mobile_drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-[#0d141e] h-full p-8 flex flex-col justify-between border-l border-white/5"
            >
              <div>
                <div className="flex justify-between items-center mb-12">
                  <div className="flex flex-col">
                    <span className="font-display font-medium text-xl tracking-[0.25em] text-white">STRIKE</span>
                    <span className="font-display font-light text-[0.55rem] tracking-[0.55em] text-gray-400 -mt-1 uppercase">STUDIO</span>
                  </div>
                  <button 
                    id="close_mobile_drawer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-gray-400 hover:text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

                <nav id="mobile_nav_links" className="flex flex-col space-y-6">
                  <a 
                    href="#projets_section" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-display text-lg tracking-widest text-gray-300 hover:text-white uppercase transition-all"
                  >
                    Projets
                  </a>
                  <a 
                    href="#services_section" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-display text-lg tracking-widest text-gray-300 hover:text-white uppercase transition-all"
                  >
                    Services
                  </a>
                  <a 
                    href="#" 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setActiveService({
                        id: 'about',
                        title: 'À PROPOS',
                        tagline: 'Ancrés dans le contexte. Tournés vers l\'avenir.',
                        description: 'Strike Studio est une agence d\'architecture pluridisciplinaire fondée sur la conviction que l\'excellence spatiale nait du respect de la matière brute, de la précision géométrique, et de l\'intégration environnementale.',
                        methodology: [
                          'Sincérité constructive',
                          'Faisabilité foncière et performance passive',
                          'Accompagnement humain complet',
                          'Recherche constante d\'avant-garde architecturale'
                        ],
                        materials: [
                          'Béton matricé',
                          'Bois massif local certifié',
                          'Pisé à forte inertie thermique',
                          'Laiton patiné artisanalement'
                        ]
                      });
                    }}
                    className="font-display text-lg tracking-widest text-gray-300 hover:text-white uppercase transition-all"
                  >
                    À Propos
                  </a>
                  <a 
                    href="#newsletter_block" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-display text-lg tracking-widest text-gray-300 hover:text-white uppercase transition-all"
                  >
                    Journal
                  </a>
                  <a 
                    href="#footer" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-display text-lg tracking-widest text-gray-300 hover:text-white uppercase transition-all"
                  >
                    Contact
                  </a>
                </nav>
              </div>

              <div className="space-y-6">
                <button 
                  id="mobile_cta_start_project"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsProjectPlannerOpen(true);
                  }}
                  className="w-full text-center font-display text-xs tracking-widest text-white bg-[#bb4e11] hover:bg-[#973a06] transition-all duration-300 py-4 uppercase block font-medium"
                >
                  Démarrer un projet
                </button>
                <p className="text-gray-500 text-xs tracking-wider text-center font-mono">
                  © 2026 STRIKE STUDIO
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section 
        id="hero_section" 
        className="min-h-screen relative overflow-hidden flex flex-col justify-end pb-20 md:pb-28 pt-40 px-6 md:px-12"
      >
        {/* Sky Background Image with Custom Painterly Dark Gradient overlay */}
        <div id="hero_bg" className="absolute inset-0 z-0">
          <img 
            src="/src/assets/images/strike_hero_skyline_1780916340282.png" 
            alt="Strike Studio Skyline Painting" 
            className="w-full h-full object-cover object-bottom scale-102 filter brightness-[0.72] contrast-[1.05]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1017] via-[#0a1017]/40 to-black/50 z-10" />
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto w-full z-20 relative px-2 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="max-w-4xl"
          >
            {/* Title */}
            <h1 id="hero_main_title" className="font-display font-medium text-[2.7rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[6.8rem] leading-[0.9] tracking-tight text-white uppercase drop-shadow-sm">
              Architecture<br />
              américaine.<br />
              Vision moderne.
            </h1>

            {/* Subtitle */}
            <p id="hero_subtitle" className="mt-8 font-sans text-[15px] sm:text-[17px] md:text-lg text-gray-300 font-light tracking-wide leading-relaxed max-w-xl">
              Strike Studio conçoit des espaces audacieux et intemporels, ancrés dans le contexte et tournés vers l'avenir.
            </p>

            {/* CTA Button */}
            <div className="mt-8">
              <a 
                href="#projets_section" 
                id="hero_btn_explore"
                className="inline-flex items-center space-x-4 px-6 py-4 bg-[#b44806] hover:bg-[#8d3305] text-white font-display text-xs tracking-[0.2em] transition-all duration-300 font-medium group select-none uppercase"
              >
                <span>Découvrir nos projets</span>
                <ArrowRight size={15} className="transform transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section 
        id="services_section" 
        className="relative z-20"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-1 sm:py-2">
          
          {/* Main Services Container - matching the cream-textured bar perfectly */}
          <div 
            id="services_grid_card"
            className="canvas-texture bg-[#dfd3c3] text-[#1e2a38] p-8 md:p-12 lg:p-14 shadow-2xl relative overflow-hidden"
          >
            {/* Plaster border accents or lines inside */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-6 divide-y md:divide-y-0 lg:divide-x divide-[#c7b9a5]">
              
              {/* SERVICE 1 - ARCHITECTURE */}
              <div 
                id="service_item_architecture"
                onClick={() => setActiveService(SERVICES[0])}
                className="pt-6 md:pt-0 lg:px-6 cursor-pointer group focus:outline-none"
              >
                {/* Custom geometric shape block matching the dark blue/gray overlapping blocks */}
                <div className="h-10 flex items-end mb-8 relative select-none">
                  {/* Left Block */}
                  <div className="w-[18px] h-[34px] bg-[#1a2d3e] z-10 transition-transform duration-300 group-hover:-translate-y-1" />
                  {/* Right Offset Block */}
                  <div className="w-[18px] h-[22px] bg-[#3a5369] ml-1 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
                
                <h3 className="font-display font-medium text-lg tracking-[0.16em] text-[#1e2a38] group-hover:text-[#bb4e11] transition-colors duration-300 uppercase">
                  Architecture
                </h3>
                <p className="mt-4 text-[13.5px] text-[#4d5a69] font-light leading-relaxed tracking-wide">
                  Des bâtiments durables et inspirants, conçus pour leur contexte.
                </p>
                
                <span className="inline-flex items-center text-xs font-display font-medium tracking-widest text-[#bb4e11] mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase">
                  En savoir plus +
                </span>
              </div>

              {/* SERVICE 2 - INTERIOR DESIGN */}
              <div 
                id="service_item_interior"
                onClick={() => setActiveService(SERVICES[1])}
                className="pt-8 md:pt-0 lg:px-6 cursor-pointer group focus:outline-none"
              >
                {/* Custom geometric shape block matching the ocher/orange rotated/nested blocks */}
                <div className="h-10 flex items-end mb-8 relative select-none">
                  {/* L chunk left */}
                  <div className="w-[26px] h-[15px] bg-[#a8742b] z-10 absolute bottom-0 left-0 transition-transform duration-300 group-hover:rotate-6" />
                  {/* L chunk right */}
                  <div className="w-[16px] h-[34px] bg-[#cb9241] ml-6 transition-transform duration-300 group-hover:-translate-y-0.5" />
                </div>

                <h3 className="font-display font-medium text-lg tracking-[0.16em] text-[#1e2a38] group-hover:text-[#bb4e11] transition-colors duration-300 uppercase">
                  Design d'intérieur
                </h3>
                <p className="mt-4 text-[13.5px] text-[#4d5a69] font-light leading-relaxed tracking-wide">
                  Des intérieurs raffinés qui allient matière, lumière et fonction.
                </p>

                <span className="inline-flex items-center text-xs font-display font-medium tracking-widest text-[#bb4e11] mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase">
                  En savoir plus +
                </span>
              </div>

              {/* SERVICE 3 - URBANISM */}
              <div 
                id="service_item_urbanism"
                onClick={() => setActiveService(SERVICES[2])}
                className="pt-8 md:pt-0 lg:px-6 cursor-pointer group focus:outline-none"
              >
                {/* Custom geometric shape block matching urban blue-slate blocks */}
                <div className="h-10 flex items-end mb-8 relative select-none">
                  {/* Main tall flat column */}
                  <div className="w-[18px] h-[36px] bg-[#1c2c36] z-10 transition-transform duration-300 group-hover:-translate-y-1" />
                  {/* Small square right */}
                  <div className="w-[18px] h-[16px] bg-[#3a4d58] ml-1 transition-transform duration-300 group-hover:scale-y-110 origin-bottom" />
                </div>

                <h3 className="font-display font-medium text-lg tracking-[0.16em] text-[#1e2a38] group-hover:text-[#bb4e11] transition-colors duration-300 uppercase">
                  Urbanisme
                </h3>
                <p className="mt-4 text-[13.5px] text-[#4d5a69] font-light leading-relaxed tracking-wide">
                  Des stratégies urbaines responsables pour des villes résilientes.
                </p>

                <span className="inline-flex items-center text-xs font-display font-medium tracking-widest text-[#bb4e11] mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase">
                  En savoir plus +
                </span>
              </div>

              {/* SERVICE 4 - CONSULTING */}
              <div 
                id="service_item_consulting"
                onClick={() => setActiveService(SERVICES[3])}
                className="pt-8 md:pt-0 lg:px-6 cursor-pointer group focus:outline-none"
              >
                {/* Custom geometric shape block matching orange folded document monolith */}
                <div className="h-10 flex items-end mb-8 relative select-none">
                  {/* Angled monolith or overlapping split block */}
                  <div className="w-[18px] h-[34px] bg-[#aa420b] z-10 transition-transform duration-300 group-hover:skew-x-3" />
                  <div className="w-[14px] h-[22px] bg-[#d35f1c] ml-1 transition-transform duration-300 group-hover:-translate-y-0.5" />
                </div>

                <h3 className="font-display font-medium text-lg tracking-[0.16em] text-[#1e2a38] group-hover:text-[#bb4e11] transition-colors duration-300 uppercase">
                  Conseil
                </h3>
                <p className="mt-4 text-[13.5px] text-[#4d5a69] font-light leading-relaxed tracking-wide">
                  Une expertise stratégique pour accompagner vos projets complexes.
                </p>

                <span className="inline-flex items-center text-xs font-display font-medium tracking-widest text-[#bb4e11] mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase">
                  En savoir plus +
                </span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* RECENT PROJECTS / PROJETS RÉCENTS */}
      <section 
        id="projets_section" 
        className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32"
      >
        {/* Header Block with exact alignments */}
        <div id="projets_header" className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-white/10 pb-6">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] text-[#bb4e11] uppercase block mb-2">Portfolio</span>
            <h2 className="font-display font-medium text-2xl sm:text-3xl tracking-[0.15em] text-white uppercase">
              Projets récents
            </h2>
          </div>
          
          <button 
            id="btn_toggle_all_projects"
            onClick={() => setShowAllProjects(!showAllProjects)}
            className="flex items-center space-x-2 text-xs tracking-[0.15em] font-display font-medium text-gray-400 hover:text-[#bb4e11] transiton-colors duration-300 focus:outline-none uppercase mt-4 sm:mt-0"
          >
            <span>{showAllProjects ? 'Masquer les projets supplémentaires' : 'Voir tous les projets'}</span>
            <ArrowRight size={14} className={`transform transition-transform ${showAllProjects ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
          </button>
        </div>

        {/* PROJECTS GRID */}
        <div id="projects_grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          
          {/* Loop over first 3 projects (or 6 if expanded) */}
          {PROJECTS.slice(0, showAllProjects ? 6 : 3).map((proj, idx) => (
            <motion.article 
              key={proj.id}
              id={`project_card_${proj.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setActiveProject(proj)}
              className="group cursor-pointer flex flex-col focus:outline-none"
            >
              {/* Card Image Wrapper */}
              <div className="relative aspect-[4/3] bg-gray-900 overflow-hidden mb-6 border border-white/5">
                <img 
                  src={proj.image} 
                  alt={proj.title} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                {/* Modern subtle quick look anchor */}
                <div className="absolute bottom-4 right-4 bg-black/80 p-2 md:p-3 hover:bg-[#bb4e11] transition-colors rounded-none">
                  <ArrowRight size={16} className="text-white transform transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>

              {/* Title & Location matching the image perfectly */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-display font-semibold text-lg tracking-[0.1em] text-white group-hover:text-[#bb4e11] transition-colors duration-300 uppercase">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-light tracking-wide mt-1">
                    {proj.location}
                  </p>
                </div>
                
                <span className="font-mono text-[11px] text-[#bb4e11] border border-[#bb4e11]/20 px-2.5 py-1 tracking-wider">
                  {proj.year}
                </span>
              </div>
            </motion.article>
          ))}

        </div>

        {/* Additional information block if user wishes for an aesthetic experience */}
        <div className="mt-20 border-t border-white/5 pt-12 grid grid-cols-1 lg:grid-cols-3 gap-12 text-sm text-gray-400 font-light leading-relaxed tracking-wide px-4">
          <div>
            <h4 className="font-display font-medium text-white tracking-widest text-xs uppercase mb-4">Acoustique & Matérialité</h4>
            <p>
              Chaque espace Strike Studio est sculpté en recherchant une harmonie tactile entre bois brut brossé, béton brut de décoffrage et chaux naturelle vibrante.
            </p>
          </div>
          <div>
            <h4 className="font-display font-medium text-white tracking-widest text-xs uppercase mb-4">Construction Passive</h4>
            <p>
              Le climat dicte l'épaisseur de nos murs et l'inclinaison de nos structures. L'autonomie thermique est au cœur dès la première esquisse conceptuelle.
            </p>
          </div>
          <div>
            <h4 className="font-display font-medium text-white tracking-widest text-xs uppercase mb-4">Ingénierie Structurelle</h4>
            <p>
              Par des collaborations étroites avec d'éminents ingénieurs, nos ouvrages repoussent subtilement la gravité par des porte-à-faux calculés au millimètre.
            </p>
          </div>
        </div>

      </section>

      {/* RUST ACCENT STRIP / PLANNER & NEWSLETTER SECTION */}
      <section 
        id="newsletter_section" 
        className="canvas-texture bg-[#772703] text-[#f7ebe1] relative z-20 py-20 px-6 md:px-12 overflow-hidden border-t border-b border-[#a94109]"
      >
        <div className="absolute inset-0 bg-[#3f0f00]/25 mix-blend-multiply opacity-60 z-0" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10 items-center">
          
          {/* Lead column - Motto/Philosophy statement */}
          <div className="lg:col-span-5 space-y-6">
            <h2 id="motto_title" className="font-display font-medium text-2xl sm:text-3xl lg:text-4xl tracking-[0.12em] leading-tight text-white uppercase">
              Concevoir aujourd'hui<br />
              l'équilibre de demain.
            </h2>
            <div className="w-16 h-[2px] bg-white opacity-40" />
            <p className="text-[14px] sm:text-[15px] opacity-90 font-light leading-relaxed max-w-sm tracking-wide">
              Nous croyons en une architecture sincère, durable et profondément humaine.
            </p>
          </div>

          {/* Center Column - Interactive Newsletter Form */}
          <div id="newsletter_block" className="lg:col-span-4 space-y-6">
            <span className="font-mono text-xs tracking-[0.25em] text-white/80 block uppercase">
              Recevez nos actualités
            </span>
            
            <form onSubmit={handleNewsletterSubmit} className="relative mt-2 border-b border-white/40 pb-2">
              <input 
                id="newsletter_input_email"
                type="email" 
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Votre email" 
                className="w-full bg-transparent border-none text-white placeholder-white/50 text-sm font-light tracking-wide focus:outline-none pr-10 focus:placeholder-white/30"
              />
              <button 
                id="newsletter_submit"
                type="submit" 
                className="absolute right-0 top-1/2 -translate-y-1/2 text-white hover:text-white/80 transition-colors p-1 focus:outline-none"
                aria-label="Submit newsletter subscription"
              >
                <ArrowRight size={18} />
              </button>
            </form>

            {/* Newsletter confirmation notification */}
            <AnimatePresence>
              {newsletterSuccess && (
                <motion.div 
                  id="newsletter_success_msg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-white bg-black/30 p-3 flex items-center space-x-2 border border-white/10"
                >
                  <Check size={14} className="text-white shrink-0" />
                  <span>Merci. Vous êtes désormais inscrit à nos carnets d'atelier.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - Social Links */}
          <div className="lg:col-span-3 lg:pl-8 space-y-6">
            <span className="font-mono text-xs tracking-[0.25em] text-white/80 block uppercase">
              Suivez-nous
            </span>
            <div className="flex flex-col space-y-3 font-display font-medium text-xs tracking-[0.15em] text-white/90">
              <a href="#" className="hover:text-white transition-all transform hover:translate-x-1 duration-200 inline-flex items-center space-x-2">
                <span>INSTAGRAM</span>
              </a>
              <a href="#" className="hover:text-white transition-all transform hover:translate-x-1 duration-200 inline-flex items-center space-x-2">
                <span>LINKEDIN</span>
              </a>
              <a href="#" className="hover:text-white transition-all transform hover:translate-x-1 duration-200 inline-flex items-center space-x-2">
                <span>PINTEREST</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer id="footer" className="bg-[#05090f] text-gray-400 py-16 px-6 md:px-12 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* Logo element identical to the header */}
          <div className="flex flex-col select-none">
            <span className="font-display font-medium text-xl tracking-[0.25em] text-white">
              STRIKE
            </span>
            <span className="font-display font-light text-[0.55rem] tracking-[0.55em] text-gray-500 -mt-1 uppercase">
              STUDIO
            </span>
          </div>

          {/* Centered links */}
          <div id="footer_links" className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 font-display text-[11px] tracking-[0.2em] text-gray-400 uppercase">
            <a 
              onClick={() => {
                setActiveService({
                  id: 'about',
                  title: 'STRIKE STUDIO À PROPOS',
                  tagline: 'Ancrés dans le contexte. Tournés vers l\'avenir.',
                  description: 'Strike Studio est une agence d\'architecture pluridisciplinaire fondée sur la conviction que l\'excellence spatiale nait du respect de la matière brute, de la précision géométrique, et de l\'intégration environnementale.',
                  methodology: [
                    'Sincérité constructive',
                    'Faisabilité foncière et performance passive',
                    'Accompagnement humain complet',
                    'Recherche constante d\'avant-garde architecturale'
                  ],
                  materials: [
                    'Béton matricé',
                    'Bois massif local certifié',
                    'Pisé à forte inertie thermique',
                    'Laiton patiné artisanalement'
                  ]
                });
              }}
              className="hover:text-[#bb4e11] cursor-pointer transition-colors"
            >
              À propos
            </a>
            <a href="#" className="hover:text-[#bb4e11] transition-colors">Carrières</a>
            <a href="#" className="hover:text-[#bb4e11] transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-[#bb4e11] transition-colors">Confidentialité</a>
          </div>

          {/* Copyright representation */}
          <div className="font-mono text-[11px] text-gray-600 tracking-wider">
            © 2026 STRIKE STUDIO
          </div>

        </div>
      </footer>

      {/* --- REUSABLE INTERACTIVE DETAIL DIALOGS / SHARDS --- */}

      {/* 1. PROJECT SPECIFIC DETAIL DRAWER */}
      <AnimatePresence>
        {activeProject && (
          <motion.div 
            id="project_modal_backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
            className="fixed inset-0 z-50 bg-black/95 overflow-y-auto flex justify-end p-0 sm:p-4 md:p-6"
          >
            <motion.div 
              id="project_modal"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl bg-[#0d141e] text-[#f7ebe1] min-h-screen sm:min-h-0 sm:h-fit relative overflow-hidden border-l border-white/10"
            >
              
              {/* Image banner */}
              <div className="relative h-64 sm:h-96 w-full bg-gray-950">
                <img 
                  src={activeProject.image} 
                  alt={activeProject.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d141e] via-transparent to-black/40" />
                
                {/* Close Button top-right */}
                <button 
                  id="close_project_modal"
                  onClick={() => setActiveProject(null)}
                  className="absolute top-6 right-6 bg-black/80 hover:bg-[#bb4e11] text-white p-2.5 transition-colors focus:outline-none"
                  aria-label="Close project details"
                >
                  <X size={20} />
                </button>

                {/* Subtitle location badge */}
                <span className="absolute bottom-6 left-8 bg-[#bb4e11] text-white font-mono text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 font-semibold">
                  {activeProject.location}
                </span>
              </div>

              {/* Main specifications grid */}
              <div className="p-8 sm:p-12 space-y-8">
                <div>
                  <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-widest text-white uppercase">
                    {activeProject.title}
                  </h2>
                  <p className="mt-4 text-[14.5px] text-gray-300 font-light leading-relaxed tracking-wide">
                    {activeProject.description}
                  </p>
                </div>

                {/* Built attributes list */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 bg-[#111925] border border-white/5 p-6 font-mono text-xs">
                  <div className="space-y-1">
                    <span className="text-gray-500 block text-[10px] tracking-widest uppercase">Lieu</span>
                    <span className="text-white text-xs">{activeProject.location}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-gray-500 block text-[10px] tracking-widest uppercase">Échelle</span>
                    <span className="text-white text-xs">{activeProject.area}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-gray-500 block text-[10px] tracking-widest uppercase">Année</span>
                    <span className="text-white text-xs">{activeProject.year}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-gray-500 block text-[10px] tracking-widest uppercase">Maître d’ouvrage</span>
                    <span className="text-white text-xs">{activeProject.client}</span>
                  </div>
                </div>

                {/* Innovations / Highlights bullets */}
                <div className="space-y-4">
                  <h4 className="font-display font-medium text-xs tracking-widest text-[#bb4e11] uppercase">
                    Particularités Techniques
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs tracking-wide text-gray-300">
                    {activeProject.highlights.map((h, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-[#bb4e11]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Simulated Inquiry action block */}
                <div className="border-t border-white/5 pt-8">
                  <h3 className="font-display font-medium text-sm text-white tracking-wider uppercase mb-4">
                    Demander des informations sur cette étude
                  </h3>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => {
                        setPlannerData({
                          ...plannerData,
                          serviceType: activeProject.title.toLowerCase().includes('loft') ? 'interior' : 'architecture',
                          message: `Bonjour Strike Studio, je suis intéressé par des détails constructifs concernant le projet ${activeProject.title}.`
                        });
                        setIsProjectPlannerOpen(true);
                        setActiveProject(null);
                      }}
                      className="flex-1 bg-transparent hover:bg-white/5 text-center text-xs tracking-[0.2em] font-display font-medium text-white border border-white/20 hover:border-white/55 py-3.5 transition-colors uppercase"
                    >
                      Planifier une étude similaire
                    </button>
                    <button 
                      onClick={() => {
                        alert(`Dossier technique de ${activeProject.title} ajouté au panier de téléchargement.`);
                      }}
                      className="bg-[#bb4e11] hover:bg-[#913b0a] text-center text-xs tracking-[0.2em] font-display font-medium text-white py-3.5 px-6 transition-colors uppercase"
                    >
                      Dossier Technique
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. SERVICES SPECIFIC METHODOLOGY DRAWER */}
      <AnimatePresence>
        {activeService && (
          <motion.div 
            id="service_modal_backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveService(null)}
            className="fixed inset-0 z-50 bg-black/95 display-flex py-10 px-6 overflow-y-auto flex items-center justify-center"
          >
            <motion.div 
              id="service_modal"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#0e1724] border border-white/10 p-8 sm:p-12 relative"
            >
              {/* Close Button top-right */}
              <button 
                id="close_service_modal"
                onClick={() => setActiveService(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors focus:outline-none"
                aria-label="Close service info"
              >
                <X size={20} />
              </button>

              <span className="font-mono text-[10px] tracking-[0.3em] text-[#bb4e11] block mb-2 uppercase">
                Expertise Strike
              </span>
              <h2 className="font-display font-medium text-2xl sm:text-3xl tracking-widest text-white uppercase mb-4">
                {activeService.title}
              </h2>
              <p className="text-[#bb4e11] font-mono text-xs italic mb-6">
                "{activeService.tagline}"
              </p>

              <div className="space-y-6 text-sm text-gray-300 font-light leading-relaxed tracking-wide">
                <p>{activeService.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                  {/* Methodology step by step list */}
                  <div>
                    <h4 className="font-display font-semibold text-[11px] tracking-widest text-white uppercase mb-3 text-white/90">
                      Méthodologie d'Atelier
                    </h4>
                    <ul className="space-y-2 text-xs text-gray-400">
                      {activeService.methodology.map((m, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-[#bb4e11] font-mono shrink-0 select-none">0{idx + 1}.</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Materials palette */}
                  <div>
                    <h4 className="font-display font-semibold text-[11px] tracking-widest text-white uppercase mb-3 text-white/90">
                      Palette Matérielle Favorisée
                    </h4>
                    <ul className="space-y-2 text-xs text-gray-400">
                      {activeService.materials.map((mat, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-none bg-[#bb4e11] shrink-0" />
                          <span>{mat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-xs text-gray-500 font-mono">
                  Certifications écologiques incluses d'office.
                </span>
                <button 
                  onClick={() => {
                    setPlannerData({
                      ...plannerData,
                      serviceType: activeService.id
                    });
                    setIsProjectPlannerOpen(true);
                    setActiveService(null);
                  }}
                  className="bg-[#bb4e11] hover:bg-[#913b0a] font-display text-[10px] hover:text-white tracking-widest text-white py-3 px-6 uppercase focus:outline-none"
                >
                  Démarrer une étude
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. MULTI-STEP PROJECT DESIGN PLANNER / WIZARD DIALOG */}
      <AnimatePresence>
        {isProjectPlannerOpen && (
          <motion.div 
            id="planner_backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsProjectPlannerOpen(false)}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div 
              id="planner_modal"
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-[#0c131c] border border-white/10 p-8 sm:p-12 relative"
            >
              
              {/* Close Button */}
              <button 
                id="close_planner"
                onClick={() => setIsProjectPlannerOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors focus:outline-none"
              >
                <X size={20} />
              </button>

              {/* Progress Bar indicating steps */}
              <div id="planner_progress" className="w-full bg-[#16212e] h-1.5 mb-8">
                <div 
                  className="bg-[#bb4e11] h-1.5 transition-all duration-300"
                  style={{ width: `${(plannerStep + 1) * 25}%` }}
                />
              </div>

              {/* Steps render */}
              {plannerSubmitted ? (
                <div id="planner_submitted_screen" className="text-center py-8 space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4 rounded-full">
                    <Check size={24} />
                  </div>
                  <h3 className="font-display font-medium text-xl text-white tracking-widest uppercase">
                    BRIEF ENREGISTRÉ
                  </h3>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                    Merci {plannerData.name || 'cher visiteur'}. L'atelier étudie votre proposition d'architecture. Un architecte conseil va vous recontacter par email ({plannerData.email || 'indiqué'}) sous 48h.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  
                  {/* Step Title Header */}
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] tracking-widest text-[#bb4e11] uppercase block">
                      ÉTAPE {plannerStep + 1} SUR 4
                    </span>
                    <h3 className="font-display font-medium text-lg sm:text-xl text-white tracking-widest uppercase">
                      {plannerStep === 0 && "Choisir l'expertise requise"}
                      {plannerStep === 1 && "Dimensions & Budget prévisionnel"}
                      {plannerStep === 2 && "Parti pris esthétique"}
                      {plannerStep === 3 && "Vos coordonnées familiales / professionnelles"}
                    </h3>
                  </div>

                  {/* Step Content 0: Service options */}
                  {plannerStep === 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {SERVICES.map((s) => (
                        <button 
                          key={s.id}
                          onClick={() => setPlannerData({ ...plannerData, serviceType: s.id })}
                          className={`p-4 border text-left flex flex-col justify-between h-28 hover:bg-[#121c27] transition-all duration-200 ${plannerData.serviceType === s.id ? 'border-[#bb4e11] bg-[#111923]' : 'border-white/10'}`}
                        >
                          <span className="font-display text-xs tracking-wider text-white uppercase">{s.title}</span>
                          <span className="text-[11px] text-gray-400 font-light leading-snug tracking-wide">{s.tagline}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Step Content 1: Budget and Dimensions */}
                  {plannerStep === 1 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs tracking-widest text-gray-400 uppercase font-mono block">Enveloppe budgétaire indicative</label>
                        <div className="grid grid-cols-2 gap-3">
                          {['200k - 500k €', '500k - 1M €', '1M - 2.5M €', 'Plus de 2.5M €'].map((val) => (
                            <button 
                              key={val}
                              onClick={() => setPlannerData({ ...plannerData, budget: val })}
                              className={`p-3 border text-center text-xs tracking-wider font-mono ${plannerData.budget === val ? 'border-[#bb4e11] bg-[#111923]' : 'border-white/10'}`}
                            >
                              {val}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs tracking-widest text-gray-400 uppercase font-mono block">Surface de plancher souhaitée (m²)</label>
                        <div className="grid grid-cols-3 gap-3">
                          {['Moins de 150', '150 à 300', 'Plus de 300'].map((val) => (
                            <button 
                              key={val}
                              onClick={() => setPlannerData({ ...plannerData, scale: val })}
                              className={`p-3 border text-center text-xs tracking-wider font-mono ${plannerData.scale === val ? 'border-[#bb4e11] bg-[#111923]' : 'border-white/10'}`}
                            >
                              {val} m²
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step Content 2: Aesthetic Party */}
                  {plannerStep === 2 && (
                    <div className="space-y-4">
                      <p className="text-xs text-gray-400 tracking-wide font-light leading-relaxed mb-2">
                        Sur quel parti pris esthétique souhaitez-vous asseoir la conception ?
                      </p>
                      
                      {[
                        'Béton matricé & Grands vitrages', 
                        'Pierre massive porteuse & Matériaux biosourcés', 
                        'Pisé brut à forte inertie thermique', 
                        'Métal modulaire & Structure démontable recyclée'
                      ].map((styleOption) => (
                        <button 
                          key={styleOption}
                          onClick={() => setPlannerData({ ...plannerData, style: styleOption })}
                          className={`w-full p-4 border text-left text-xs tracking-wider font-sans transition-all flex items-center justify-between ${plannerData.style === styleOption ? 'border-[#bb4e11] bg-[#111923]' : 'border-white/10'}`}
                        >
                          <span>{styleOption}</span>
                          {plannerData.style === styleOption && <div className="w-2 h-2 bg-[#bb4e11]" />}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Step Content 3: Personal details */}
                  {plannerStep === 3 && (
                    <form className="space-y-4">
                      <div>
                        <input 
                          id="planner_input_name"
                          type="text" 
                          required
                          value={plannerData.name}
                          onChange={(e) => setPlannerData({ ...plannerData, name: e.target.value })}
                          placeholder="Votre nom complet" 
                          className="w-full bg-[#111a24] border border-white/10 p-3 text-sm text-white placeholder-gray-500 font-light focus:outline-none focus:border-[#bb4e11]"
                        />
                      </div>
                      <div>
                        <input 
                          id="planner_input_email"
                          type="email" 
                          required
                          value={plannerData.email}
                          onChange={(e) => setPlannerData({ ...plannerData, email: e.target.value })}
                          placeholder="Votre adresse email" 
                          className="w-full bg-[#111a24] border border-white/10 p-3 text-sm text-white placeholder-gray-500 font-light focus:outline-none focus:border-[#bb4e11]"
                        />
                      </div>
                      <div>
                        <textarea 
                          id="planner_input_message"
                          rows={4}
                          value={plannerData.message}
                          onChange={(e) => setPlannerData({ ...plannerData, message: e.target.value })}
                          placeholder="Parlez-nous de votre terrain, du contexte, des contraintes d'orientation... (Optionnel)" 
                          className="w-full bg-[#111a24] border border-white/10 p-3 text-sm text-white placeholder-gray-500 font-light focus:outline-none focus:border-[#bb4e11] resize-none"
                        />
                      </div>
                    </form>
                  )}

                  {/* Controls container */}
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <button 
                      id="planner_btn_back"
                      onClick={handlePlannerBack}
                      className={`text-xs tracking-widest font-display text-gray-400 hover:text-white uppercase ${plannerStep === 0 ? 'pointer-events-none opacity-0' : 'cursor-pointer'}`}
                    >
                      ← Précédent
                    </button>

                    <button 
                      id="planner_btn_next"
                      onClick={handlePlannerNext}
                      disabled={plannerStep === 3 && (!plannerData.name || !plannerData.email)}
                      className="px-6 py-3 bg-[#bb4e11] hover:bg-[#973a06] disabled:opacity-45 text-white font-display text-xs tracking-widest uppercase cursor-pointer"
                    >
                      {plannerStep === 3 ? "Envoyer le projet" : "Continuer →"}
                    </button>
                  </div>

                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

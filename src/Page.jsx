import { useGSAP } from '@gsap/react';
import Image1 from './assets/branding.webp'
import Image2 from './assets/artdirection.webp'
import Image3 from './assets/webdesign.webp'
import Image4 from './assets/background.webp'
import Video from './assets/Video2.mp4'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react';
import Copy from './components/Copy';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export const Tryout = () => {
    const lenisRef = useRef(null);
    
    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });
        
        lenisRef.current = lenis;

        // Sync ScrollTrigger with Lenis
        lenis.on("scroll", ScrollTrigger.update);

        // Use GSAP ticker to drive Lenis
        const raf = (time) => {
            lenis.raf(time * 1000);
        };
        
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);

        // Clean up
        return () => {
            gsap.ticker.remove(raf);
            lenis.destroy();
        };
    }, []);

    useGSAP(() => {
        // Wait for DOM to be ready and Lenis to initialize
        const initScrollTrigger = () => {
            const textSections = document.querySelectorAll('.text-section');
            const images = document.querySelectorAll('.image');

            if (textSections.length === 0 || images.length === 0) {
                // If elements aren't ready yet, try again
                setTimeout(initScrollTrigger, 100);
                return;
            }

            // Function to show specific image with animation
            function showImage(imageIndex) {
                // Hide all images
                gsap.to('.image', {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.4,
                    ease: "power2.inOut"
                });

                // Show target image
                gsap.to(`[data-image="${imageIndex}"]`, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.inOut", // Fixed typo: was "powwer2.inOut"
                });
            }

            // Create ScrollTrigger for each text section
            textSections.forEach((section, index) => {
                const imageIndex = section.getAttribute('data-image');
                
                ScrollTrigger.create({
                    trigger: section,
                    start: "top center",
                    end: "bottom center",
                    onEnter: () => showImage(imageIndex),
                    onEnterBack: () => showImage(imageIndex),
                    // Uncomment for debugging
                    // markers: true,
                    // id: `section-${index + 1}`
                });
            });

            // Initialize first image after a small delay
            setTimeout(() => {
                showImage('1');
                // Scroll to top to ensure we start at the beginning
                if (lenisRef.current) {
                    lenisRef.current.scrollTo(0, { immediate: true });
                } else {
                    window.scrollTo({ top: 0, behavior: 'instant' });
                }
            }, 100);

            // Refresh ScrollTrigger after everything is set up
            ScrollTrigger.refresh();
        };

        // Start initialization
        initScrollTrigger();

        // Handle resize
        const handleResize = () => {
            ScrollTrigger.refresh();
        };
        
        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
        
    }, []); // Empty dependency array

    // Handle page load - ensure we start at top
    useEffect(() => {
        const handleLoad = () => {
            // Force scroll to top on page load
            setTimeout(() => {
                if (lenisRef.current) {
                    lenisRef.current.scrollTo(0, { immediate: true });
                } else {
                    window.scrollTo({ top: 0, behavior: 'instant' });
                }
                // Refresh ScrollTrigger after scroll reset
                ScrollTrigger.refresh();
            }, 50);
        };

        // Handle both initial load and navigation
        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }

        // Also handle when component first mounts
        handleLoad();

        return () => {
            window.removeEventListener('load', handleLoad);
        };
    }, []);

    return (
        <>
        <section>
        <div className="menu">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Work<sup>(6)</sup></a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      </div>   
      
      <p className='blessings'><span className='spacer'>&nbsp;</span>Premium branding, websites, and digital solutions designed to give your business a competitive advantage.</p>
    
        </section>
        <div className='hundredfuji'>
            <div className="vid-container">
            <video src={Video} autoPlay muted loop className="video" />
                </div> 
        <img src={Image4} alt="" />
        </div>
        <div className="scrollytelling-container">
            <div className="text-container">
                <div className="text-section" data-image="1">
                    <h2>Branding</h2>
                    <ul>
                        <li>Analysis</li>
                        <li>Strategy</li>
                        <li>Design</li>
                        <li>Brand Communication</li>
                        <li>Brand guidelines</li>
                    </ul>
                    <p>I create unique brand identities that tell your story and connect with your audience. From logo design to brand strategy, I craft cohesive visuals and messaging that make your brand stand out.</p>
                </div>

                <div className="text-section" data-image="2">
                    <h2>Art Direction</h2>
                    <ul>
                        <li>Concept development</li>
                        <li>Creative direction</li>
                        <li>Photography</li>
                        <li> Video direction</li>
                        <li>Visual storytelling</li>
                        <li>Mood boards</li>
                    </ul>
                    <p>Bringing creative visions to life through strategic and aesthetic direction. I guide projects from concept to execution, ensuring it consistent and impactful visual language.</p>
                </div>

                <div className="text-section" data-image="3">
                    <h2>Web design</h2>
                    <ul>
                        <li> UI/UX design</li>
                        <li>Wireframing</li>
                        <li>Prototyping</li>
                        <li> Web design</li>
                        <li>CMS(WordPress, Webflow)</li>
                    </ul>
                    <p>User-focused, aesthetically refined websites that balance functionality with visual appeal.</p>
                </div>

              
            </div>

            <div className="image-container">
                <div className="image-wrapper">
                    <img src={Image1} alt="Mountain" className="image" data-image="1"/>
                    <img src={Image2} alt="Forest" className="image" data-image="2"/>
                    <img src={Image3} alt="Desert" className="image" data-image="3"/>
                </div>
            </div>
        </div>
        </>
    );
};
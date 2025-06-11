import { useEffect, useRef, useState } from 'react'
import Image1 from './assets/hero.png'
import Image2 from './assets/flower.jpg'
import Image3 from './assets/architecture.jpg'
import Image4 from './assets/resort.jpg'
import Image5 from './assets/eyewear.jpg'
import Image6 from './assets/contact.jpg'
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import './App.css'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'
import Copy from './components/Copy'
import { Link } from 'react-router-dom'
gsap.registerPlugin (useGSAP, ScrollTrigger, SplitText);

function App() {
  const firstSect = useRef(null)
  const secondSect = useRef(null)
  const imageWrapper = useRef(null)
  const buttonRef = useRef(null)
  const workRef = useRef(null)
 

  useEffect(() => {
    const lenis = new Lenis();

    // Sync ScrollTrigger with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // Use GSAP ticker to drive Lenis
    const raf = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);



    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();

    // Clean up
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
   
   
      
  }, []);

  useGSAP(()=>{

        
    const split = new SplitText('.screen2 p',{
      type:"lines",
      mask:"lines",
      linesClass: "lines++",
    })

     gsap.set(split.lines, {
      y: "100%"
    });

    const animationProps = {
      y: '0%',
      duration: 2,
      stagger: 0.1,
      ease: 'power4.out'
    };

     gsap.to(split.lines, {
        ...animationProps,
        scrollTrigger: {
          trigger: secondSect.current,
          start: "top top",
          once: true
        }
      });

        gsap.fromTo(imageWrapper.current,
      { height: 0 },
      {
        height: '400px',
        duration: 2,
        ease: 'power4.out',
        scrub:1,
        scrollTrigger: {
          trigger: imageWrapper.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
        )

        gsap.fromTo(buttonRef.current,{
          scale: 0,
          opacity:0
        },
        {
          opacity:1,
          ease:'power2.inOut',
          scale:1,
          delay:1,
          duration:1,
          scrollTrigger:{
            trigger:'.container2',
            start:'top 50%'
          }
        })

        gsap.fromTo(workRef.current,{
          scale: 0,
          opacity:0
        },
        {
          opacity:1,
          ease:'power2.inOut',
          scale:1,
          duration:1,
          scrollTrigger:{
            trigger:'.container3',
            start:'top 50%'
          }
        })
    
}, { dependencies: []})

  return (
    <>
    <section>


     <div className='container' ref={firstSect}>
      <div className="content">
        <h2>Creative Developer</h2>
        <p>Weaving stories into pixels, crafting websites that mesmerize and insire. Where design meets functionality and beauty meets purpose.  </p>
         </div>
      <div className="imgBox">
        <img src={Image1} alt="" />
      </div>
    
     </div>
     <div className='johnTaylor'>
      <Copy>
     <h1 className='heading'>John taylor</h1> 
     </Copy>
     </div>
     
      
     <div className="menu">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Work<sup>(6)</sup></a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      </div>   
        </section>
      <section className='screen2' ref={secondSect}>
        <div className="imgbox" ref={imageWrapper}>
          <img src={Image2} alt="" />
        </div>
        <p><span className='spacer'>&nbsp;</span> I help brands craft meaningful stories and compelling visuals that deeply resonate with their audience, foster stong connections, build lasting loyalty, and drive sustainable long-term growth.</p>
      </section>
      <div className="screen3">
        
        <div className="container2">
          <div></div>
          <div>
            <Copy>
            <h3>From A-Z</h3>
            </Copy>
            
            <Copy> 
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus, ab. Laudantium, molestias incidunt! Sapiente rem ut aperiam expedita dolorem, nostrum odio nobis iusto suscipit .</p>
            </Copy>
          </div>
          <div>
            <Copy>
            <h3>From A-Z</h3>
            </Copy>
            
            <Copy> 
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus, ab. Laudantium, molestias incidunt! Sapiente rem ut aperiam expedita dolorem, nostrum odio nobis iusto suscipito.</p>
            </Copy>
          </div>
        </div>
        <button ref={buttonRef}>Schedule</button>
      </div>
<div className="parentContainer">
     <section className='width'>
      <h1>Apex Architects</h1>
        <img src={Image3} alt="" />
       
      </section>

      <section className='width'>
      <h1>Dionysos Resorts</h1>
        <img src={Image4} alt="" />
       
      </section>

         <section className='width'>
         <h1>Argus Eyewear</h1>
        <img src={Image5} alt="" />
       
      </section>
</div>
   

      <div className="container3">
        <div ref={workRef}>
          <p >All Works<sup>(6)</sup></p>
        </div>
      </div>
      <section>
        <div className="imgboxx">
          <div className="menu">
            
            <span>(Contact)</span>
          
           
            <Copy>
            <p><span className='spacer'>&nbsp;</span>Global presence, global recognition-- Contact me to take your next step  </p>
            </Copy>
          
           
          </div>
          <Copy>
          <h1 className='contact'>Contact me</h1>
          </Copy>
        
          <img src={Image6} alt="" />
        </div>
      </section>

      <section>
        <div className="footerMenu">
        <ul>
        <li><Link>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link>Work<sup>(6)</sup></Link></li>
        <li><Link>Contact</Link></li>
      </ul>
        </div>

        <div className="footerContact">
          <div className="flex">
            <div><FaInstagram /></div>
            <div> <FaFacebookSquare /></div>
            <div><FaXTwitter/></div>
            <div><FaLinkedin /></div>
            <div><FaYoutube/></div>
          </div>
          <span>(inquiries)</span>
          <p>john@jt-studio.com</p>
           <span>(phone)</span>
          <p>+49123456789</p>
        </div>
       
        
      </section>
    </>
  )
}

export default App

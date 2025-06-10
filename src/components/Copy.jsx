import React, { useRef } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Copy = ({ children, animateOnScroll = true, delay = 0 }) => {
  const containerRef = useRef(null);
  const elementRef = useRef([]);
  const splitRef = useRef([]);
  const lines = useRef([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    splitRef.current = [];
    elementRef.current = [];
    lines.current = [];

    let elements = [];

    if (containerRef.current.hasAttribute('data-copy-wrapper')) {
      elements = Array.from(containerRef.current.children);
    } else {
      elements = [containerRef.current];
    }

    elements.forEach((element) => {
      elementRef.current.push(element);

      const split = new SplitText(element, {
        type: "lines",
        mask:"lines",
        linesClass: "lines++"
      });

      splitRef.current.push(split);

      const computedStyle = window.getComputedStyle(element);
      const textIndent = computedStyle.textIndent;
      console.log(textIndent)

      if (textIndent && textIndent !== "0px") {
        if (split.lines.length > 0) {
          split.lines[0].style.paddingLeft = textIndent;
          console.log(split.lines[0].style.paddingLeft)
        }
        // element.style.textIndent = "0";
      }

      lines.current.push(...split.lines);
    });

    gsap.set(lines.current, {
      y: "100%"
    });

    const animationProps = {
      y: '0%',
      duration: 2,
      delay: delay,
      stagger: 0.1,
      ease: 'power4.out'
    };



    if (animateOnScroll) {
      gsap.to(lines.current, {
        ...animationProps,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true
        }
      });
    } else {
      gsap.to(lines.current, animationProps);
    }

    return () => {
      splitRef.current.forEach((split) => {
        if (split) {
          split.revert();
        }
      });
    };
  }, {
    scope: containerRef,
    dependencies: [animateOnScroll, delay]
  });

  if (React.Children.count(children) === 1) {
    return React.cloneElement(children, { ref: containerRef });
  }

  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
};


export default Copy;
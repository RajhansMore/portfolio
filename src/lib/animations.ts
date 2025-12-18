/**
 * MIND PALACE - GSAP ANIMATION SYSTEM
 * 
 * Handles the three-stage entry animation sequence:
 * Stage 1: Name reveal (3-4 seconds)
 * Stage 2: About fade-in + name slide up (3-4 seconds)
 * Stage 3: Mind Palace launch with warp effect
 */

import gsap from 'gsap';
import { ANIMATION_TIMINGS } from './constants';

/**
 * Stage 1: Name Reveal Animation
 * Display full name on dark screen for 3-4 seconds
 */
export function animateStage1(nameRef: React.RefObject<HTMLDivElement>): gsap.core.Timeline {
  if (!nameRef.current) return gsap.timeline();

  const tl = gsap.timeline();

  // Fade in name with scale effect
  tl.from(nameRef.current, {
    opacity: 0,
    scale: 0.8,
    duration: 0.8,
    ease: 'back.out',
  })
  .to(nameRef.current, {
    opacity: 1,
    scale: 1,
    duration: 0.6,
    ease: 'back.out',
  }, '<0.2')
  // Hold for specified duration
  .to(
    {},
    { duration: ANIMATION_TIMINGS.STAGE1_HOLD },
    '<'
  );

  return tl;
}

/**
 * Stage 2: About Me Fade-In & Name Slide Up
 * Name moves up slightly, About text fades in below it
 */
export function animateStage2(
  nameRef: React.RefObject<HTMLDivElement>,
  aboutRef: React.RefObject<HTMLDivElement>
): gsap.core.Timeline {
  if (!nameRef.current || !aboutRef.current) return gsap.timeline();

  const tl = gsap.timeline();

  // Move name up
  tl.to(nameRef.current, {
    y: -60,
    duration: 0.6,
    ease: 'power2.inOut',
  }, 0)
  // Fade in about text
  .from(
    aboutRef.current,
    {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
    },
    '<0.2'
  )
  // Hold for specified duration
  .to(
    {},
    { duration: ANIMATION_TIMINGS.STAGE2_HOLD },
    '<'
  );

  return tl;
}

/**
 * Stage 3: Mind Palace Launch
 * Name anchors to top-left, main content area ripples/warps to reveal central node
 */
export function animateStage3(
  nameRef: React.RefObject<HTMLDivElement>,
  contentRef: React.RefObject<HTMLDivElement>,
  shouldAnimate: boolean = true
): gsap.core.Timeline {
  if (!shouldAnimate) return gsap.timeline();
  if (!nameRef.current || !contentRef.current) return gsap.timeline();

  const tl = gsap.timeline();

  // Name moves to top-left with scale reduction
  tl.to(nameRef.current, {
    y: 0,
    x: 0,
    fontSize: '1.5rem',
    position: 'fixed',
    top: '2rem',
    left: '2rem',
    duration: 0.8,
    ease: 'power2.inOut',
  }, 0)
  // Stagger ripple effect on content area
  .from(
    contentRef.current,
    {
      opacity: 0,
      scale: 0.95,
      duration: 0.6,
      ease: 'back.out',
    },
    '<0.2'
  )
  // Additional polish: glow effect
  .to(
    contentRef.current,
    {
      boxShadow: '0 0 40px rgba(100, 181, 246, 0.3)',
      duration: 0.4,
      ease: 'power2.out',
    },
    '<0.3'
  );

  return tl;
}

/**
 * Node Hover Effect: Expand and glow
 */
export function animateNodeHover(nodeRef: React.RefObject<SVGCircleElement>) {
  if (!nodeRef.current) return;

  gsap.to(nodeRef.current, {
    r: (i: number, target: any) => {
      const currentR = parseFloat(target.getAttribute('r') || '40');
      return currentR * 1.3;
    },
    filter: 'drop-shadow(0 0 15px rgba(100, 181, 246, 0.8))',
    duration: 0.3,
    ease: 'power2.out',
  });
}

/**
 * Node Unhover Effect: Return to normal
 */
export function animateNodeUnhover(nodeRef: React.RefObject<SVGCircleElement>) {
  if (!nodeRef.current) return;

  gsap.to(nodeRef.current, {
    r: 40,
    filter: 'drop-shadow(0 0 5px rgba(100, 181, 246, 0.3))',
    duration: 0.3,
    ease: 'power2.out',
  });
}

/**
 * Highlight connection line between nodes
 */
export function animateConnectionHighlight(lineRef: React.RefObject<SVGLineElement>) {
  if (!lineRef.current) return;

  gsap.to(lineRef.current, {
    stroke: '#64b5f6',
    strokeWidth: 3,
    opacity: 1,
    filter: 'drop-shadow(0 0 8px rgba(100, 181, 246, 0.8))',
    duration: ANIMATION_TIMINGS.HOVER_HIGHLIGHT,
    ease: 'power2.out',
  });
}

/**
 * Dim connection line when not highlighted
 */
export function animateConnectionDim(lineRef: React.RefObject<SVGLineElement>) {
  if (!lineRef.current) return;

  gsap.to(lineRef.current, {
    stroke: '#444444',
    strokeWidth: 1,
    opacity: 0.3,
    filter: 'drop-shadow(0 0 0px transparent)',
    duration: ANIMATION_TIMINGS.HOVER_HIGHLIGHT,
    ease: 'power2.out',
  });
}

/**
 * Node expand/collapse animation
 */
export function animateNodeExpand(
  nodeRef: React.RefObject<HTMLDivElement>,
  expand: boolean = true
) {
  if (!nodeRef.current) return;

  gsap.to(nodeRef.current, {
    scale: expand ? 1.1 : 1,
    opacity: expand ? 1 : 0.7,
    duration: ANIMATION_TIMINGS.NODE_TRANSITION,
    ease: 'power2.out',
  });
}

/**
 * Cleanup: Kill all animations on unmount
 */
export function killAllAnimations() {
  gsap.killTweensOf('*');
}

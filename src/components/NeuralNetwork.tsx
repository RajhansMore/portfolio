/**
 * D3.JS NEURAL NETWORK COMPONENT
 * 
 * Force-directed graph visualization showing portfolio content as interconnected nodes
 * Central node represents user, 7 tier-1 nodes represent content categories
 * Hover effects and smooth animations using GSAP
 */

'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { D3_CONFIG, TECH_COLORS } from '@/lib/constants';
import {
  animateNodeHover,
  animateNodeUnhover,
  animateConnectionHighlight,
  animateConnectionDim,
} from '@/lib/animations';
import { portfolioConfig } from '@/config/portfolio.config';

interface NetworkNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  tier: number; // 0 = center (user), 1 = content categories
  color: string;
  radius: number;
  onClick: () => void;
}

interface NetworkLink extends d3.SimulationLinkDatum<NetworkNode> {
  source: string | NetworkNode;
  target: string | NetworkNode;
  strength: number;
}

interface NeuralNetworkProps {
  onNodeClick: (nodeId: string) => void;
  activeNode?: string;
}

export const NeuralNetwork: React.FC<NeuralNetworkProps> = ({
  onNodeClick,
  activeNode,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const simulationRef = useRef<d3.Simulation<NetworkNode, NetworkLink> | null>(null);

  // Define the 7 content categories (Tier 1 nodes)
  const contentCategories = [
    { id: 'skills', label: 'Skills', color: '#64B5F6' },
    { id: 'projects', label: 'Projects', color: '#81C784' },
    { id: 'experience', label: 'Experience', color: '#FFB74D' },
    { id: 'resume', label: 'Resume', color: '#E57373' },
    { id: 'certifications', label: 'Certifications', color: '#9575CD' },
    { id: 'extracurriculars', label: 'Extracurriculars', color: '#4DD0E1' },
    { id: 'interests', label: 'Interests', color: '#FFD54F' },
  ];

  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      if (svgRef.current?.parentElement) {
        const rect = svgRef.current.parentElement.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    // Create nodes
    const nodes: NetworkNode[] = [
      {
        id: 'center',
        label: portfolioConfig.personal.fullName,
        tier: 0,
        color: '#39FF14', // Matrix green
        radius: D3_CONFIG.NODE_RADIUS * 1.2,
        onClick: () => onNodeClick('center'),
        x: dimensions.width / 2,
        y: dimensions.height / 2,
      },
      ...contentCategories.map((cat, index) => {
        const angle = (index / contentCategories.length) * Math.PI * 2;
        const distance = 250; // Distance from center

        return {
          id: cat.id,
          label: cat.label,
          tier: 1,
          color: cat.color,
          radius: D3_CONFIG.NODE_RADIUS,
          onClick: () => onNodeClick(cat.id),
          x: dimensions.width / 2 + Math.cos(angle) * distance,
          y: dimensions.height / 2 + Math.sin(angle) * distance,
        } as NetworkNode;
      }),
    ];

    // Create links (center connected to all tier 1 nodes)
    const links: NetworkLink[] = nodes
      .filter((n) => n.tier === 1)
      .map((node) => ({
        source: 'center',
        target: node.id,
        strength: 0.3,
      }));

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)
      .attr('viewBox', [0, 0, dimensions.width, dimensions.height])
      .attr('style', 'width: 100%; height: 100%;');

    // Add background
    svg
      .append('rect')
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)
      .attr('fill', '#0a0a0a')
      .attr('opacity', 0.5);

    // Create simulation
    const simulation = d3
      .forceSimulation<NetworkNode>(nodes)
      .force(
        'link',
        d3
          .forceLink<NetworkNode, NetworkLink>(links)
          .id((d) => d.id)
          .distance(D3_CONFIG.LINK_DISTANCE)
          .strength((d) => d.strength)
      )
      .force('charge', d3.forceManyBody().strength(D3_CONFIG.FORCE_STRENGTH))
      .force('center', d3.forceCenter(dimensions.width / 2, dimensions.height / 2))
      .force(
        'collision',
        d3.forceCollide<NetworkNode>().radius((d) => d.radius + 10)
      )
      .tick(D3_CONFIG.TICK_ITERATIONS); // Pre-compute layout

    simulationRef.current = simulation;

    // Create arrowheads for links
    svg
      .append('defs')
      .selectAll('marker')
      .data(['marker'])
      .enter()
      .append('marker')
      .attr('id', 'arrowhead')
      .attr('markerWidth', 10)
      .attr('markerHeight', 10)
      .attr('refX', 35)
      .attr('refY', 3)
      .attr('orient', 'auto')
      .append('polygon')
      .attr('points', '0 0, 10 3, 0 6')
      .attr('fill', '#444444');

    // Draw links
    const link = svg
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', '#444444')
      .attr('stroke-width', 1)
      .attr('opacity', 0.3)
      .attr('x1', (d) => (typeof d.source === 'object' ? d.source.x || 0 : 0))
      .attr('y1', (d) => (typeof d.source === 'object' ? d.source.y || 0 : 0))
      .attr('x2', (d) => (typeof d.target === 'object' ? d.target.x || 0 : 0))
      .attr('y2', (d) => (typeof d.target === 'object' ? d.target.y || 0 : 0));

    // Draw nodes
    const node = svg
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('id', (d) => `node-${d.id}`)
      .attr('r', (d) => d.radius)
      .attr('fill', (d) => d.color)
      .attr('opacity', 0.9)
      .attr('filter', (d) =>
        d.tier === 0 ? 'drop-shadow(0 0 15px #39FF14)' : 'drop-shadow(0 0 5px rgba(100, 181, 246, 0.3))'
      )
      .attr('x', (d) => d.x || 0)
      .attr('y', (d) => d.y || 0)
      .style('cursor', 'pointer')
      .on('mouseenter', function (event, d) {
        setHoveredNode(d.id);
        
        // Animate node
        const nodeCircle = svg.select(`#node-${d.id}`);
        animateNodeHover(nodeCircle as any);

        // Highlight connected links
        link.each(function (linkData: any) {
          const sourceId = typeof linkData.source === 'object' ? linkData.source.id : linkData.source;
          const targetId = typeof linkData.target === 'object' ? linkData.target.id : linkData.target;

          if (sourceId === d.id || targetId === d.id) {
            animateConnectionHighlight(d3.select(this) as any);
          }
        });
      })
      .on('mouseleave', function (event, d) {
        setHoveredNode(null);
        
        // Animate node back
        const nodeCircle = svg.select(`#node-${d.id}`);
        animateNodeUnhover(nodeCircle as any);

        // Dim connected links
        link.each(function (linkData: any) {
          const sourceId = typeof linkData.source === 'object' ? linkData.source.id : linkData.source;
          const targetId = typeof linkData.target === 'object' ? linkData.target.id : linkData.target;

          if (sourceId === d.id || targetId === d.id) {
            animateConnectionDim(d3.select(this) as any);
          }
        });
      })
      .on('click', (event, d) => {
        event.stopPropagation();
        d.onClick();
      });

    // Add labels
    const labels = svg
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .attr('x', (d) => d.x || 0)
      .attr('y', (d) => d.y || 0)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-family', "'Montserrat', 'Poppins', sans-serif")
      .attr('font-size', (d) => (d.tier === 0 ? '14px' : '12px'))
      .attr('font-weight', (d) => (d.tier === 0 ? 'bold' : '600'))
      .attr('fill', '#F0F0F0')
      .attr('pointer-events', 'none')
      .text((d) => d.label);

    // Update positions on each tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d) => (typeof d.source === 'object' ? d.source.x || 0 : 0))
        .attr('y1', (d) => (typeof d.source === 'object' ? d.source.y || 0 : 0))
        .attr('x2', (d) => (typeof d.target === 'object' ? d.target.x || 0 : 0))
        .attr('y2', (d) => (typeof d.target === 'object' ? d.target.y || 0 : 0));

      node
        .attr('cx', (d) => d.x || 0)
        .attr('cy', (d) => d.y || 0);

      labels
        .attr('x', (d) => d.x || 0)
        .attr('y', (d) => d.y || 0);
    });

    return () => {
      simulation.stop();
    };
  }, [dimensions, onNodeClick]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-black via-slate-900 to-black rounded-lg overflow-hidden">
      <svg
        ref={svgRef}
        className="w-full h-full"
        style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)' }}
      />
    </div>
  );
};

export default NeuralNetwork;

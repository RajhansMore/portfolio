'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  tier: number;
  color: string;
  radius: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: Node | string;
  target: Node | string;
  strength: number;
}

interface NeuralNetworkProps {
  onNodeClick?: (nodeId: string) => void;
  width?: number;
  height?: number;
  expandMode?: boolean; // Whether to show only main node or all nodes
}

const TIER1_NODES: Node[] = [
  { id: 'skills', label: 'Skills', tier: 1, color: '#3b82f6', radius: 60 },
  { id: 'projects', label: 'Projects', tier: 1, color: '#8b5cf6', radius: 60 },
  { id: 'experience', label: 'Experience', tier: 1, color: '#ec4899', radius: 60 },
  { id: 'resume', label: 'Resume', tier: 1, color: '#f59e0b', radius: 60 },
  { id: 'certifications', label: 'Certifications', tier: 1, color: '#10b981', radius: 60 },
  { id: 'extracurriculars', label: 'Extracurriculars', tier: 1, color: '#06b6d4', radius: 60 },
  { id: 'interests', label: 'Interests', tier: 1, color: '#ef4444', radius: 60 },
];

const CENTER_NODE: Node = {
  id: 'center',
  label: 'Portfolio',
  tier: 0,
  color: '#64748b',
  radius: 40,
};

export const NeuralNetwork: React.FC<NeuralNetworkProps> = ({
  onNodeClick,
  width = 1200,
  height = 800,
  expandMode = false,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const simulationRef = useRef<d3.Simulation<Node, Link> | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Setup dimensions
    const actualWidth = width;
    const actualHeight = height;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    // Create nodes array
    const nodes: Node[] = expandMode
      ? [CENTER_NODE, ...TIER1_NODES]
      : [CENTER_NODE];

    // Create links
    const links: Link[] = expandMode
      ? TIER1_NODES.map(node => ({
        source: CENTER_NODE,
        target: node,
        strength: 0.5,
      }))
      : [];

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr('width', actualWidth)
      .attr('height', actualHeight)
      .attr('viewBox', [0, 0, actualWidth, actualHeight]);

    // Add background
    svg.append('rect')
      .attr('width', actualWidth)
      .attr('height', actualHeight)
      .attr('fill', 'none')
      .attr('class', 'neural-background');

    // Create force simulation
    const simulation = d3
      .forceSimulation<Node>(nodes)
      .force(
        'link',
        d3
          .forceLink<Node, Link>(links)
          .id(d => d.id)
          .distance(200)
          .strength(d => d.strength)
      )
      .force('charge', d3.forceManyBody().strength(-2000))
      .force('center', d3.forceCenter(actualWidth / 2, actualHeight / 2))
      .force('collision', d3.forceCollide<Node>().radius(d => d.radius + 20));

    simulationRef.current = simulation;

    // Create link elements
    const linkElements = svg
      .append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', 'var(--accent)') // Use theme accent
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 0.3) // Sober intensity
      .attr('class', 'network-link');

    // Add node groups
    const nodeGroups = svg
      .append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr('class', 'node-group');

    // Add circles for nodes
    nodeGroups
      .append('circle')
      .attr('r', d => d.radius)
      .attr('fill', '#64748b') // All nodes same color (main node color)
      .attr('stroke', '#1e293b')
      .attr('stroke-width', 2)
      .attr('class', 'node-circle')
      .attr('opacity', 0.9)
      .attr('filter', 'drop-shadow(0 0 6px var(--accent))');

    // Add glow effect
    nodeGroups
      .append('circle')
      .attr('r', d => d.radius)
      .attr('fill', 'none')
      .attr('stroke', 'var(--accent)') // Use theme accent
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0)
      .attr('class', 'node-glow');

    // Add labels
    nodeGroups
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.3em')
      .attr('font-size', d => (d.tier === 0 ? '14px' : '12px'))
      .attr('font-weight', 'bold')
      .attr('fill', '#ffffff')
      .attr('pointer-events', 'none')
      .attr('class', 'node-label')
      .text(d => d.label);

    // Add interactivity
    nodeGroups
      .on('mouseenter', function (event, d) {
        setHoveredNode(d.id);

        // Highlight hovered node
        d3.select(this)
          .select('.node-circle')
          .transition()
          .duration(200)
          .attr('opacity', 1)
          .attr('stroke-width', 3)
          .attr('fill', '#475569'); // Slightly lighter background

        // Show glow
        d3.select(this)
          .select('.node-glow')
          .transition()
          .duration(200)
          .attr('stroke-opacity', 0.6) // Sober glow
          .attr('stroke-width', 4);

        // Highlight connected links
        linkElements
          .transition()
          .duration(200)
          .attr('stroke-opacity', link => {
            const srcObj = typeof link.source === 'object' ? link.source : null;
            const tgtObj = typeof link.target === 'object' ? link.target : null;
            const isConnected = srcObj?.id === d.id || tgtObj?.id === d.id;
            return isConnected ? 0.8 : 0.1; // Highlight connected, dim others
          })
          .attr('stroke-width', link => {
            const srcObj = typeof link.source === 'object' ? link.source : null;
            const tgtObj = typeof link.target === 'object' ? link.target : null;
            return (srcObj?.id === d.id || tgtObj?.id === d.id) ? 2 : 1;
          });

        // Fade other nodes slightly
        nodeGroups.transition().duration(200).attr('opacity', node => {
          if (node.id === d.id || node.id === 'center') return 1;
          return 0.3;
        });
      })
      .on('mouseleave', function (event, d) {
        setHoveredNode(null);

        // Reset all nodes
        nodeGroups.transition().duration(200).attr('opacity', 1);

        nodeGroups
          .select('.node-circle')
          .transition()
          .duration(200)
          .attr('opacity', 0.9)
          .attr('stroke', '#1e293b')
          .attr('stroke-width', 2)
          .attr('fill', '#64748b');

        nodeGroups
          .select('.node-glow')
          .transition()
          .duration(200)
          .attr('stroke-opacity', 0);

        // Reset links
        linkElements
          .transition()
          .duration(200)
          .attr('stroke-opacity', 0.3) // Reset to default sober intensity
          .attr('stroke-width', 1);
      })
      .on('click', function (event, d) {
        if (expandMode && d.tier === 1 && onNodeClick) {
          onNodeClick(d.id);
        } else if (!expandMode && d.id === 'center' && onNodeClick) {
          // Expand to show all nodes
          onNodeClick('expand');
        }
      });

    // Add drag behavior
    nodeGroups.call(
      d3.drag<SVGGElement, Node>()
        .on('start', dragStarted)
        .on('drag', dragged)
        .on('end', dragEnded) as any
    );

    // Make clickable nodes have cursor pointer
    nodeGroups.style('cursor', d => (d.tier === 1 ? 'pointer' : 'default'));
    simulation.on('tick', () => {
      linkElements
        .attr('x1', d => {
          const src = typeof d.source === 'object' ? d.source : null;
          return src ? (src.x || 0) : 0;
        })
        .attr('y1', d => {
          const src = typeof d.source === 'object' ? d.source : null;
          return src ? (src.y || 0) : 0;
        })
        .attr('x2', d => {
          const tgt = typeof d.target === 'object' ? d.target : null;
          return tgt ? (tgt.x || 0) : 0;
        })
        .attr('y2', d => {
          const tgt = typeof d.target === 'object' ? d.target : null;
          return tgt ? (tgt.y || 0) : 0;
        });

      nodeGroups.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Drag functions
    function dragStarted(event: d3.D3DragEvent<SVGGElement, Node, Node>) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, Node, Node>) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragEnded(event: d3.D3DragEvent<SVGGElement, Node, Node>) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [width, height, onNodeClick]);

  return (
    <div className="w-full h-full flex items-center justify-center rounded-lg overflow-hidden relative z-10">
      <svg
        ref={svgRef}
        className="w-full h-full"
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      />
    </div>
  );
};

export default NeuralNetwork;

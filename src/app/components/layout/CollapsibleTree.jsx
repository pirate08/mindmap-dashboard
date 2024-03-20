'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const CollapsibleTree = ({ data }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    // Define the tooltip variable
    const tooltip = d3
      .select(containerRef.current)
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    const width = 1000;
    const marginTop = 10;
    const marginRight = 10;
    const marginBottom = 10;
    const marginLeft = 150;

    const root = d3.hierarchy(data);
    const dx = 30;
    const dy = (width - marginRight - marginLeft) / (1 + root.height);

    const tree = d3.tree().nodeSize([dx, dy]);
    const diagonal = d3
      .linkHorizontal()
      .x((d) => d.y)
      .y((d) => d.x);

    let svg = d3.select(containerRef.current).select('svg');
    if (svg.empty()) {
      svg = d3
        .select(containerRef.current)
        .append('svg')
        .attr('width', width)
        .attr('height', dx)
        .attr('viewBox', [-marginLeft, -marginTop, width, dx])
        .attr(
          'style',
          'max-width: 100%; height: auto; font: 18px sans-serif; user-select: none;'
        );
    } else {
      svg.selectAll('*').remove(); // Clear existing SVG contents
    }

    const gLink = svg
      .append('g')
      .attr('fill', 'none')
      .attr('stroke', '#fff')
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 1.5);

    const gNode = svg
      .append('g')
      .attr('cursor', 'pointer')
      .attr('pointer-events', 'all');

    function update(event, source) {
      const duration = event?.altKey ? 2500 : 250; // hold the alt key to slow down the transition
      const nodes = root.descendants().reverse();
      const links = root.links();

      // Compute the new tree layout.
      tree(root);

      let left = root;
      let right = root;
      root.eachBefore((node) => {
        if (node.x < left.x) left = node;
        if (node.x > right.x) right = node;
      });

      const height = right.x - left.x + marginTop + marginBottom;

      const transition = svg
        .transition()
        .duration(duration)
        .attr('height', height)
        .attr('viewBox', [-marginLeft, left.x - marginTop, width, height])
        .tween(
          'resize',
          window.ResizeObserver ? null : () => () => svg.dispatch('toggle')
        );

      // Update the nodes…
      const node = gNode.selectAll('g').data(nodes, (d) => d.id);

      // Enter any new nodes at the parent's previous position.
      const nodeEnter = node
        .enter()
        .append('g')
        .attr('transform', (d) => `translate(${source.y0},${source.x0})`)
        .attr('fill-opacity', 0)
        .attr('stroke-opacity', 0)
        .on('click', (event, d) => {
          d.data.children = d.data.children ? null : d.data._children;
          update(event, d);
        });

      nodeEnter
        .append('circle')
        .attr('r', 3)
        .attr('fill', (d) => (d.data.children ? '#28ed21' : '#fff'))
        .attr('stroke-width', 10);

      nodeEnter
        .append('text')
        .attr('dy', '0.31em')
        .attr('x', (d) => (d.data.children ? -6 : 6))
        .attr('text-anchor', (d) => (d.data.children ? 'end' : 'start'))
        .attr('fill', '#fff')
        .text((d) => d.data.name)
        .attr('class', 'hover-element')
        .on('mouseover', function (event, d) {
          tooltip
            .html(d.data.name)
            .transition()
            .duration(200)
            .style('opacity', 1)
            .style('position', 'absolute')
            .style('z-index', 100)
            .style('background-color', '#c71423')
            .style('color', 'white')
            .style('padding', '4px 8px')
            .style('border-radius', '4px')
            .style('pointer-events', 'none')
            .style('left', event.pageX + 'px')
            .style('top', event.pageY - 28 + 'px')
            .style('opacity', 1);
        })
        .on('mouseout', function (event, d) {
          tooltip.transition().duration(200).style('opacity', 0);
        });

      // Transition nodes to their new position.
      const nodeUpdate = node
        .merge(nodeEnter)
        .transition(transition)
        .attr('transform', (d) => `translate(${d.y},${d.x})`)
        .attr('fill-opacity', 1)
        .attr('stroke-opacity', 1);

      // Transition exiting nodes to the parent's new position.
      const nodeExit = node
        .exit()
        .transition(transition)
        .remove()
        .attr('transform', (d) => `translate(${source.y},${source.x})`)
        .attr('fill-opacity', 0)
        .attr('stroke-opacity', 0);

      // Update the links…
      const link = gLink.selectAll('path').data(links, (d) => d.target.id);

      // Enter any new links at the parent's previous position.
      const linkEnter = link
        .enter()
        .append('path')
        .attr('d', (d) => {
          const o = { x: source.x0, y: source.y0 };
          return diagonal({ source: o, target: o });
        });

      // Transition links to their new position.
      link.merge(linkEnter).transition(transition).attr('d', diagonal);

      // Transition exiting nodes to the parent's new position.
      link
        .exit()
        .transition(transition)
        .remove()
        .attr('d', (d) => {
          const o = { x: source.x, y: source.y };
          return diagonal({ source: o, target: o });
        });

      // Stash the old positions for transition.
      root.eachBefore((d) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    root.x0 = dy / 2;
    root.y0 = 0;

    update(null, root);
  }, [data]);

  return <div ref={containerRef}></div>;
};

export default CollapsibleTree;

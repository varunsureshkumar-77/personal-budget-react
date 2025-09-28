import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const D3Component = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || !data.myBudget || data.myBudget.length === 0) {
      return;
    }

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current);
    const width = 400;
    const height = 400;
    const margin = 40;
    const radius = Math.min(width, height) / 2 - margin;

    svg.attr("width", width).attr("height", height);

    const g = svg.append("g")
      .attr("transform", `translate(${width/2}, ${height/2})`);

    const color = d3.scaleOrdinal()
      .domain(data.myBudget.map(d => d.title))
      .range([
        '#FF1744', '#00E676', '#FF9800', '#2196F3', 
        '#E91E63', '#00BCD4', '#8BC34A', '#FFC107'
      ]);

    const pie = d3.pie()
      .value(d => d.budget)
      .sort(null);

    const arc = d3.arc()
      .innerRadius(radius * 0.4) 
      .outerRadius(radius);

    const labelArc = d3.arc()
      .innerRadius(radius * 0.7)
      .outerRadius(radius * 0.7);

    const pieData = pie(data.myBudget);

    const slices = g.selectAll('.slice')
      .data(pieData)
      .enter()
      .append('g')
      .attr('class', 'slice');

    slices.append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.title))
      .attr('stroke', '#fff')
      .attr('stroke-width', '2px')
      .style('opacity', 0.8)
      .on('mouseover', function(event, d) {
        d3.select(this)
          .style('opacity', 1)
          .attr('transform', 'scale(1.05)');
        
        const tooltip = d3.select('body').append('div')
          .attr('class', 'd3-tooltip')
          .style('position', 'absolute')
          .style('background', 'rgba(0, 0, 0, 0.8)')
          .style('color', 'white')
          .style('padding', '8px')
          .style('border-radius', '4px')
          .style('font-size', '12px')
          .style('pointer-events', 'none')
          .style('opacity', 0);

        const total = data.myBudget.reduce((sum, item) => sum + item.budget, 0);
        const percentage = ((d.data.budget / total) * 100).toFixed(1);
        
        tooltip.transition()
          .duration(200)
          .style('opacity', 1);
        
        tooltip.html(`${d.data.title}<br/>$${d.data.budget} (${percentage}%)`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px');
      })
      .on('mouseout', function(event, d) {
        d3.select(this)
          .style('opacity', 0.8)
          .attr('transform', 'scale(1)');
        
        d3.selectAll('.d3-tooltip').remove();
      })
      .transition()
      .duration(1000)
      .attrTween('d', function(d) {
        const interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
        return function(t) {
          return arc(interpolate(t));
        };
      });

    slices.append('text')
      .attr('transform', d => `translate(${labelArc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .style('fill', '#333')
      .style('opacity', 0)
      .text(d => {
        const percentage = ((d.data.budget / data.myBudget.reduce((sum, item) => sum + item.budget, 0)) * 100);
        return percentage > 5 ? `$${d.data.budget}` : ''; // Only show label if slice is large enough
      })
      .transition()
      .delay(1000)
      .duration(500)
      .style('opacity', 1);

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.5em')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .style('fill', '#333')
      .text('Total Budget');

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.8em')
      .style('font-size', '20px')
      .style('font-weight', 'bold')
      .style('fill', '#4d5791')
      .text(`$${data.myBudget.reduce((sum, item) => sum + item.budget, 0)}`);

  }, [data]);

  if (!data || !data.myBudget || data.myBudget.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <p>Loading D3 chart data...</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default D3Component;

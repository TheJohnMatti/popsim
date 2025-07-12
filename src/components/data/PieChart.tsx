import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

type PieChartProps = {
  data: Record<string, number>;
  width?: number;
  height?: number;
};

const PieChart: React.FC<PieChartProps> = ({ data, width = 300, height = 300 }) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove(); // Clear previous render

    const radius = Math.min(width, height) / 2;
    const total = Object.values(data).reduce((a, b) => a + b, 0);

    const color = d3.scaleOrdinal<string>()
      .domain(Object.keys(data))
      .range(d3.schemeCategory10);

    const pie = d3.pie<number>()
      .value((d) => d);

    const arcs = pie(Object.values(data));

    const arc = d3.arc<d3.PieArcDatum<number>>()
      .innerRadius(0)
      .outerRadius(radius - 10);

    const labelArc = d3.arc<d3.PieArcDatum<number>>()
      .innerRadius(radius * 0.5)
      .outerRadius(radius * 0.5);

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    arcs.forEach((d, i) => {
      const key = Object.keys(data)[i];
      const percentage = ((d.value / total) * 100).toFixed(1) + "%";

      g.append("path")
        .attr("d", arc(d)!)
        .attr("fill", color(key));

      g.append("text")
        .attr("transform", `translate(${labelArc.centroid(d)})`)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .style("fill", "white")
        .text(`${key}: ${percentage}`);
    });
  }, [data, width, height]);

  return <svg ref={ref} />;
};

export default PieChart;

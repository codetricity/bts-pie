const height = 400;
const width = 400;
const radius = (width -2) / 2;

dataset = [
  {"position": "vocalist", "number": 4},
  {"position": "rapper", "number": 1},
  {"position": "leader", "number": 1},
  {"position": "dancer", "number": 1}
];

const svg = d3.select('#chart')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', `translate(${width/2}, ${height/2})`);

const pie = d3.pie()
  .value(d => d.number);
  // .sort(null);

const arc = d3.arc()
  .innerRadius(0)
  .outerRadius(radius);

const colorScale = d3.scaleOrdinal()
  .range(['red', 'blue', 'green', 'orange', 'purple']);

const path = svg.selectAll('path')
  .data(pie(dataset))
  .enter()
  .append('path')
  .attr('d', arc)
  .style('fill', (d, i) => colorScale(i))
  .style('fill-opacity', '0.3')
  .style('stroke-width', '2px');
  
const textLabels = svg.selectAll('text')
  .data(pie(dataset))
  .enter()
  .append('text')
  .attr('transform', d => `translate(${arc.centroid(d)})`)
  .text(d => {
    console.log(d.data.number);
    return d.data.position;
  });
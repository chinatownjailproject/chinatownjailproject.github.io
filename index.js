// index.js

// Define the dimensions of the SVG container and margins
const width = 800;
const height = 400;
const margin = { top: 20, right: 20, bottom: 40, left: 40 };

// Load the CSV data and create the line graph
d3.csv("test.csv").then(function(data) {
    console.log(data)
    data.forEach(function(d) {
        d.value = +d.value; // Convert the values to numbers
        d.time = +d.time;   // Convert the time to numbers
    });

    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Create scales for x and y axes
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.time)]) // Set the x-axis domain
        .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)]) // Set the y-axis domain
        .range([height - margin.bottom, margin.top]);

    // Create a line generator
    const line = d3.line()
        .x(d => xScale(d.time))
        .y(d => yScale(d.value));

    // Create the line path
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line);

    // Create x and y axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(xAxis);

    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(yAxis);
});

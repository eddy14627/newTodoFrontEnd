import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { Card, Typography } from "@mui/material";
import { Box, width } from "@mui/system";

const Chart = ({ value }) => {
  let temp = [];
  let dayArray = [];
  for (var i = 0; i < 10; i++) {
    var d = new Date();
    d.setDate(d.getDate() - i);
    const dd = d.getDate();
    dayArray.push(dd);
  }
  // console.log(dayArray);
  temp = value.arr || [];
  const [data, setData] = useState(temp);

  // convert the temp array to the data array when the component mounts
  useEffect(() => {
    const newArray = temp.map((a) => a.length);
    setData(newArray);
  }, [temp]);

  const svgRef = useRef();

  useEffect(() => {
    // setting up svg container
    const w = 400;
    const h = 300;
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("overflow", "visible")
      .style("transform", "75px");

    // setting the scaling
    const xScale = d3.scaleBand().domain(dayArray).range([0, w]).padding(0.5);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data)])
      .range([h, 0]);

    // setting the axes
    const xAxis = d3.axisBottom(xScale).ticks(data.length);
    const yAxis = d3.axisLeft(yScale).ticks(5);
    svg.append("g").call(xAxis).attr("transform", `translate(0 , ${h})`);
    svg.append("g").call(yAxis);

    // setting the svg data with transition
    svg
      .selectAll(".bar")
      .data(data)
      .join(
        (enter) =>
          enter
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d, i) => xScale(dayArray[i]) - xScale.bandwidth() / 2)
            .attr("width", xScale.bandwidth())
            .attr("y", h)
            .attr("height", 0)
            .call((enter) =>
              enter
                .transition()
                .duration(1000)
                .attr("y", (val) => yScale(val))
                .attr("height", (val) => h - yScale(val))
            ),
        (update) =>
          update.call((update) =>
            update
              .transition()
              .duration(1000)
              .attr("x", (d, i) => xScale(dayArray[i]) - xScale.bandwidth() / 2)
              .attr("width", xScale.bandwidth())
              .attr("y", (val) => yScale(val))
              .attr("height", (val) => h - yScale(val))
          )
      );
  }, [data]);

  return (
    <Box>
      <div>
        <Card style={{ padding: "30px 30px", width: "100vh" }}>
          <Typography margin={"10px 0"} fontFamily={"cursive"} variant="h3">
            Chart
          </Typography>
          <svg ref={svgRef}></svg>
        </Card>
      </div>
    </Box>
  );
};

export default Chart;

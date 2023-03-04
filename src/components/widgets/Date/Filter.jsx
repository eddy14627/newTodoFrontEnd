import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ByDate from "./ByDate";
import ByMonth from "./ByMonth";
import ByYear from "./ByYear";
import DateRange from "./DateRange";

export default function Filter() {
  const [opt, setOpt] = React.useState("");
  const [dateClicked, setDateClicked] = React.useState(false);
  const [monthClicked, setMonthClicked] = React.useState(false);
  const [yearClicked, setYearClicked] = React.useState(false);
  const [dateRangeClicked, setDateRangeClicked] = React.useState(false);

  const handleChange = (event) => {
    setOpt(event.target.value);
  };

  const handleByDate = () => {
    console.log("handleByDate");
    setDateClicked(!dateClicked);
    setMonthClicked(false);
    setYearClicked(false);
    setDateRangeClicked(false);
  };
  const handleByMonth = () => {
    console.log("handleByMonth");
    setMonthClicked(!monthClicked);
    setDateClicked(false);
    setYearClicked(false);
    setDateRangeClicked(false);
  };
  const handleByYear = () => {
    console.log("handleByYear");
    setMonthClicked(false);
    setDateClicked(false);
    setYearClicked(!yearClicked);
    setDateRangeClicked(false);
  };
  const handleByDateRange = () => {
    console.log("handleByDateRange");
    setMonthClicked(false);
    setDateClicked(false);
    setYearClicked(false);
    setDateRangeClicked(!dateRangeClicked);
  };

  return (
    <Box sx={{ maxWidth: "100vh" }}>
      <FormControl fullWidth sx={{ margin: "10px 0px" }}>
        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={opt}
          label="Filter"
          onChange={handleChange}
        >
          <MenuItem value={1} onClick={handleByDate}>
            By Date
          </MenuItem>
          <MenuItem value={2} onClick={handleByMonth}>
            By Month
          </MenuItem>
          <MenuItem value={3} onClick={handleByYear}>
            By Year
          </MenuItem>
          <MenuItem value={4} onClick={handleByDateRange}>
            By Date Range
          </MenuItem>
        </Select>
      </FormControl>
      {dateClicked && <ByDate />}
      {monthClicked && <ByMonth />}
      {yearClicked && <ByYear />}
      {dateRangeClicked && <DateRange />}
    </Box>
  );
}

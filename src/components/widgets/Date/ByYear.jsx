import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch } from "react-redux";
import { setList } from "../../../state";
import { url } from "../../../url";

export default function ByYear() {
  const [year, setYear] = React.useState("Select By year");
  const dispatch = useDispatch();

  const handleChange = async (event) => {
    const selectedYear = event.target.value;
    setYear(selectedYear);
    const response = await fetch(`${url}/years/year/${selectedYear}`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    dispatch(setList(data));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">By Year</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={year}
          label="Year"
          onChange={handleChange}
        >
          <MenuItem value={2023}>2023</MenuItem>
          <MenuItem value={2022}>2022</MenuItem>
          <MenuItem value={2021}>2021</MenuItem>
          <MenuItem value={2020}>2020</MenuItem>
          <MenuItem value={2019}>2019</MenuItem>
          <MenuItem value={2018}>2018</MenuItem>
          <MenuItem value={2017}>2017</MenuItem>
          <MenuItem value={2016}>2016</MenuItem>
          <MenuItem value={2015}>2015</MenuItem>
          <MenuItem value={2014}>2014</MenuItem>
          <MenuItem value={2013}>2013</MenuItem>
          <MenuItem value={2012}>2012</MenuItem>
          <MenuItem value={2011}>2011</MenuItem>
          <MenuItem value={2010}>2010</MenuItem>
          <MenuItem value={2009}>2009</MenuItem>
          <MenuItem value={2008}>2008</MenuItem>
          <MenuItem value={2007}>2007</MenuItem>
          <MenuItem value={2006}>2006</MenuItem>
          <MenuItem value={2005}>2005</MenuItem>
          <MenuItem value={2004}>2004</MenuItem>
          <MenuItem value={2003}>2003</MenuItem>
          <MenuItem value={2002}>2002</MenuItem>
          <MenuItem value={2001}>2001</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

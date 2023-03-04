import * as React from "react";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { taskManager } from "../../../state";

export default function DateRange() {
  const [value, setValue] = React.useState([null, null]);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    let x1 = value[0].$d;
    let numDay1 = value[0].$D;
    let date1 = new Date(x1);
    let monthIndex1 = date1.getMonth();
    let year1 = date1.getFullYear();

    let x2 = value[1].$d;
    let numDay2 = value[1].$D;
    let date2 = new Date(x2);
    let monthIndex2 = date2.getMonth();
    let year2 = date2.getFullYear();

    const dateRange = {
      act: "dateRange",
      numDay1,
      monthIndex1,
      year1,
      numDay2,
      monthIndex2,
      year2,
    };
    dispatch(taskManager(dateRange));
  };
  return (
    <Box>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={{ start: "Check-in", end: "Check-out" }}
      >
        <DateRangePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
      <Button onClick={handleSubmit} variant="outlined" size="small">
        filter
      </Button>
    </Box>
  );
}

import * as React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useDispatch } from "react-redux";
import { setList } from "../../../state";
import { url } from "../../../url";

export default function ByDate() {
  const [value, setValue] = React.useState(dayjs());
  const dispatch = useDispatch();
  const handleChange = async (newValue) => {
    setValue(newValue);
    console.log(newValue);
    let x = newValue.$d;
    let numDay = newValue.$D;
    let date = new Date(x);
    let monthIndex = date.getMonth();
    let month = monthIndex + 1;
    let year = date.getFullYear();

    const response = await fetch(`${url}/date/${numDay}/${month}/${year}`, {
      method: "GET",
    });
    const data = await response.json();
    dispatch(setList(data));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label="Date desktop"
        inputFormat="MM/DD/YYYY"
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

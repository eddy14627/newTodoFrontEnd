import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

let monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DateTab = ({ day, month, year, Day }) => {
  const monthName = monthsOfYear[month - 1];
  return (
    <Card sx={{ maxWidth: "100vh", margin: "2vh 0" }}>
      <CardContent>
        <Typography variant="h4" ssx={{ fontSize: 14 }} gutterBottom>
          Today
        </Typography>
        <Typography color="text.secondary" component="span">
          {`${Day}, `}
        </Typography>
        <Typography color="text.secondary" component="span">
          {`${day < 10 ? `0${day}` : day}-${monthName}-${year}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DateTab;

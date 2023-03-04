import { IconButton, InputBase, Paper } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { setLink } from "../../state";

const AttachLink = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(setLink(input));
    setInput("");
  };
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
        marginBottom: "2px",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="attach link"
        inputProps={{ "aria-label": "search google maps" }}
        value={input}
        onChange={handleChange}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <AddIcon onClick={handleSubmit} />
      </IconButton>
    </Paper>
  );
};

export default AttachLink;

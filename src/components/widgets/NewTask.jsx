import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import { Link, ListItemIcon } from "@mui/material";
import { useDispatch } from "react-redux";
import { setList } from "../../state";
import UserImage from "./UserImage";
import { deepOrange } from "@mui/material/colors";
import { url } from "../../url";

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
export default function NewTask({
  taskId,
  task,
  link,
  picturePath,
  day,
  month,
  year,
}) {
  const monthName = monthsOfYear[month - 1];
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const dispatch = useDispatch();
  const handleClear = () => {
    setIsStrikethrough(!isStrikethrough);
  };

  const handleDelete = async () => {
    console.log("delete clicked");
    const response = await fetch(`${url}/delete/taskId/${taskId}`, {
      method: "GET",
    });
    const data = await response.json();
    dispatch(setList(data));
  };
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ListItem>
        <ListItemAvatar>
          {!picturePath || picturePath === "" ? (
            <Avatar sx={{ bgcolor: deepOrange[500] }}>T</Avatar>
          ) : (
            <UserImage picturePath={picturePath} />
          )}
        </ListItemAvatar>
        <ListItemText
          primary={!link ? task : <Link href={link}>{task}</Link>}
          sx={{
            textDecoration: isStrikethrough ? "line-through" : "none",
            transition: "text-decoration 0.3s ease-in-out",
          }}
          secondary={`${monthName} ${day < 10 ? `0${day}` : day} , ${year}`}
        />
        <ListItemIcon>
          <IconButton onClick={handleClear}>
            <ClearIcon sx={{ marginRight: "20px", cursor: "pointer" }} />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon sx={{ cursor: "pointer" }} fontSize="small" />
          </IconButton>
        </ListItemIcon>
      </ListItem>
    </List>
  );
}

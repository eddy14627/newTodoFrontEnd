import { Box } from "@mui/system";
import React from "react";

const UserImage = ({ picturePath, size = "40px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={picturePath}
      />
    </Box>
  );
};

export default UserImage;

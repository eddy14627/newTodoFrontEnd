import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import { setDrawer, setMode } from "../state";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import UserImage from "./widgets/UserImage";
import { Avatar } from "@mui/material";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const open = useSelector((state) => state.reducer.drawer);
  const dispatch = useDispatch();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => dispatch(setDrawer())}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" marginRight="auto">
            ToDos and checklist
          </Typography>
          <DarkModeIcon cursor="pointer" onClick={() => dispatch(setMode)} />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={() => dispatch(setDrawer())}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Avatar
          sx={{
            height: "200px",
            width: "200px",
            // maging: "auto",
            marginTop: "10px",
            marginLeft: "15px",
          }}
        >
          <UserImage
            picturePath={
              "data:image/png;base64,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"
            }
            size={"200px"}
          />
        </Avatar>
        <Typography fontFamily="cursive" fontWeight="bold" textAlign="center">
          User
        </Typography>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}

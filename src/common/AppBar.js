import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/Authslice";
import imageUrls from "../constants/imageurls";
import { setUserProfile } from "../redux/slices/profileSlice";
import ToolTip from "./ToolTip/ToolTip";

const drawerWidth = 240;
const navItems = [
  { name: "Find Talent", path: "/" },
  { name: "Find Work", path: "/services" },
  { name: "Logout", path: "/singup/select-user" },
];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" , fontFamily : "Rubik" }}> 
      <Box
        sx={{ my: 2, mx: 2, cursor: "pointer" }}
        onClick={() => {
          navigate("/");
        }}
      >
        <img
          src={imageUrls.logo}
          alt="WINWAVE Logo"
          style={{ height: 40, textAlign: "center" }}
        />
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.name}
            onClick={() => {
              if (item.name === "Logout") {
                dispatch(setUserProfile(null));
                dispatch(logout());
                navigate("/signup/select-user");
              }else{

                navigate(item.path);
              }
            }}
          >
            <ListItemText
              sx={{
                fontSize: "16px",
                fontWeight: "400",

                color: `${
                  navigate.pathname === item.path ? "#FFD60C" : "#1D1D1D"
                }`,
              }}
              primary={item.name}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box  sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        position="fixed"
       
        sx={{
          padding : "0px 80px",
          boxShadow: "none",
          bgcolor: "#fff",
          borderBottom: "2px solid #d9d6d6",
        }}
      >
        <Toolbar>
          <IconButton
            // color="inherit"
            color="black"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            className="text-[#00B386] font-bold cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <Box
              sx={{ my: 2, mx: 2, cursor: "pointer" }}
              onClick={() => {
                navigate("/");
              }}
            >
              <img
                src={imageUrls.logo}
                alt="WINWAVE Logo"
                style={{ height: 40, textAlign: "center" }}
              />
            </Box>
          </Typography>

        
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <List
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily : "Rubik"
              }}
            >
              {navItems.map((item) => (
                <ListItemButton
                  key={item.name}
                
                  onClick={() => {
                    if (item.name === "Logout") {
                      dispatch(setUserProfile(null));
                      dispatch(logout());
                      navigate("/signup/select-user");
                    }else{
      
                      navigate(item.path);
                    }
                  }}
                >
                  <ListItemText
                    sx={{
                      fontSize: "16px",
                      fontWeight: "400",
                      fontFamily : "Rubik",
                      color: `${
                        navigate.pathname === item.path ? "#FFD60C" : "#1D1D1D"
                      }`,
                    }}
                    primary={item.name}
                  />
                </ListItemButton>
              ))}
              <ToolTip />
            </List>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Mobile Drawer */}
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRadius: "0px 16px 0px 0px",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;

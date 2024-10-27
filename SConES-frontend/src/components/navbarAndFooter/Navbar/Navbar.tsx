import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Button, Menu, MenuItem } from "@mui/material";
import { SConESColors } from "../../../config/Theme";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { RenderMobileMenu } from "./RenderMobileMenu";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../../utils/hooks/useAuth";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";

export default function Navbar({
  toggleColorMode,
  mode,
}: {
  toggleColorMode: () => void;
  mode: string;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const isAuthenticated = useIsAuthenticated();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const mobileMenuId = "primary-search-account-menu-mobile";
  const menuId = "primary-search-account-menu";
  const signOut = useSignOut();

  const logo = require("../../../utils/photos/logo.png");

  React.useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("Token:", token);
    if (token) {
      console.log("auth:", isAuthenticated);
      // setIsAuthenticated(true);
      console.log("Token:", token);
      console.log("auth2:", isAuthenticated);
    }
  }, [isAuthenticated]);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    navigate("/login");

    // setIsAuthenticated(false);
    signOut();
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Navbar */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: mode === "dark" ? "#333" : SConESColors.lightBlue,
          color: mode === "dark" ? "#fff" : "#000",
          textAlign: "center",
        }}
      >
        <Toolbar>
          {/* Hamburger Menu */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMobileMenuOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          {/* LOGO */}
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              height: 40,
              display: { xs: "none", sm: "block" },
            }}
          />
          {/* Search bar */}
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search> */}

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {isAuthenticated ? (
              <>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    color: "black",
                    "&:hover": {
                      backgroundColor: SConESColors.purple,
                      borderRadius: "16px",
                    },
                  }}
                >
                  Login
                </Button>

                <Button
                  component={Link}
                  to="/register"
                  color="inherit"
                  sx={{
                    color: "black",
                    "&:hover": {
                      backgroundColor: SConESColors.purple,
                      borderRadius: "16px",
                    },
                  }}
                >
                  SIGN UP
                </Button>
              </>
            )}
            {/* Dark Mode */}
            <IconButton
              sx={{ ml: 1 }}
              onClick={toggleColorMode}
              color="inherit"
            >
              {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <RenderMobileMenu
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        auth={isAuthenticated}
        handleProfileMenuOpen={handleProfileMenuOpen}
      />
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
      </Menu>
    </Box>
  );
}

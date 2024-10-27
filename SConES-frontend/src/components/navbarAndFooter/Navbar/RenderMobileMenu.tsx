import { Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

interface RenderMobileMenuProps {
  mobileMoreAnchorEl: HTMLElement | null;
  isMobileMenuOpen: boolean;
  handleMobileMenuClose: () => void;
  auth: boolean;
  handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
}

export const RenderMobileMenu: React.FC<RenderMobileMenuProps> = ({
  mobileMoreAnchorEl,
  isMobileMenuOpen,
  handleMobileMenuClose,
}) => {
  const mobileMenuId = "primary-search-account-menu-mobile";
  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem component={Link} to="/">
        <p>Home</p>
      </MenuItem>
      <MenuItem component={Link} to="/conferences">
        <p>Conferences</p>
      </MenuItem>
      <MenuItem component={Link} to="/upcoming-conferences">
        <p>Upcoming Conferences</p>
      </MenuItem>
      <MenuItem component={Link} to="/expired-conferences">
        <p>Expired Conferences</p>
      </MenuItem>
    </Menu>
  );
};

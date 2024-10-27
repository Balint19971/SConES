import { Typography, Box } from "@mui/material";
import { SConESColors } from "../../config/Theme";
import { Link } from "react-router-dom";

export default function Footer({
  mode,
}: {
  mode: string;
  toggleColorMode: () => void;
}) {
  return (
    <Box
      sx={{
        backgroundColor: mode === "dark" ? "#333" : SConESColors.lightBlue,
        color: mode === "dark" ? "#fff" : "#000",
        padding: "1rem",
        textAlign: "center",
      }}
    >
      <Typography variant="body1" sx={{ color: "white", mb: 2 }}>
        © SConES, Inc
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography
          variant="body2"
          sx={{ color: "white", mr: 2 }}
          component={Link}
          to="/"
        >
          Home
        </Typography>
        <Typography variant="body2" sx={{ color: "white" }}>
          Search Conferences
        </Typography>
      </Box>
    </Box>
  );
}

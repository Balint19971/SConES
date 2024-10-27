import { Button, ThemeProvider, Typography } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import DemoTheme from "../../config/Theme";
import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link } from "react-router-dom";
import TDKCarousel from "./components/TDKCarousel";
import { SConESColors } from "../../config/Theme";
import SConESCarousel from "./components/SConESCarousel";
import React from "react";

const HomePage = ({ userRole }: any) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={DemoTheme}>
        <div className="root">
          {/* TITLE */}
          <Typography variant="h2" color={SConESColors.darkGray}>
            <Typography
              component="span"
              variant="h2"
              color={SConESColors.purple}
            >
              Discover{" "}
            </Typography>
            upcoming conferences
          </Typography>
          <br />
          {/* BUTTONS */}
          <div className="buttonContainer">
            {userRole === "ADMIN" && (
              <Button
                startIcon={<AddIcon />}
                variant="contained"
                className="conference"
                component={Link}
                to="/create-conference"
                rel="noreferrer"
              >
                CONFERENCE
              </Button>
            )}
            &nbsp;
            <Button
              startIcon={<CalendarMonthIcon />}
              variant="contained"
              className="conferencelist"
              component={Link}
              to="/calendar"
              rel="noreferrer"
              sx={{
                backgroundColor: SConESColors.purple,
              }}
            >
              EVENTS
            </Button>
          </div>
          <SConESCarousel />
          <br />
          <br />
          {/* DESCRIPTION */}
          <div className="description">
            <div>
              <Typography variant="h4"></Typography>
              <Typography color={SConESColors.darkGray}>
                Explore the forefront of academic excellence with the TDK
                (Scientific Student Conference) platform. Our mission is to
                foster innovation, encourage research, and provide a prestigious
                stage for young scholars to present their groundbreaking work.
                <br />
                It switches between given children using a smooth animation.
                <br />
                Provides next and previous buttons. Also provides interactible
                bullet indicators.
              </Typography>
            </div>
          </div>
          <br />
          <TDKCarousel />
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default HomePage;

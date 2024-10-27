import Carousel from "react-material-ui-carousel";
import { Paper, Typography, Box, Container } from "@mui/material";
import { SConESColors } from "../../../config/Theme";

const TDKCarousel = () => {
  const image1 = require("../../../utils/photos/tengrai1.jpeg");
  const image2 = require("../../../utils/photos/tengrai2.jpeg");
  const image3 = require("../../../utils/photos/tengrai3.jpeg");

  const items = [
    {
      image: image1,
      description:
        "Discover Conferences: Dive into our extensive directory of TDK conferences across a multitude of disciplines. Whether you're in the sciences, humanities, engineering, or any other field, find a conference that aligns with your academic pursuits and interests.",
    },
    {
      image: image2,
      description:
        "Participate as a Presenter: Showcase your research, gain valuable feedback, and connect with peers and experts in your field. Apply to present at a TDK conference and make your mark in the academic community.",
    },
    {
      image: image3,
      description:
        "Attend and Engage: Join us as an attendee to stay updated on the latest research trends, engage in thought-provoking discussions, and network with like-minded individuals who share your passion for knowledge and discovery.",
    },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom color={SConESColors.darkGray}>
        Welcome to the TDK Conference Portal
      </Typography>
      <Carousel>
        {items.map((item, index) => (
          <Paper key={index}>
            <Box
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              alignItems="center"
              p={2}
              sx={{ backgroundColor: "white" }}
            >
              <Box
                component="img"
                src={item.image}
                alt={`carousel-item-${index}`}
                width={{ xs: "100%", md: "50%" }}
                pr={{ md: 2 }}
                mb={{ xs: 2, md: 0 }}
              />
              <Typography variant="body1" color={"black"}>
                {item.description}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Carousel>
    </Container>
  );
};

export default TDKCarousel;

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Grid, IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import { useState } from "react";
import BasicModal from "./BasicModal";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/hooks/useAuth";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(
    "https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/master/pass/best-face-oil.png"
  );

  const { userName, userRole, userEmail } = useAuth();

  const updateAvatar = (imgSrc: any) => {
    setAvatarUrl(imgSrc);
    setModalOpen(false);
  };

  return (
    <Card variant="outlined">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {/* CARD HEADER START */}
        <Grid item sx={{ p: "1.5rem 0rem", textAlign: "center" }}>
          {/* PROFILE PHOTO */}
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <IconButton
                title="Change photo"
                onClick={() => setModalOpen(true)}
              >
                <PhotoCameraIcon
                  sx={{
                    border: "5px solid white",
                    backgroundColor: "#91ABBE",
                    borderRadius: "50%",
                    padding: ".2rem",
                    width: 35,
                    height: 35,
                  }}
                ></PhotoCameraIcon>
              </IconButton>
            }
          >
            <Avatar
              sx={{ width: 150, height: 150, mb: 1.5 }}
              src={avatarUrl}
            ></Avatar>
          </Badge>

          {modalOpen && (
            <BasicModal
              updateAvatar={updateAvatar}
              closeModal={() => setModalOpen(false)}
            />
          )}

          {/* DESCRIPTION */}
          <Typography variant="h6">{userName}</Typography>
          <Typography color="text.secondary">{userRole}</Typography>
        </Grid>
        {/* CARD HEADER END */}

        {/* BUTTON */}
        <Grid sx={{ width: "100%" }}>
          {userRole === "AUTHOR" && (
            <Button
              component={Link}
              to="/paper-create"
              variant="contained"
              sx={{
                width: "100%",
                p: 1,
                my: 2,
                bgcolor: "#363E54",
                "&:hover": { bgcolor: "#91ABBE" },
              }}
            >
              Upload New Thesis
            </Button>
          )}
        </Grid>

        {/* FORM */}
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsEditing(!isEditing);
            }}
          >
            <label style={{ display: "block", marginBottom: "10px" }}>
              Email: {userEmail}
            </label>
            <label style={{ display: "block", marginBottom: "10px" }}>
              Role: {userRole}
            </label>

            {/* <button type="submit" style={{ marginRight: "10px" }}>
              {isEditing ? "Save" : "Edit"} Profile
            </button> */}
            <p>
              <i>
                Hello, {userName}! You are logged in as a {userRole}
              </i>
            </p>
          </form>
        </Grid>
      </Grid>
      {/* BUTTON */}

      <Grid container justifyContent="center">
        {userRole === "AUTHOR" && (
          <Button
            component={Link}
            to="/my-papers"
            variant="contained"
            sx={{
              width: "50%",
              p: 1,
              my: 2,
              bgcolor: "#363E54",
              "&:hover": { bgcolor: "#91ABBE" },
            }}
          >
            Go to my work
          </Button>
        )}
        {userRole === "SUPERVISOR" && (
          <Button
            component={Link}
            to="/papers"
            variant="contained"
            sx={{
              width: "50%",
              p: 1,
              my: 2,
              bgcolor: "#363E54",
              "&:hover": { bgcolor: "#91ABBE" },
            }}
          >
            GO TO PAPERS
          </Button>
        )}
      </Grid>
    </Card>
  );
}

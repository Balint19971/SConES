import { Box, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useDeleteConference from "../../utils/conference-list/useDeleteConference";
import useFetchExpiredConferences from "../../utils/conference-list/useFetchExpiredConferences";

export const ExpiredConferenceList = ({ userRole }: any) => {
  const {
    conferences,
    isLoading,
    error: fetchError,
  } = useFetchExpiredConferences();
  const {
    handleDeleteConference,
    deletedConferenceId,
    error: deleteError,
  } = useDeleteConference();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (fetchError || deleteError) {
    return (
      <div>
        {fetchError && <p>{fetchError}</p>}
        {deleteError && <p>{deleteError}</p>}
      </div>
    );
  }

  return (
    <Grid container spacing={3}>
      {/* Title */}
      {conferences.length === 0 ? (
        <Grid item xs={12}>
          <Box mt={6} mb={3}>
            <Typography variant="h5" className="font-bold">
              There are no conferences
            </Typography>
            <Typography variant="body1" className="text-gray-500 mt-2">
              Create one!
            </Typography>
          </Box>
        </Grid>
      ) : (
        <>
          <Grid item xs={12}>
            <Box mt={6} mb={3}>
              <Typography variant="h5" className="font-bold">
                Past Conferences
              </Typography>
              <Typography variant="body1" className="text-gray-500 mt-2">
                Explore conferences that have already taken place.
              </Typography>
              {userRole === "ADMIN" && (
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/create-conference"
                  >
                    Create Conference
                  </Button>
                </Grid>
              )}
            </Box>
          </Grid>

          {/* Conference details */}
          {conferences.map((conference, index) => (
            <Grid item xs={12} key={index}>
              <Box
                display="flex"
                justifyContent="space-between"
                border="1px solid #ccc"
                borderRadius="5px"
                padding="10px"
                bgcolor="#f9f9f9"
              >
                {/* Conference Description */}
                <Box flex="1">
                  <Typography variant="h6" className="font-semibold">
                    {conference.name}
                  </Typography>
                  <Typography variant="body2" className="text-gray-500">
                    {conference.startDate}
                  </Typography>
                  <Typography variant="body2" className="text-gray-500">
                    {conference.endDate}
                  </Typography>
                  <Typography variant="body2" className="text-gray-500">
                    {conference.location}
                  </Typography>
                  <Typography variant="body2" className="text-gray-500">
                    {/* {conference.sectionsIds} */}
                  </Typography>
                  <Link to={`/conference/${conference.id}`}>
                    <Typography variant="body2" className="text-gray-500">
                      More Details
                    </Typography>
                  </Link>
                </Box>

                {/* Buttons */}
                {userRole === "ADMIN" && ( // Check if the user's role is "Admin"
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    marginLeft={2}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => handleDeleteConference(conference.id)}
                      style={{ marginBottom: "2px" }}
                    >
                      Delete
                    </Button>
                    <Link
                      to={`/update-conference/${conference.id}`}
                      state={{
                        id: conference.id,
                        name: conference.name,
                        startDate: conference.startDate,
                        endDate: conference.endDate,
                        location: conference.location,
                        // sectionsIds: conference.sectionsIds,
                      }}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        style={{ marginTop: "32px" }}
                      >
                        Update
                      </Button>
                    </Link>
                  </Box>
                )}
              </Box>
            </Grid>
          ))}
        </>
      )}
    </Grid>
  );
};

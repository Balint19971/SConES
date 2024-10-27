import { DevTool } from "@hookform/devtools";
import {
  TextField,
  Button,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  Autocomplete,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router";
import dayjs from "dayjs";
import { ConferenceFormData } from "../../model/Conference";
import { isBefore, isToday, parseISO } from "date-fns";

const ConferenceForm = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [conferenceName, setConferenceName] = useState("");
  const [startDateState, setStartDateState] = useState("");
  const [endDateState, setEndDateState] = useState("");
  const [locationState, setLocation] = useState("");
  const [sections, setSections] = useState<any[]>([]);
  const [university, setUniversity] = useState("");
  const [universities, setUniversities] = useState([]);
  const [displayWarning, setDisplayWarning] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const conferenceDetails = location.state || {};

  const { register, control, handleSubmit, formState, setError, setValue } =
    useForm<ConferenceFormData>({
      defaultValues: {
        id: conferenceDetails.id || 0,
        name: conferenceDetails.name || "",
        startDate: conferenceDetails.startDate || "",
        endDate: conferenceDetails.endDate || "",
        location: conferenceDetails.location || "",
        sectionsIds: conferenceDetails.sectionsIds || [],
      },
    });
  useEffect(() => {
    if (conferenceDetails) {
      // Set the form values when the component mounts
      setValue("id", conferenceDetails.id || 0);
      setValue("name", conferenceDetails.name || "");
      setValue("startDate", conferenceDetails.startDate || "");
      setValue("endDate", conferenceDetails.endDate || "");
      setValue("location", conferenceDetails.location || "");
      setValue("sectionsIds", conferenceDetails.sectionsIds || []);
    }
  }, [conferenceDetails, setValue]);
  const { errors } = formState;

  useEffect(() => {
    // Fetch sections if university is selected
    if (university) {
      fetchSectionsByUniversity(university);
    }
  }, [university]);

  const fetchUniversities = async (substring: any) => {
    const token = localStorage.getItem("authToken");
    console.log("Token:", token);
    console.log("University:", university);
    try {
      const response = await fetch(
        `http://localhost:8080/api/sections/universities?substring=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setUniversities(data);
      console.log("Universities:", data[0]);
      console.log("Universities state:", universities[0]);
    } catch (error) {
      console.error("Error fetching universities:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update searchTerm state based on user input
    setSearchTerm(event.target.value);
    fetchUniversities(searchTerm);
  };

  const fetchSectionsByUniversity = async (university: any) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `http://localhost:8080/api/sections/by-university?university=${university}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log("Sections:", data[0]);
      setSections(data);
    } catch (error) {
      console.error("Error fetching sections:", error);
      setSections([]); // Set sections to an empty array in case of an error
    }
  };

  const onSubmit = async (data: ConferenceFormData) => {
    await submitNewConference(data);
    navigate("/conferences");
  };

  async function submitNewConference(data: ConferenceFormData) {
    const startDate = parseISO(startDateState);
    const endDate = parseISO(endDateState);
    const apiUrl = id
      ? `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/conferences/${id}`
      : `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/conferences`;
    const method = id ? "PUT" : "POST";
    const token = localStorage.getItem("authToken");


    try {
      const requestOptions = {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      };
      if (isBefore(startDate, new Date()) && !isToday(startDate)) {
        setError("startDate", {
          type: "manual",
          message: "Start date cannot be in the past",
        });
        return;
      }
    
      if (isBefore(endDate, startDate)) {
        setError("endDate", {
          type: "manual",
          message: "End date cannot be before start date",
        });
        return;
      }
      const submitNewConferenceResponse = await fetch(apiUrl, requestOptions);
      const responseData = await submitNewConferenceResponse.json();
      if (!submitNewConferenceResponse.ok) {
        throw new Error("Something went wrong!");
      }
      // setConferenceName("");
      // setEndDateState("");
      // setLocation("");
      // setStartDateState("");
      setDisplayWarning(false);
      setDisplaySuccess(true);
    } catch (error) {
      setDisplayWarning(true);
      setDisplaySuccess(false);
    }
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          paddingTop: "50px",
          paddingLeft: "50px",
        }}
      >
        <h1 className="text-4xl font-bold mb-8">Create conference</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Form name */}
          <Stack spacing={4} width={900}>
            {/* Form university */}
            <Autocomplete
              options={universities}
              getOptionLabel={(option) => option || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="University"
                  variant="outlined"
                  onChange={handleInputChange}
                  value={searchTerm}
                />
              )}
              value={university}
              onChange={(event, newValue) => {
                setUniversity(searchTerm);
                fetchSectionsByUniversity(newValue);
              }}
              freeSolo
            />
            {/* Form sectionsIds */}
            <Controller
              name="sectionsIds"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <InputLabel>Sections</InputLabel>
                  <Select
                    multiple
                    value={field.value || []}
                    onChange={(event) => {
                      field.onChange(event.target.value);
                    }}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {sections.map((section: any) => (
                      <MenuItem
                        key={section.sectionId}
                        value={section.sectionId}
                      >
                        <Checkbox
                          checked={field.value?.includes(section.sectionId)}
                        />
                        <ListItemText
                          primary={`${section.name} (${section.university})`}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.sectionsIds && (
                    <p style={{ color: "red" }}>{errors.sectionsIds.message}</p>
                  )}
                </FormControl>
              )}
            />
            <TextField
              label="Name"
              type="name"
              {...register("name", {
                required: "Conference name is required",
              })}
            />
            {errors.name && (
              <p style={{ color: "red" }}>{errors.name.message}</p>
            )}
            {/* Form start date */}
            <Controller
              control={control}
              name="startDate"
              render={({ field }) => (
                <>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Select date"
                      format="DD-MM-YYYY"
                      {...register("startDate", {
                        required: "Start date is required",
                      })}
                      onChange={(date) =>
                        field.onChange(date ? date.format("DD-MM-YYYY") : "")
                      }
                      // defaultValue={dayjs(conferenceDetails?.startDate)}
                    />
                    {errors.startDate && (
                      <p style={{ color: "red" }}>{errors.startDate.message}</p>
                    )}
                  </LocalizationProvider>
                </>
              )}
            />
            {/* Form end date */}
            <Controller
              control={control}
              name="endDate"
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="End date"
                    format="DD-MM-YYYY"
                    {...register("endDate", {
                      required: "End date is required",
                    })}
                    onChange={(date) => {
                      const formattedDate = date
                        ? dayjs(date).format("DD-MM-YYYY")
                        : "";
                      if (
                        date &&
                        startDateState &&
                        dayjs(date).isBefore(dayjs(startDateState))
                      ) {
                        setError("endDate", {
                          type: "manual",
                          message: "End date cannot be before start date",
                        });
                      } else {
                        field.onChange(formattedDate);
                      }
                    }}
                    // defaultValue={dayjs(conferenceDetails.endDate)}
                  />
                  {errors.endDate && (
                    <p style={{ color: "red" }}>{errors.endDate.message}</p>
                  )}
                </LocalizationProvider>
              )}
            />
            {/* Form location */}
            <TextField
              label="Location"
              type="location"
              {...register("location", {
                required: {
                  value: true,
                  message: "Location is required",
                },
              })}
            />
            {errors.location && (
              <p style={{ color: "red" }}>{errors.location.message}</p>
            )}

            {/* Submit button */}
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Stack>
        </form>
        <DevTool control={control} />
      </div>
    </>
  );
};
export default ConferenceForm;

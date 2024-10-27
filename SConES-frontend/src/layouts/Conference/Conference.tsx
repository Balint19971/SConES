import { Link, useParams, useNavigate } from "react-router-dom";
import { ConferenceFormData } from "../../model/Conference";
import { useEffect, useState } from "react";

export default function Conference() {
  const { id } = useParams();
  const [conferenceDetails, setConferenceDetails] =
    useState<ConferenceFormData | null>(null);
  const [conferenceId, setConferenceId] = useState<string | undefined>();
  const navigate = useNavigate();
  const [conferenceEnded, setConferenceEnded] = useState<boolean>(false);
  const image1 = require("../../utils/photos/tengrai1.jpeg");

  useEffect(() => {
    const fetchConferenceDetails = async () => {
      if (conferenceDetails) {
        if (new Date(conferenceDetails.endDate) < new Date()) {
          setConferenceEnded(true);
        } else {
          setConferenceEnded(false);
        }
      }
      setConferenceId(id);
      try {
        const response = await fetch(
          `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/conferences/${id}`
        );
        const data = await response.json();
        console.log(data[0]);

        setConferenceDetails({
          id: data.id,
          name: data.name,
          startDate: data.startDate,
          endDate: data.endDate,
          location: data.location,
          sectionsIds: data.sectionsIds,
        });
      } catch (error) {
        console.error("Error fetching conference details:", error);
      }
    };

    fetchConferenceDetails();
  }, [id]);

  if (!conferenceDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const handleRegisterClick = () => {
    navigate(`/conference-register`, { state: { conferenceId } });
  };

  const isConferenceEnded = new Date(conferenceDetails.endDate) < new Date();

  return (
    <div className="bg-background text-foreground">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-primary-foreground sm:text-5xl xl:text-6xl/none">
                  {conferenceDetails.name}
                </h1>
                <p className="max-w-[600px] text-primary-foreground/80 md:text-xl">
                  Join us for the annual {conferenceDetails.name}, where
                  industry leaders and innovators come together to share their
                  insights and shape the future.
                </p>
                <div className="flex items-center space-x-4 text-xl font-medium text-primary-foreground/80">
                  <div>
                    {conferenceDetails.startDate} - {conferenceDetails.endDate}
                  </div>
                  <div>{conferenceDetails.location}</div>
                </div>
              </div>
            </div>
            <img
              src={image1}
              alt="Conference"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-2 xl:grid-cols-3">
          <div className="grid gap-4">
            <div className="rounded-lg bg-muted p-6">
              <h3 className="text-xl font-bold">Keynote Speakers</h3>
              <p className="text-muted-foreground">
                Hear from industry leaders and visionaries as they share their
                insights and experiences.
              </p>
            </div>
            <div className="rounded-lg bg-muted p-6">
              <h3 className="text-xl font-bold">Workshops</h3>
              <p className="text-muted-foreground">
                Dive deep into specific topics and learn from experts in
                hands-on workshops.
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="rounded-lg bg-muted p-6">
              <h3 className="text-xl font-bold">Networking Events</h3>
              <p className="text-muted-foreground">
                Connect with fellow attendees and build valuable relationships
                at our networking events.
              </p>
            </div>
            <div className="rounded-lg bg-muted p-6">
              <h3 className="text-xl font-bold">Expo Hall</h3>
              <p className="text-muted-foreground">
                Explore the latest products and services from our exhibitors in
                the expo hall.
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="rounded-lg bg-muted p-6">
              <h3 className="text-xl font-bold">Social Events</h3>
              <p className="text-muted-foreground">
                Join us for fun and engaging social events to unwind and connect
                with the community.
              </p>
            </div>
            <div className="rounded-lg bg-muted p-6">
              <h3 className="text-xl font-bold">Hackathon</h3>
              <p className="text-muted-foreground">
                Put your skills to the test and compete in our exciting
                hackathon event.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            {!isConferenceEnded ? (
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-5xl">
                  Apply Now!
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Don't miss your chance to be a part of the{" "}
                  {conferenceDetails.name}. Secure your spot today and join us
                  for an unforgettable experience.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-5xl">
                  Discover Conferences!
                </h2>
              </div>
            )}
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              {!isConferenceEnded && (
                <button
                  onClick={handleRegisterClick}
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Apply
                </button>
              )}
              <Link
                to="#"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Browse Conferences
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useEffect, useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useFetchConferences from "../../utils/conference-list/useFetchConferences";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  desc?: string;
  allDay?: boolean;
}

export default function CalendarSConES() {
  const [eventsData, setEventsData] = useState<Event[]>([
    // {
    //   id: 0,
    //   title: "Sample Conference",
    //   start: new Date(2024, 6, 15), // June 15, 2023
    //   end: new Date(2024, 6, 17),   // June 17, 2023
    //   desc: "Location: Virtual",
    // }
  ]);
  const { conferences, isLoading, error } = useFetchConferences();

  useEffect(() => {
    if (conferences.length > 0) {
      const conferenceEvents: Event[] = conferences.map((conference) => ({
        id: conference.id,
        title: conference.name,
        start: moment(conference.startDate, "DD-MM-YYYY").toDate(),
        end: moment(conference.endDate, "DD-MM-YYYY").toDate(),
        desc: `Location: ${conference.location}`,
      }));
      setEventsData((prevEvents) => [...prevEvents, ...conferenceEvents]);
    }
  }, [conferences]);

  useEffect(() => {
    console.log("Updated eventsData:", eventsData);
    console.log("Updated conferences:", conferences);
  }, [eventsData, conferences]);

  const handleSelect = ({ start, end }: { start: Date; end: Date }) => {
    console.log(start);
    console.log(end);
    const title = window.prompt("New Event name");
    if (title) {
      const newEvent: Event = {
        id: eventsData.length
          ? Math.max(...eventsData.map((event) => event.id)) + 1
          : 1,
        start,
        end,
        title,
        desc: "",
      };
      setEventsData([...eventsData, newEvent]);
    }
  };
  return (
    <div className="App">
      <Calendar
        views={["day", "agenda", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh" }}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
        className="custom-calendar"
      />
    </div>
  );
}

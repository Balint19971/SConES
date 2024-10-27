import "./App.css";
import { ConferenceList } from "./layouts/ConferenceList/ConferenceList";
import ConferenceForm from "./layouts/ConferenceForm/ConferenceForm";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbarAndFooter/Navbar/Navbar";
import Footer from "./components/navbarAndFooter/Footer";
import ProfilePage from "./layouts/Profile/ProfilePage";
import HomePage from "./layouts/HomePage/HomePage";
import CalendarSConES from "./layouts/Calendar/CalendarSConES";
import Login from "./layouts/Login/Login";
import Register from "./layouts/Register/Register";
import Conference from "./layouts/Conference/Conference";
import { PaperListPage } from "./layouts/Paper/PaperListPage";
import { PaperCreationFormPage } from "./layouts/Paper/PaperCreationFormPage";
import { PaperViewPage } from "./layouts/Paper/PaperViewPage";
import RegisterToConference from "./layouts/RegisterToConference/RegisterToConference";
import { MyPapers } from "./layouts/Paper/MyPapers";
import { useAuth } from "./utils/hooks/useAuth";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";
import { ExpiredConferenceList } from "./layouts/ConferenceList/ExpiredConferenceList";
import { UpcomingConferenceList } from "./layouts/ConferenceList/UpcomingConferenceList";

/**
 * The main App component that renders the application's layout and routes.
 *
 * This component sets up the overall structure of the application, including the
 * navbar, footer, and the various routes and pages. It also handles the
 * toggling of the light/dark color mode and checks the user's role to
 * determine which routes and pages they can access.
 */
function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const { userRole } = useAuth();
  console.log(userRole);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <div className="App">
      <div className="content">
        <Navbar toggleColorMode={toggleColorMode} mode={mode} />
        <div>
          <Routes>
            <Route path="/" element={<HomePage userRole={userRole} />} />
            <Route
              path="/conferences"
              element={<ConferenceList userRole={userRole} />}
            />
            <Route
              path="/create-conference"
              element={
                <ProtectedRoute
                  roles={["ADMIN"]}
                  element={<ConferenceForm />}
                />
              }
            />
            <Route
              path="/update-conference/:id"
              element={
                <ProtectedRoute
                  roles={["ADMIN"]}
                  element={<ConferenceForm />}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  roles={["AUTHOR", "ADMIN", "SUPERVISOR"]}
                  element={<ProfilePage />}
                />
              }
            />
            <Route path="/calendar" element={<CalendarSConES />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/conference/:id" element={<Conference />} />
            <Route
              path="/papers"
              element={
                <ProtectedRoute
                  roles={["ADMIN", "AUTHOR", "SUPERVISOR"]}
                  element={<PaperListPage />}
                />
              }
            />
            <Route
              path="/paper-create"
              element={
                <ProtectedRoute
                  roles={["ADMIN", "AUTHOR"]}
                  element={<PaperCreationFormPage />}
                />
              }
            />
            <Route
              path="/paper/:id"
              element={
                <ProtectedRoute
                  roles={["ADMIN", "AUTHOR", "SUPERVISOR"]}
                  element={<PaperViewPage userRole={userRole} />}
                />
              }
            />
            <Route
              path="/conference-register"
              element={
                <ProtectedRoute
                  roles={["ADMIN", "AUTHOR"]}
                  element={<RegisterToConference />}
                />
              }
            />
            <Route
              path="/my-papers"
              element={
                <ProtectedRoute
                  roles={["ADMIN", "AUTHOR"]}
                  element={<MyPapers />}
                />
              }
            />
            <Route
              path="/expired-conferences"
              element={<ExpiredConferenceList />}
            />
            <Route
              path="/upcoming-conferences"
              element={<UpcomingConferenceList />}
            />
          </Routes>
        </div>
      </div>
      <Footer toggleColorMode={toggleColorMode} mode={mode} />
    </div>
  );
}

export default App;

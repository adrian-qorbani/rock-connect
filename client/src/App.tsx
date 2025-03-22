import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import "./App.css";

const HomeRoute = () => (
  <div>
    {" "}
    <h2>Home</h2>{" "}
  </div>
);

const FeedRoute = () => (
  <div>
    {" "}
    <h2>posts</h2>{" "}
  </div>
);

const ConnectionsRoute = () => (
  <div>
    {" "}
    <h2>friends and connections</h2>{" "}
  </div>
);

const ProfileRoute = () => (
  <div>
    {" "}
    <h2>current user profile</h2>{" "}
  </div>
);

function App() {
  const padding = {
    padding: "5px",
  };

  return (
    <Router>
      <div>
        <Link style={padding} to="/">
          Home
        </Link>
        <Link style={padding} to="/feed">
          Feed
        </Link>
        <Link style={padding} to="/connections">
          Friends
        </Link>
        <Link style={padding} to="/profile">
          User Profile
        </Link>
      </div>

      <Routes>
        <Route path="/feed" element={<FeedRoute />} />
        <Route path="/users" element={<ConnectionsRoute />} />
        <Route path="/profile" element={<ProfileRoute />} />
        <Route path="/" element={<HomeRoute />} />
      </Routes>

      <div>
        <i>Rock-Connect: Connecting Fans and Artists since 2025</i>
      </div>
    </Router>
  );
}

export default App;

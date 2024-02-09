import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Read from "./components/Read";
import Write from "./components/Write";
import AllData from "./components/AllData"; // Import the new component

function App() {
  return (
    <Router>
      <div className="App">
        <div>
          <span><Link to="/read">Read data from Server</Link></span>
          {" "}{" "}{" "}{" "}
          <span><Link to="/write">Write data to Mongodb</Link></span>
          {" "}{" "}{" "}{" "}
          <span><Link to="/alldata">All Data</Link></span> {/* Link to the new route */}
        </div>

        <Routes>
          <Route path="/read" element={<Read />} />
          <Route path="/write" element={<Write />} />
          <Route path="/alldata" element={<AllData />} /> {/* New route for displaying all data */}
          <Route path="/" element={<Write />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;

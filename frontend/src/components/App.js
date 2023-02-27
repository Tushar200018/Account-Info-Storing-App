import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./Pages/Home";
import AddAccount from "./Pages/AddAccount";
import FetchAccount from "./Pages/FetchAccount";
import UpdateAccount from "./Pages/UpdateAccount";
import DeleteAccount from "./Pages/DeleteAccount";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />


        <Route path="/add-account" element={<AddAccount />} />


        <Route path="/fetch-account" element={<FetchAccount />} />


        <Route path="/update-account" element={<UpdateAccount />} />
        <Route path="/delete-account" element={<DeleteAccount />} />


      </Routes>
    </Router>
  );
}

export default App;
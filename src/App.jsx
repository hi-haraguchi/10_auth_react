import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import Home from "./pages/home";
import Record from "./pages/record";
import FeelingsTimeline from "./pages/feelingstimeline";




function App() {

  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element= {<Login />} />
          <Route path="/home" element= {<Home />} />
          <Route path="/record" element= {<Record />} />
          <Route path="/feelingstimeline" element= {<FeelingsTimeline />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

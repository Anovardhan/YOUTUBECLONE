import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Nav from "./Components/Navbar";
import Videopage from "./Components/Videopage";
import Searchpage from "./Components/searchpage";
import Trendingpage from "./Components/Trendingpage";
import Channelpage from "./Components/Channelpage";
import { useState } from "react";
export default function App() {
  const [searchterm, setsearchterm] = useState("");
  return (
    <BrowserRouter>
      <Nav searchterm={searchterm} setsearchterm={setsearchterm} />
      <br></br>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:videoId" element={<Videopage />} />
        <Route
          path="/search_query/"
          element={
            <Searchpage searchterm={searchterm} setsearchterm={setsearchterm} />
          }
        />
        <Route path="/trending" element={<Trendingpage />} />
        <Route path="/channel/:channelId" element={<Channelpage />} />
      </Routes>
    </BrowserRouter>
  );
}

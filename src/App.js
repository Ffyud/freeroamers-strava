import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { useState } from "react";
import GetStravaData from "./GetStravaData";
import VisualizeData from "./VisualizeData";

const App = () => {
    const [stravaData, setStravaData] = useState(null);

    return (
        <BrowserRouter>
            <div className="wrapper">
                <Routes>
                    <Route path="" element={<GetStravaData setStravaData={setStravaData}></GetStravaData>}></Route>
                    <Route
                        path="exchange_token"
                        element={<GetStravaData setStravaData={setStravaData}></GetStravaData>}
                    ></Route>
                    <Route path="show" element={<VisualizeData data={stravaData}></VisualizeData>}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;

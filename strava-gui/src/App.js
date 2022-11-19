import logo from './logo.svg';
import './App.css';
import { Routes, Route, BrowserRouter} from "react-router-dom";
import GetStravaData from './GetStravaData';
import VisualizeData from './VisualizeData';

function App() {
  return (
    <BrowserRouter>
    <div className="wrapper">
      <Routes>
          <Route path="" element={<GetStravaData></GetStravaData>}></Route>

            <Route path="exchange_token" element={<GetStravaData></GetStravaData>}></Route>
            {/* TODO share data between sibling components */}
            <Route exact path="show" element={<VisualizeData></VisualizeData>}></Route>
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

import "./App.css";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/navBar";
import LoginForm from "./components/LoginForm";
import Attendance from "./components/Attendance";
import CreateLab from "./components/CreateLab";
import MakeUpLab from "./components/MakeUpLab";
import LabDislplay from "./components/LabDisplay";

function App() {
  /* const [user, setUser] = useState("");
  useEffect(() => {
    const user = auth.getCurrentUser();
    console.log(user);
    setUser(user);
  }, []);*/
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/labs" element={<CreateLab />} />
          <Route path="/makeuplab" element={<MakeUpLab />} />
          <Route path="/labview" element={<LabDislplay />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

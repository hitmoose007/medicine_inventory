import './App.css';
import Login from './pages/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route index exact element={<Login/>}/>
        {/* <Route path="/register" exact element={<Register/>}/> */}
        {/* <Route path="/main" exact element={<Main/>}/> */}
      </Routes>
      </Router>
  );
}

export default App;

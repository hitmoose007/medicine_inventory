import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Main from './pages/Main';
import Update from './pages/Update';
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
        <Route path="/register" exact element={<Register/>}/>
        <Route path="/main" exact element={<Main/>}/>
        <Route path="/update/:id" exact element={<Update/>}/>
      </Routes>
      </Router>
  );
}

export default App;

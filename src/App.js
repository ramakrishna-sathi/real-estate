import './App.css';
import { Route, BrowserRouter,Routes, Navigate } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/Login";
import Main from "./components/Main"
import Mainbuyer from "./components/Mainbuyer"
import Register from './components/Register';
import Edit from './components/Edit';
import Details from './components/Details';
function App() {
    const user = localStorage.getItem("token");
  return (
    <div className="App">
      <BrowserRouter>
		<Routes>
    <Route exact path="/Main"  element={<Main/>} />
    <Route exact path="/Mainbuyer"  element={<Mainbuyer/>} />
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
      <Route exact path="/register" element={<Register/>} />
      <Route exact path="/edit/:id" element={<Edit/>} />
      <Route exact path="/view/:id"  element={<Details/>} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			</Routes>
		</BrowserRouter>
    </div>
  );
}

export default App;

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Hero from "./pages/Hero";
import {  Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import { AuthContext } from "./components/Authentication";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import "./components/Transition.css";
function App() {
  const auth = useContext(AuthContext);
  const location = useLocation();
  return (

    <TransitionGroup>
        <Navbar />
        <CSSTransition key={location.key} timeout={500} classNames="scale">
          <Routes location={location}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            {auth[0].user ? <Route path="/" element={<Hero />} /> : null}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    
  );
}

export default App;

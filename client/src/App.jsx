import { useState, createContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Index from "./components/Index";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Posts from "./components/Posts"
import Profile from "./components/Profile"
import ErrorPage from "./components/ErrorPage";

export const UserContext = createContext();

const AppRouter = () => {
  const [user, setUser] = useState(null);

  return (
      <Router>
        <UserContext.Provider value={[user, setUser]}>
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/users/create" element={<SignUp />} />
            <Route path="/users/login" element={<LogIn />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/user" element={<Profile />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
        </UserContext.Provider>
      </Router>

  );
};

export default AppRouter;

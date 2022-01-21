import React, { useContext } from "react";
import { AppContext } from "./context/AppContext";
import { Routes, Route } from "react-router-dom";

import Feed from "./components/Feed/Feed";
import NotFound404 from "./components/NotFound404/NotFound404";
import OthersProfile from "./components/OthersProfile/OthersProfile";
import MyProfile from "./components/MyProfile/MyProfile";
import UserRegister from "./components/UserRegister/UserRegister";
import Loading from "./components/Loading/Loading";

function App() {
  const { user, isLoading } = useContext(AppContext);

  return (
    <div className="App">
      {isLoading ? (
        <Loading />
      ) : user ? (
        <Routes>
          <Route path="/profile/:authorUid" element={<OthersProfile />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/" element={<UserRegister />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      ) : (
        <UserRegister />
      )}
    </div>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./component/Chat";
import Sidebar from "./component/Sidebar";
import Home from "./component/Home";
import { useState } from "react";
import Login from "./component/Login";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
          <BrowserRouter>
            <Routes>
              <Route
                path="/rooms/:roomId"
                element={
                  <>
                    <Sidebar />
                    <Chat />
                  </>
                }
              />
              <Route path="/" element={<Chat />} />
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}

export default App;

// import logo from './logo.svg';
import "./App.css";
import * as React from "react";
import BooksList from "./components/main/books";
import Login from "./components/login/Login";

import MainLayout from "./components/main/mainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import BookSearch from "./components/main/bookSearch";

function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = React.useState("");

  return (
    <ConfigProvider direction="rtl">
      <Routes>
        {/* <Route
          path="/"
          render={() => {
            return this.state.isUserAuthenticated ? (
              <Redirect to="/home" />
            ) : (
              <Redirect to="/test1" /> 
            );
          }}
        /> */}
        <Route
          path="/"
          element={
            <div>
              <BooksList />
            </div>
          }
        />
        <Route
          path="/booksList/"
          element={
            <div>
              <BooksList />
            </div>
          }
        />
        <Route
          path="/school-library"
          element={
            <div>
              <BooksList />
            </div>
          }
        />
        <Route path="/booksList/" element={<MainLayout />} />
        <Route path="/about" element={<MainLayout />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;

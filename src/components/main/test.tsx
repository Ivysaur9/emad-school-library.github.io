import * as React from "react";
import { useEffect, useState } from "react";
const host = "https://emad-library.onrender.com";
// const host = "http://localhost:5500";
const TestApp = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(`${host}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts([]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return <></>;
};
export default TestApp;

import React, { useState } from "react";
import Button from "@mui/material/Button";
import Axios from "axios";
import LoadingBox from "./LoadingBox";
import style from "./App.module.css";

function App() {
  const [input, setInput] = useState("");
  const [text, setText] = useState([]);
  const URL_DEPLOY = "https://copywritebac.herokuapp.com/apihost/iecho/";
  const URL_DEVS = "http://localhost:3001/apihost/iecho/";

  const API_BASE_URL = URL_DEPLOY || URL_DEVS;
  const submitHandler = async () => {
    try {
      const { data } = await Axios.get(`${API_BASE_URL}${input}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      if (data) setText(data);
    } catch (error) {
      console.log(error);
    }
  };
  const arrayText = [];

  Object.keys(text).forEach((key) => {
    const array = text[key];
    arrayText.push(array);
  });

  return (
    <div className={style.container}>
      <div className={style.input}>
        <input
          type="text"
          name="input"
          onChange={(e) => setInput(e.target.value)}
          placeholder="Insert text"
        ></input>
        <Button variant="contained" onClick={submitHandler}>
          Send
        </Button>
      </div>

      <div className={style.cards}>
        <h3>Results</h3>

        {!text ? (
          <LoadingBox></LoadingBox>
        ) : (
          arrayText.map((t) => (
            <li key={t._id}>
              <div className={style.cardText}>{t.text}</div>
            </li>
          ))
        )}
      </div>
    </div>
  );
}

export default App;

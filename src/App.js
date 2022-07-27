import React, { useState } from "react";
import Button from "@mui/material/Button";
import Axios from "axios";
import style from "./App.module.css";

function App() {
  const [input, setInput] = useState("");
  const [text, setText] = useState([]);

  // function saveText(text, data) {
  //   return text.push(data);
  // }

  const submitHandler = async (e) => {
    console.log("este es el input enviado", input);
    try {
      const { data } = await Axios.get(
        `http://localhost:3001/apihost/iecho/${input}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        }
      );
      setText([...text, data]);
      console.log("lo que llega del backend", data);
    } catch (error) {
      console.log("error de app", error);
    }
  };
  console.log("el estado text", text);
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
    </div>
  );
}

export default App;

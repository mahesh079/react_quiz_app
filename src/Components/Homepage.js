import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Homepage.css";

const Homepage = () => {
  // useNavigate hook to navigate our user to Result page
  let navigate = useNavigate();


  // name state to set input name field
  let [name, setname] = useState("");

  // If flag is false then popup to enter name shows up
  let [flag, setflag] = useState(true);

  function current_name(event) {
    setname(event.target.value);
  }

  function question_page(category, value) {
    if (name) {
      navigate("/" + name + "/" + category + "/" + value, { replace: true });
    } else {
      setflag(false);
    }
  }

  // Gets called when Name field is empty and we select any category
  const Popup = () => {
    return (
      <>
        <div id="popup-container">
          <h2>Please enter name to start Quiz</h2>
          <button id="close-btn" onClick={() => setflag(true)}>
            Close
          </button>
        </div>
      </>
    );
  };

  return (
    <main>
      {flag === false ? <Popup /> : null}
      <section id="user_detail">
        <div id="logo">
          <p>
            <i
              className="fa-solid fa-book-open"
              style={{ color: "#2051a7", fontSize: "90px" }}
            ></i>
          </p>
          <span>test</span>
          <span className="blue">book</span>
        </div>
        <h2 className="text blue">
          Hello Player
          <i
            className="fa-regular fa-face-smile"
            style={{ color: "black" }}
          ></i>
        </h2>

        <p className="text">Enter your name to continue the Quiz</p>

        <div className="text">
          <input
            type="text"
            placeholder="ENTER YOUR NAME"
            value={name}
            onChange={current_name}
            id="name"
          />
          <button id="button">Enter</button>
        </div>
      </section>
      <section id="category">
        <h1>Select Category</h1>
        <div id="quizes">
          <button onClick={() => question_page("GK", 0)}>GK</button>
          <button onClick={() => question_page("Javascript", 1)}>
            Javascript
          </button>
          <button onClick={() => question_page("Science", 2)}>Science</button>
          <button onClick={() => question_page("Polity", 3)}>Polity</button>
        </div>
      </section>
    </main>
  );
};

export default Homepage;

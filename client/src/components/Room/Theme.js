import updateTheme from "../../controllers/themeController";
import React, { useState, useEffect } from "react";

function Theme(props) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [string, setString] = useState("");

  useEffect(() => {
    if (isFormVisible && document.getElementById("theme-input")) {
      (function () {
        document.getElementById("theme-input").focus();
      })();
    }
    // When the timer is running, the page renders every second.
    // The second parameter here is to prevent the focus being stuck on the input element.
  }, [isFormVisible]);

  function enableForm() {
    if (!props.disabled) {
      setIsFormVisible(true);
    }
  }

  function handleChange(e) {
    setString(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(); // Prevents page redirection.
    updateTheme(props.roomID, string);
    setString("");
    setIsFormVisible(false);
  }

  // function share() {
  //   navigator.clipboard.writeText(
  //     `http://localhost:3000/rooms/${props.roomID}`
  //   );
  //   const shareButton = document.getElementById("share");
  //   shareButton.textContent =
  //     "share the room with your co-workers [link copied!]";
  //   setTimeout(() => {
  //     shareButton.textContent = "share the room with your co-workers";
  //   }, 5000);
  // }

  function copyToClipboard() {
    navigator.clipboard.writeText(
      `http://localhost:3000/rooms/${props.roomID}`
    );
  }

  return (
    <>
      <div
        className={"theme" + (props.disabled ? "-disabled" : "")}
        onClick={enableForm}
      >
        {isFormVisible ? (
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              id='theme-input'
              name='name'
              autoComplete='off'
              placeholder='Enter the proposed theme...'
              value={string}
              onChange={handleChange}
            />
            <button type='submit' style={{ display: "none" }}>
              ok
            </button>
          </form>
        ) : (
          <div>{props.theme}</div>
        )}
      </div>
      <div className='room-share' onClick={copyToClipboard}>
        <span className='material-icons'>edit</span>
        <span className='material-icons'>share</span>
      </div>
    </>
  );
}

export default Theme;

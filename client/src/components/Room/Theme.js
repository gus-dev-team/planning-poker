import updateTheme from "../../controllers/themeController";
import React, { useState, useEffect } from "react";

function Theme(props) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [string, setString] = useState("");

  // Focus on the input field after clicking to edit the room's theme.
  useEffect(() => {
    const themeInput = document.getElementById("theme-input");

    if (isFormVisible && themeInput) {
      (function () {
        themeInput.focus();
      })();
    }
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

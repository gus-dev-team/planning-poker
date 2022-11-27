import "../../App.css";
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

  function handleChange(e) {
    setString(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(); // Prevents page redirection.
    updateTheme(props.roomID, string);
    setString("");
    setIsFormVisible(false);
  }

  return (
    <div className='theme' onClick={() => setIsFormVisible(true)}>
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
        <div>
          issue: {props.theme}
          <span className='material-icons'>edit</span>
        </div>
      )}
    </div>
  );
}

export default Theme;

import "../../App.css";
import React, { useState, useEffect } from "react";

function Theme(props) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [title, setTitle] = useState(props.title);

  useEffect(() => {
    if (isFormVisible && document.getElementById("title-input")) {
      (function () {
        document.getElementById("title-input").focus();
      })();
    }
    // When the timer is running, the page renders every second.
    // The second parameter here is to prevent the focus being stuck on the input element.
  }, [isFormVisible]);

  function handleChange(e) {
    setTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(); // Prevents page redirection.
    setTitle("");
    setIsFormVisible(false);
  }

  return (
    <div className='theme' onClick={() => setIsFormVisible(true)}>
      {isFormVisible ? (
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='name'
            autoComplete='off'
            placeholder='Enter the proposed title...'
            value={title}
            onChange={handleChange}
          />
          <button type='submit' style={{ display: "none" }}>
            ok
          </button>
        </form>
      ) : (
        <div>{title}</div>
      )}
    </div>
  );
}

export default Theme;

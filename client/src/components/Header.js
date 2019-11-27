import React, { Component } from "react";

export default function Header() {
  const submitForm = eventHandler => {
    const recipeName = eventHandler.target.elements.recipeName.value;
    eventHandler.preventDefault();
    console.log(recipeName);
  };
  return (
    <header>
      <div>
        <h1>All You Can Eat</h1>
        <p>About Us</p>
        <form onSubmit={submitForm}>
          <input
            type="text"
            placeholder="search ingredients"
            name="recipeName"
          ></input>
          <button>SEARCH</button>
        </form>
      </div>
    </header>
  );
}

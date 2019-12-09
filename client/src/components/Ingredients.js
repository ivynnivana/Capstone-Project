import React, { Component, useState } from "react";
import axios from "axios";
import Hero from "./Hero";

export default class Ingredients extends Component {
  state = {
    ingredientsInfo: [],
    currentIngredientsInfo: [],
    tempArray: [],
    count: 8,
    start: 1
  };

  nextHandler = eventHandler => {
    eventHandler.preventDefault();
    this.setState({
      tempArray: this.state.currentIngredientsInfo.splice(0, this.state.count)
    });

    console.log("clicked");
  };

  clickHandler = url => () => {
    window.open(url, "_blank");
  };
  submitForm = eventHandler => {
    eventHandler.preventDefault();
    const labelInput = eventHandler.target.label.value;
    const newArray = this.state.ingredientsInfo.map(ingredient =>
      ingredient.label.split(" ")
    );
    let array = newArray.map((lab, index) => {
      console.log(lab);
      const newOb = lab.filter(word => word.toLowerCase() === labelInput);
      if (newOb.length > 0) return index;
    });
    array = array.filter(item => item !== undefined);
    console.log(newArray);
    console.log(array);
    const newIngredientInfo = array.map(
      item => this.state.ingredientsInfo[item]
    );
    console.log(newIngredientInfo);
    this.setState({
      currentIngredientsInfo: newIngredientInfo
    });
  };

  componentDidMount() {
    console.log("component mounted");
    const { count, start } = this.state;
    axios
      .get(`http://localhost:5000/ingredients?count=${count}&start=${start}`)
      .then(answer => {
        console.log(answer.data);

        this.setState({
          ingredientsInfo: answer.data,
          currentIngredientsInfo: answer.data,
          tempArray: answer.data.splice(0, this.state.count)
        });
        console.log(
          this.state.ingredientsInfo.map(ingredient =>
            ingredient.label.split(" ")
          )
        );
      });
  }

  render() {
    console.log(this.state);
    if (this.state.currentIngredientsInfo !== undefined) {
      console.log(this.state.currentIngredientsInfo);
      //   let tempArray = this.state.currentIngredientsInfo.splice(0, 8);

      const ingredientSection = this.state.tempArray.map(ingredient => (
        <div className="individual-card">
          <div className="card-image">
            <img className="image" src={ingredient.image} />
          </div>
          <div className="labels-container">
            <div className="class-label">
              <p>{ingredient.label}</p>
            </div>
            <div className="card-source">
              <p>{ingredient.source}</p>
            </div>
            <div>
              <p className="health-label">{ingredient["healthLabels"]}</p>
            </div>
            <div>
              <button
                className="card-button"
                onClick={this.clickHandler(ingredient.url)}
              >
                View Recipe
              </button>
            </div>
          </div>
        </div>
      ));

      return (
        <>
          <Hero />
          <form
            className="search-bar"
            onSubmit={event => this.submitForm(event)}
          >
            <input
              className="form-input"
              type="text"
              placeholder="Search Recipes..."
              name="label"
            ></input>
            <button type="submit" className="form-button">
              Find Recipes
            </button>
          </form>

          <div className="card">
            <div className="card-container">
              <p className="recipe-title">Recipes</p>
              <button onClick={this.nextHandler}>Next Page</button>
              {ingredientSection}
            </div>
          </div>
        </>
      );
    } else {
      return <h1>Loading</h1>;
    }
  }
}

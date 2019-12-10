import React, { Component, useState } from "react";
import axios from "axios";
import Hero from "./Hero";
import LeftArrow from "../../src/assets/left-arrow.svg";
import RightArrow from "../../src/assets/right-arrow.svg";

export default class Ingredients extends Component {
  constructor(props) {
    super(props);
    this.nextHandler = this.nextHandler.bind(this);
    this.backHandler = this.backHandler.bind(this);
    this.state = {
      ingredientsInfo: [],
      currentIngredientsInfo: [],
      tempArray: [],
      newTempArray: [],
      count: 8,
      start: 1,
      leftArrow: (
        <img
          className="left-arrow"
          onClick={this.backHandler}
          src={LeftArrow}
        />
      ),
      rightArrow: (
        <img
          className="right-arrow"
          onClick={this.nextHandler}
          src={RightArrow}
        />
      )
    };
  }
  nextHandler = eventHandler => {
    eventHandler.preventDefault();
    let array2 = this.state.newTempArray;
    let array1 = this.state.tempArray;
    this.setState(
      {
        tempArray: this.state.currentIngredientsInfo.splice(0, 8),
        newTempArray: array1.concat(array2)
      },
      () => {
        // let array1 = this.state.tempArray;
        //this.setState({ newTempArray: array2.concat(array1) }, () =>
        console.log(this.state.newTempArray);
        //);
      }
    );

    console.log("clicked");
  };
  backHandler = eventHandler => {
    eventHandler.preventDefault();

    this.setState(
      {
        tempArray: this.state.newTempArray.splice(0, 8)
      },
      () => console.log(this.state.newTempArray)
    );
  };

  clickHandler = url => () => {
    window.open(url, "_blank");
  };
  submitForm = eventHandler => {
    eventHandler.preventDefault();
    const labelInput = eventHandler.target.label.value;
    eventHandler.target.reset();
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
    if (newIngredientInfo.length < 8) {
      this.setState({
        leftArrow: "",
        rightArrow: ""
      });
    }

    this.setState({
      tempArray: newIngredientInfo,
      currentIngredientsInfo: newIngredientInfo
    });
  };

  componentDidMount() {
    console.log("ingredients component mounted");
    const { count, start } = this.state;
    axios.get(`http://localhost:5000/ingredients`).then(answer => {
      console.log(answer.data);

      this.setState({
        ingredientsInfo: answer.data,
        currentIngredientsInfo: answer.data.slice(8, answer.data.length),
        tempArray: answer.data.slice(0, this.state.count)
        //newTempArray: answer.data.slice(0, this.state.count)
      });
      //   console.log(
      //     this.state.ingredientsInfo.map(ingredient =>
      //       ingredient.label.split(" ")
      //     )
      //   );
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      console.log("testing CompUpdate");
      console.log(this.state.ingredientsInfo);
      // console.log(this.state.ingredientsInfo.slice(0, this.state.count));
      this.setState(
        {
          tempArray: this.state.ingredientsInfo.slice(0, this.state.count),
          leftArrow: <img className="left-arrow" src={LeftArrow} />,
          rightArrow: (
            <img
              className="right-arrow"
              onClick={this.nextHandler}
              src={RightArrow}
            />
          )
        },
        () => console.log(this.state.tempArray)
      );
    }
  }

  render() {
    console.log("ingredients in render");

    if (this.state.currentIngredientsInfo !== undefined) {
      console.log(this.state.ingredientsInfo);
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

              {this.state.leftArrow}
              {/* <img
                className="right-arrow"
                onClick={this.nextHandler}
                src={RightArrow}
              /> */}
              {this.state.rightArrow}
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

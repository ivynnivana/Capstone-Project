import React, { Component } from "react";

import axios from "axios";

export default class About extends Component {
  state = {
    name: "",
    email: "",
    message: ""
  };

  handleChange = eventHandler => {
    eventHandler.preventDefault();
    this.setState({ [eventHandler.target.name]: eventHandler.target.value });
    console.log(this.handleChange, "clicked");
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("eventHandler.target");
    const { name, email, message } = this.state;
    console.log(this.handleSubmit, "clicked");
    const form = axios.post("/api/form", {
      name,
      email,
      message
    });
  };
  render() {
    return (
      <>
        <h1>Contact Us</h1>
        <p>
          We truly appreciate your questions and/or concerns. Please shoot us an
          email, we would love to hear from you.
        </p>
        <div className="form-container">
          <form onSubmit={this.handleSubmit}>
            <div>
              <div>
                <label htmlFor="name">Name</label>
              </div>
              <div>
                <input
                  type="text"
                  name="name"
                  onChange={event => this.handleChange(event)}
                />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="email">Email</label>
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  onChange={event => this.handleChange(event)}
                />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="message">Message</label>
              </div>
              <div>
                <input
                  type="textarea"
                  name="message"
                  onChange={event => this.handleChange(event)}
                />
              </div>
            </div>
            <button>SUBMIT</button>
          </form>
        </div>
      </>
    );
  }
}

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
        <div className="contact-container">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-para">
            We truly appreciate your questions and/or concerns. Please shoot us
            an email and one of our staff members will get right back to you.
          </p>
          <div className="form-container">
            <form onSubmit={this.handleSubmit}>
              <div className="name-div">
                <div>
                  <label className="name-title" htmlFor="name">
                    Name
                  </label>
                </div>
                <div>
                  <input
                    className="name-input"
                    type="text"
                    name="name"
                    onChange={event => this.handleChange(event)}
                  />
                </div>
              </div>
              <div className="email-div">
                <div>
                  <label className="email-title" htmlFor="email">
                    Email
                  </label>
                </div>
                <div>
                  <input
                    className="email-input"
                    type="email"
                    name="email"
                    onChange={event => this.handleChange(event)}
                  />
                </div>
              </div>
              <div className="message-div">
                <div>
                  <label className="message-title" htmlFor="message">
                    Message
                  </label>
                </div>
                <div>
                  <textarea
                    className="message-input"
                    type="textarea"
                    name="message"
                    onChange={event => this.handleChange(event)}
                  />
                </div>
              </div>
              <button className="contact-button">SUBMIT</button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

import React, { Component } from "react";
import { connect } from "react-redux";
import { register} from "../redux/actions/userActions";
import { Redirect } from "react-router-dom";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    error: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    // Log in
    const { email, password, name } = this.state;
    if ((name === "" || email === "", password === "")) {
      this.setState({ error: "Please Provide All Details" });
    } else {
      await this.props.register({ name, email, password });
      this.props.history.push("/todos");
    }
  };
  render() {
    return this.props.user ? (
      <Redirect to="/" />
    ) : (
      <form className="todo__form" onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleChange}
          value={this.state.name}
          type="name"
          name="name"
          placeholder="name"
          style={{marginTop:"15px"}}
          required
        />
        <br/>
        <input
          onChange={this.handleChange}
          value={this.state.email}
          type="email"
          name="email"
          placeholder="email"
          required
        />
        <br/>
        <input
          onChange={this.handleChange}
          type="password"
          name="password"
          placeholder="********"
          checked={this.state.isCompleted}
          required
        />
        <p>{this.state.error}</p>
        <input type="submit" className="btn btn-warning" value="Register" />
      </form>
    );
  }
}

const mapStateToProps = (storeState) => {
  return { user: storeState.userState.user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (user) => dispatch(register(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
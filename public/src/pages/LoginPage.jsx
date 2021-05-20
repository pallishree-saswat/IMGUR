import React, { Component } from "react";
import "../styles/TodoListCreateForm.css";
import { connect } from "react-redux";
import { logIn } from "../redux/actions/userActions";
import { Redirect } from "react-router-dom";


class Login extends Component {
  state = {
    email: "",
    password: "",
    error:""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({error:""})
  };


  handleSubmit = async e => {
    e.preventDefault();
    // Log in
    const { email, password } = this.state;
    await this.props.logIn({ email, password });
    if(this.props.invalid.length>0){
      this.setState({error:this.props.invalid})
    }
    else{
      this.props.history.push("/");  
    }
  };
  render() {
    return this.props.user ? (
      <Redirect to="/" />
    ) : (
      <form className="todo__form" onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleChange}
          value={this.state.email}
          type="email"
          name="email"
          placeholder="email..."
          style={{marginTop:"15px"}}
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
        <input type="submit" className="btn btn-warning" value="Login" />
      </form>
    );
  }
}

const mapStateToProps = storeState => {
  return { user: storeState.userState.user ,invalid:storeState.userState.invalid};

};

const mapDispatchToProps = dispatch => {
  return {
    logIn: user => dispatch(logIn(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

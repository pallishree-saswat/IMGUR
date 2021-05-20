import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPHOTO } from "../redux/actions/myActions";
import MyPhoto from "../components/MyPhoto";
class HomePage extends Component {
  componentDidMount() {
    this.props.fetchPHOTO();
  }

  render() {
    return (
      <div>
        <MyPhoto />
      </div>
    );
  }
}

const mapStateToProps = (storeState) => {
  return {
    user: storeState.userState.user,
  };
};

export default connect(mapStateToProps, { fetchPHOTO })(HomePage);

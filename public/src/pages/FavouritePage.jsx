import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchFav } from "../redux/actions/favActions";
import FavDetail from "../components/FavDetail";
class HomePage extends Component {
  componentDidMount() {
    this.props.fetchFav();
  }

  render() {
    return (
      <div>
        <FavDetail />
      </div>
    );
  }
}

const mapStateToProps = (storeState) => {
  return {
    user: storeState.userState.user,
  };
};

export default connect(mapStateToProps, { fetchFav })(HomePage);

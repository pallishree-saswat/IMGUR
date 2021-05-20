import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchHomeImages } from "../redux/actions/imageActions";
import Images from "../components/Images";
class HomePage extends Component {
  componentDidMount() {
    this.props.fetchHomeImages();
  }

  render() {
    return (
      <div>
        <Images />
      </div>
    );
  }
}

const mapStateToProps = (storeState) => {
  return {
    user: storeState.userState.user,
  };
};

export default connect(mapStateToProps, { fetchHomeImages })(HomePage);

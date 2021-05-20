import React from "react";
import ImageListItem from "./ImageListItem";
import { CardDeck } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
const Images = ({ Images, history }) => {
  return (
    <>
      <CardDeck style={{ marginRight: "auto" }}>
        {Images !== null ? (
          Images.map((image) => (
            <ImageListItem
              key={image.id}
              image={image}
            />
          ))
        ) : (
          <div className="loader">Loading...</div>
        )}
      </CardDeck>
    </>
  );
};

const mapStateToProps = (storeState) => {
  return {
    Images: storeState.imageState.image
  };
};
export default withRouter(connect(mapStateToProps)(Images));

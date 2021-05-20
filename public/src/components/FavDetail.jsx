import React from "react";
import FavListItem from "./FavListItem";
import { CardDeck } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
const Fav = ({ fav, history }) => {
  console.log(fav);
  return (
    <>
      {fav === "No Favourite" ? (
        <h2>No favourite yet</h2>
      ) : (
        <CardDeck style={{ marginRight: "auto" }}>
          {fav !== null ? (
            fav.map((video) => (
              <FavListItem
                key={video.id}
                video={video.photoDetail}
                id={video.id}
              />
            ))
          ) : (
            <div className="loader">Loading...</div>
          )}
        </CardDeck>
      )}
    </>
  );
};

const mapStateToProps = (storeState) => {
  return {
    fav: storeState.favState.fav,
  };
};
export default withRouter(connect(mapStateToProps)(Fav));

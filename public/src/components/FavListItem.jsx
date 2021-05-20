import React from "react";
import { Card } from "react-bootstrap";
import SimpleImageSlider from "react-simple-image-slider";
import { connect } from "react-redux";
import { removeFav } from "../redux/actions/favActions";
const FavListItem = ({ video, addFav,id,removeFav }) => {
  const images = [];
  for (let i = 0; i < video.url.length; i++) {
    images.push({ url: video.url[i] });
  }
  console.log(images);
  return (
    <Card
      style={{
        flexBasis: "360px",
        marginBottom: "10px",
        marginTop: "40px",
        marginLeft: "auto",
      }}
    >
      <SimpleImageSlider
        style={{ width: "100%" }}
        width="100%"
        height={260}
        images={images}
      />
      <Card.Body>
        <Card.Title>{video.title}</Card.Title>
        <Card.Text>{video.description}</Card.Text>
        {video.privacy === "private" ? (
          <span role="img" aria-label="">
            🔒
          </span>
        ) : (
          <span aria-label="" role="img">
            🌎
          </span>
        )}
        <br></br>
        <br></br>
        <button
          onClick={() => {
              console.log(id)
            removeFav(id);
          }}
          className="btn btn-warning"
        >
          Remove From Favourite
        </button>
      </Card.Body>
    </Card>
  );
};

export default connect(null, { removeFav })(FavListItem);

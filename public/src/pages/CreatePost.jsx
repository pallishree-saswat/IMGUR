import React, { Component } from "react";
import axios from "axios";
import config from "../config";
import { withRouter } from 'react-router'


class createPost extends Component {
  state = {
    selectedFiles: null,
    title: '',
    description: '',
    isCompleted:false
  };

  handleTitle = (e) => {
      
    this.setState({ title: e.target.value });
  };
  handleDesc = (e) => {
    this.setState({ description: e.target.value });
  };

  handleIsCompleted = (e) => {
    this.setState({ isCompleted: e.target.checked });
  };

  onChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files,
    });
  };

  handleImageUpload = async (e) => {
    e.preventDefault()
    if(this.state.title===''||this.state.description===''||!this.state.selectedFile){
        console.log('Add all fields')
    }
    else{
        const data = new FormData();
        for (var x = 0; x < this.state.selectedFile.length; x++) {
          data.append("file", this.state.selectedFile[x]);
        }
        this.state.isCompleted === false ? data.append('privacy','public') : data.append('privacy','private')
        data.append("title", this.state.title);
        data.append("description", this.state.description);
        const accessToken = JSON.parse(localStorage.getItem("user"));
        const { data: newD } = await axios.post(
          `${config.BASE_URL}/user/imageupload/${accessToken.user.accessToken}`,
          data
        );
        console.log(newD);
        this.props.history.push('/')
    }
    
  };
  render() {
    return (
      <form style={{ marginTop: "150px" }}>
        <div className="form-group">
          <input
            type="text"
            onChange={this.handleTitle}
            value={this.state.title}
            placeholder="title"
            name="title"
            required
          ></input>
          <input
            onChange={this.handleDesc}
            value={this.state.description}
            type="text"
            placeholder="description"
            name="description"
            required
          ></input>
          <br></br>
          <input
            onChange={this.handleIsCompleted}
            type="checkbox"
            name="isCompleted"
            checked={this.state.isCompleted}
          /> Check this to make it private
          <input
            type="file"
            className="form-control"
            multiple
            onChange={this.onChangeHandler}
            required
          />
        </div>
        <input
          type="submit"
          className="btn btn-warning"
          onClick={this.handleImageUpload}
          value='Upload'
        >
        </input>
      </form>
    );
  }
}

export default withRouter(createPost)

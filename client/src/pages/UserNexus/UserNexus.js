import React from 'react';
// import tabs
import Tabs from "../../components/UserNexus/Tabs"
// import editprofile
// import EditProfile from "../../components/UserNexus/EditProfile"
// import editgames
// import EditGame from "../../components/UserNexus/EditGame"
import { Input, TextArea, FormBtn } from "../../components/Form";
import { Row, Col, Container } from "../../components/Grid"
import API from "../../utils/API";
import Authenticator from '../../utils/Authenticator';
import AvatarUpload from "./AvatarUpload";
import "./UserNexus.css";

// Refer to this image for what edit profile looks like: https://i.imgur.com/iaBGqD1.jpg
class UserNexus extends React.Component {
  state = {
    location: "Edit Profile",
    Username: "",
    Banner: "",
    Bio: ""
  };

  formPopulate = ()=>{
    if(Authenticator.isAuthenticated){
      API.getUser(Authenticator.user.id)
      .then(res => {
        this.setState({
          Username: res.data.username,
          Banner: res.data.postBanner,
          Bio: res.data.bio
        })
      })
    }
  }

  handleTabClick = (event) => {
    const name = (event.target.getAttribute("name"))
    const value = (event.target.getAttribute("value"))
    console.log(name)
    console.log(value)
    this.setState({
      [name]: value
    })
    console.log(this.state.location);
  };

  handleSubmitEditProfile = (event) =>{
    event.preventDefault();
    if(Authenticator.isAuthenticated){
      const formData = new FormData(event.target);
      let userId = Authenticator.user.id
      formData.append("userId", userId)
      API.editProfile(formData)
      .then(res => {
        console.log(res)
        window.location.assign("/profile/"+Authenticator.user.id)
      })
      .catch(err => {
        console.log(err)
      })

  };
  }
  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  componentDidMount(){
    this.formPopulate()
  }

  render() {

    if (this.state.location === "Edit Profile") {
      return (
        <div>
          <Tabs handleTabClick={this.handleTabClick} />
          <form encType="multipart/form-data" id="editProfileForm" onSubmit={this.handleSubmitEditProfile}>
            <h3>Edit Profile</h3>
            <hr />
            <p>avatar image:</p>
            <div id="formAvatarContainer">
              <AvatarUpload
                name="Avatar"
              >
                Upload avatar image
              </AvatarUpload>
            </div>
            <br></br>
            <p>username:</p>
            <Input
              name="Username"
              value={this.state.Username}
              onChange = {this.handleInputChange}
            />
            <p>bio:</p>
            <textarea
              name="Bio"
              value={this.state.Bio}
              onChange = {this.handleInputChange}
            />
            <p>forum post banner:</p>
            <textarea
              name="Banner"
              value={this.state.Banner}
              onChange = {this.handleInputChange}
            />
            <br></br>
            <br></br>
            <input className="nexus-button" type="submit" />
          </form>
        </div>
      )
    }
    else if (this.state.location === "Game") {
      return (
        <div>
          <Tabs handleTabClick={this.handleTabClick} />
          <h1>Game</h1>
        </div>
      )
    }
    else if (this.state.location === "Posts") {
      return (
        <div>
          <Tabs handleTabClick={this.handleTabClick} />
          <h1>Posts</h1>
        </div>
      )
    }
  };
};


export default UserNexus;
// export default UserNexusGames;
// export default UserNexusPosts




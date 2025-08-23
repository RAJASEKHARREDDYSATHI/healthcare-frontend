import React, { Component } from 'react';
import { BASEURL, callApi, getSession } from './api';
import './Profile.css'; // Import the CSS file

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      role: '',
      email: '', // Add email to the state
      activeComponent: '',
    };
    this.showFullname = this.showFullname.bind(this);
  }

  componentDidMount() {
    let csr = getSession("csrid");
    if (csr === "") {
      this.logout(); // Assuming you have a logout function
      return; // Important to stop further execution if logged out
    }
    let data = JSON.stringify({ csrid: csr });
    callApi("POST", BASEURL + "users/getfullname", data, this.showFullname);
  }

  showFullname(response) {
    const parts = response.split('::');
    if (parts[0] === '200') {
      this.setState({
        fullname: parts[1],
        role: parts[2],
        email: parts[3],
      });
      console.log('Profile Info:', {
        fullname: parts[1],
        role: parts[2],
        email: parts[3],
      });
    } else if (parts[0] === '401') {
      console.error('Token Expired:', parts[1]);
      // Handle token expiration (e.g., redirect to login)
    } else {
      console.error('Error fetching profile info:', response);
      // Handle other errors
    }
  }

  render() {
    const { fullname, role, email } = this.state;
    return (
      <div className='profile-info-container'> {/* Changed class name for clarity */}
        <h2>Profile Information</h2> {/* Added a heading */}
        <div className='info-item'>
          <label>Full Name:</label>
          <span>{fullname}</span>
        </div>
        <div className='info-item'>
          <label>Role:</label>
          <span>{role}</span>
        </div>
       
          <div className='info-item'>
            <label>Email:</label>
            <span>{email}</span>
          </div>
      
        {/* You can add more profile information here */}
      </div>
    );
  }
}
import React, { Component } from 'react'
import './Dashboard.css';
import { BASEURL, callApi, getSession, setSession } from './api';
import MenuBar from './MenuBar';
import DoctorAppointment from './DoctorAppointment';
import Patientbooking from './Patientbooking';
import Profile from './Profile';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { fullname: '', activeComponent: '' };
    this.showFullname = this.showFullname.bind(this);
    this.loadComponent = this.loadComponent.bind(this);
  }
  componentDidMount() {
    let csr = getSession("csrid");
    if (csr === "")
      this.logout();
    let data = JSON.stringify({ csrid: csr });
    callApi("POST", BASEURL + "users/getfullname", data, this.showFullname);
  }
  showFullname(response) {
    const parts = response.split('::');
    if (parts[0] === '200') {
      const fullName = parts[1];
      this.setState({ fullname: fullName }); // Display the entire full name
    } else if (parts[0] === '401') {
      console.error('Token Expired:', parts[1]);
      this.logout(); // Or handle token expiration appropriately
    } else {
      console.error('Error fetching full name:', response);
    }
  }
  logout() {
    setSession("csrid", "", -1);
    window.location.replace("/");
  }
  loadComponent(mid) {
    let components = {
      "1": <Patientbooking />,
      "2": <DoctorAppointment loggedInFullname={this.state.fullname}/>,
      "3": <Profile />
    };
    this.setState({ activeComponent: components[mid] });
  }
  render() {
    const { fullname, activeComponent } = this.state;
    return (
      <div className='dashboard'>
        <div className='header'>
    <div className='logo-container'>
        <img className='logo' src='/logo.png' alt='' />
        <div className='logoText'>Health <span>Care</span></div>
    </div>
    <div className='user-section'>
        <label>{fullname}</label>
        <img className='logout' onClick={() => this.logout()} src='/logout.png' alt='' />
    </div>
</div>
        <div className='menu'><MenuBar onMenuClick={this.loadComponent} /></div>
        <div className='outlet'>{activeComponent}</div>
      </div>
    )
  }
}
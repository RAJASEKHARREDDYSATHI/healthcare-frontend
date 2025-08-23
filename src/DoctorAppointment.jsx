import React, { Component } from 'react';
import { BASEURL, callApi, getSession } from './api';
import './DoctorAppointment.css';

class DoctorAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            loading: true,
            error: null,
        };
        this.fetchAppointments = this.fetchAppointments.bind(this);
    }

    componentDidMount() {
        this.fetchAppointments();
    }

    fetchAppointments() {
        this.setState({ loading: true, error: null });
        const csr = getSession("csrid");
        if (!csr) {
            this.setState({ loading: false, error: "User not logged in." });
            return;
        }

        const { loggedInFullname } = this.props; // Get loggedInFullname from props
        const url = `${BASEURL}appoint/doctor/appointments/${loggedInFullname}`;

        callApi(
            "GET",
            url,
            null,
            (response) => {
                try {
                    const appointmentsData = JSON.parse(response);
                    this.setState({ appointments: appointmentsData, loading: false });
                } catch (e) {
                    this.setState({ error: "Error parsing API response: " + e.message, loading: false });
                }
            },
            (errorMessage) => {
                this.setState({ error: errorMessage, loading: false });
            }
        );
    }

    render() {
        const { appointments, loading, error } = this.state;
        const { loggedInFullname } = this.props;

        if (loading) {
            return <div className="loading-message">Loading appointments...</div>;
        }

        if (error) {
            return <div className="error-message">Error: {error}</div>;
        }

        return (
            <div className="doctor-appointments-container">
                <h2>Your Appointments</h2>
                {appointments.length === 0 ? (
                    <p>No appointments scheduled for {loggedInFullname}.</p>
                ) : (
                    <table className="appointments-table">
                        <thead>
                            <tr>
                                <th>Patient Name</th>
                                <th>Phone Number</th>
                                <th>Disease</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Previous Reports</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td>{appointment.patientName}</td>
                                    <td>{appointment.phoneNumber}</td>
                                    <td>{appointment.disease}</td>
                                    <td>{appointment.appointmentDate}</td>
                                    <td>{appointment.slotTime}</td>
                                    <td>
                                        {appointment.reportPath ? (
                                            <a href={appointment.reportPath} target="_blank" rel="noopener noreferrer">
                                                View Report
                                            </a>
                                        ) : (
                                            <span>No Report</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

export default DoctorAppointment;
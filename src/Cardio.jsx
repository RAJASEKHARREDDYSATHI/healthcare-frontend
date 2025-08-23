import React, { Component } from 'react';
import './Cancer.css';
import { BASEURL, callApi, getSession, setSession } from './api';

export default class Cancer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            selectedDate: '',
            selectedSlot: '',
            showModal: false,
            patientName: '',
            phoneNumber: '',
            hasPreviousReports: true, // Set to true to show the input field
            reportLink: '', // To store the OneDrive link
        };
    }

    componentDidMount() {
        const csr = getSession("csrid");
        if (!csr) {
            this.logout();
            return;
        }
        const data = JSON.stringify({ csrid: csr });
        callApi("POST", BASEURL + "users/getfullname", data, this.showFullname);
    }

    showFullname = (response) => {
        const parts = response.split('::');
        if (parts.length > 1) {
            this.setState({ fullname: parts[1] }); // Extract the fullname
        } else {
            console.error('Invalid fullname response:', response);
        }
    };

    logout = () => {
        setSession("csrid", "", -1);
        window.location.replace("/page1");
    };

    handleSlotClick = (slot) => {
        this.setState({ selectedSlot: slot });
    };

    handleSubmit = () => {
        const { selectedSlot, selectedDate } = this.state;

        if (!selectedDate) {
            alert("Please select a date before submitting.");
            return;
        }

        if (!selectedSlot) {
            alert("Please select a slot before submitting.");
            return;
        }

        this.setState({ showModal: true });
    };

    handleConfirmBooking = () => {
        const { patientName, phoneNumber, selectedSlot, selectedDate, reportLink } = this.state;

        if (!patientName || !phoneNumber) {
            alert("Please enter both name and phone number.");
            return;
        }

        if (!/^\d{10}$/.test(phoneNumber)) {
            alert("Phone number must be exactly 10 digits.");
            return;
        }

        const formData = new FormData();
        formData.append('patientName', patientName);
        formData.append('phoneNumber', phoneNumber);
        formData.append('doctorName', "Dr.V Subramanyam");
        formData.append('disease', "Cardiology");
        formData.append('appointmentDate', selectedDate);
        formData.append('slotTime', selectedSlot);

        // Append the OneDrive link
        formData.append('reportLink', reportLink); // 'reportLink' will be the key on the backend

        callApi("POST", BASEURL + "appoint/book", formData, (response) => {
            alert(`✅ Appointment confirmed for ${patientName}!\nPhone: ${phoneNumber}\nDate: ${selectedDate}\nSlot: ${selectedSlot}${reportLink ? `\nReport Link: ${reportLink}` : ''}`);

            this.setState({
                selectedSlot: '',
                selectedDate: '',
                showModal: false,
                patientName: '',
                phoneNumber: '',
                reportLink: '',
            });
        });
    };

    handleReportLinkChange = (event) => {
        this.setState({ reportLink: event.target.value });
    };

    render() {
        const { fullname, selectedSlot, selectedDate, showModal, patientName, phoneNumber, hasPreviousReports, reportLink } = this.state;

        return (
            <div className='page-container'>
                {/* Header */}
                <div className='header'>
                    <div className='logo-container'>
                        <img className='logo' src='/logo.png' alt='Logo' />
                        <div className='logoText'>Health <span>Care</span></div>
                    </div>
                    <div className='user-section'>
                        <label>{fullname}</label>
                        <img className='logout' onClick={this.logout} src='/logout.png' alt='Logout' />
                    </div>
                </div>

                {/* Body */}
                <div className='body-container'>
                    <div className='left-panel'>
                        <h2 className='section-title'>CARDIOLOGY</h2>

                        <div className='booking-info'>
                            <div className='book-label'>BOOK YOUR SLOTS</div>
                            <div className='doctor-name'>Dr.V Subramanyam</div>
                        </div>

                        <div className='date-picker-section'>
                            <label>Select Date:</label>
                            <input
                                type='date'
                                value={selectedDate}
                                onChange={(e) => this.setState({ selectedDate: e.target.value })}
                            />
                        </div>

                        {/* ✅ Static slot buttons */}
                        <div className='slot-grid'>
                            <button className={`slot-btn ${selectedSlot === '9:30' ? 'selected' : ''}`} onClick={() => this.handleSlotClick('9:30')}>9:30</button>
                            <button className={`slot-btn ${selectedSlot === '10:00' ? 'selected' : ''}`} onClick={() => this.handleSlotClick('10:00')}>10:00</button>
                            <button className={`slot-btn ${selectedSlot === '10:30' ? 'selected' : ''}`} onClick={() => this.handleSlotClick('10:30')}>10:30</button>
                            <button className={`slot-btn ${selectedSlot === '11:00' ? 'selected' : ''}`} onClick={() => this.handleSlotClick('11:00')}>11:00</button>
                            <button className={`slot-btn ${selectedSlot === '11:30' ? 'selected' : ''}`} onClick={() => this.handleSlotClick('11:30')}>11:30</button>
                            <button className={`slot-btn ${selectedSlot === '2:30' ? 'selected' : ''}`} onClick={() => this.handleSlotClick('2:30')}>2:30</button>
                            <button className={`slot-btn ${selectedSlot === '3:00' ? 'selected' : ''}`} onClick={() => this.handleSlotClick('3:00')}>3:00</button>
                            <button className={`slot-btn ${selectedSlot === '3:30' ? 'selected' : ''}`} onClick={() => this.handleSlotClick('3:30')}>3:30</button>
                        </div>

                        <div className='submit-section'>
                            <button className='submit-btn' onClick={this.handleSubmit}>
                                Book Appointment
                            </button>
                        </div>
                    </div>

                    <div className='right-panel'>{/* Optional content */}</div>
                </div>

                {/* Modal */}
                {showModal && (
                    <div className='modal-overlay'>
                        <div className='modal-content'>
                            <h3>Appointment Details</h3>

                            <label>Patient Name:</label>
                            <input
                                type='text'
                                value={patientName}
                                onChange={(e) => this.setState({ patientName: e.target.value })}
                            />

                            <label>Phone Number:</label>
                            <input
                                type='text'
                                maxLength='10'
                                value={phoneNumber}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d{0,10}$/.test(value)) {
                                        this.setState({ phoneNumber: value });
                                    }
                                }}
                            />

                            <label>Doctor:</label>
                            <input type='text' value='Dr.V Subramanyam' readOnly />

                            <label>Disease:</label>
                            <input type='text' value='Cardiology' readOnly />

                            <label>Date:</label>
                            <input type='text' value={selectedDate} readOnly />

                            <label>Time Slot:</label>
                            <input type='text' value={selectedSlot} readOnly />

                            {/* ✅ Previous Reports Section for Link */}
                            {hasPreviousReports && (
                                <div className='previous-reports-upload'>
                                    <label>Link to Previous Reports (OneDrive, etc.):</label>
                                    <input
                                        type="text"
                                        value={reportLink}
                                        onChange={this.handleReportLinkChange}
                                        placeholder="Paste the OneDrive link here"
                                    />
                                </div>
                            )}

                            <div className='modal-buttons'>
                                <button onClick={this.handleConfirmBooking}>Confirm</button>
                                <button onClick={() => this.setState({ showModal: false })}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
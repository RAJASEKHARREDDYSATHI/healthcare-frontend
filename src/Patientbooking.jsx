import React, { Component } from 'react';
import './Patientbooking.css';

export default class Patientbooking extends Component {
    handleSelect = (disease) => {
        window.location.href = `/${disease}`; // Navigation logic remains the same
    };

    render() {
        return (
            <div className="patient-booking-container">
                <h2 className="booking-title">SELECT YOUR PROBLEM</h2>
                <div className="problem-grid">
                    <div className="problem-card" onClick={() => this.handleSelect('Cancer')}>
                        <span className="problem-name">Cancer</span>
                        <button className="select-button">Select</button>
                    </div>
                    <div className="problem-card" onClick={() => this.handleSelect('Kidney')}>
                        <span className="problem-name">Kidney Disorders</span>
                        <button className="select-button">Select</button>
                    </div>
                    <div className="problem-card" onClick={() => this.handleSelect('Cardio')}>
                        <span className="problem-name">Cardiovascular Diseases</span>
                        <button className="select-button">Select</button>
                    </div>
                    <div className="problem-card" onClick={() => this.handleSelect('Neuro')}>
                        <span className="problem-name">Neurological Disorders</span>
                        <button className="select-button">Select</button>
                    </div>
                    <div className="problem-card" onClick={() => this.handleSelect('Ortho')}>
                        <span className="problem-name">Orthopedic Problem</span>
                        <button className="select-button">Select</button>
                    </div>
                    {/* You can add more disease options here */}
                </div>
            </div>
        );
    }
}
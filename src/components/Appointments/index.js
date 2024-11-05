// Write your code here
import React, {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    isStarredFilterActive: false,
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: dateInput,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  toggleStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(appointment => {
        if (appointment.id === id) {
          return {...appointment, isStarred: !appointment.isStarred}
        }
        return appointment
      }),
    }))
  }

  toggleStarredFilter = () => {
    this.setState(prevState => ({
      isStarredFilterActive: !prevState.isStarredFilterActive,
    }))
  }

  render() {
    const {titleInput, dateInput, appointmentsList, isStarredFilterActive} = this.state

    const filteredAppointmentsList = isStarredFilterActive
      ? appointmentsList.filter(appointment => appointment.isStarred)
      : appointmentsList

    return (
      <div className="appointments-app">
        <div className="appointments-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            alt="appointments"
            className="appointments-img"
          />
          <h1 className="heading">Add Appointment</h1>
          <form className="appointment-form" onSubmit={this.onAddAppointment}>
            <label htmlFor="title" className="input-label">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="input"
              value={titleInput}
              onChange={e => this.setState({titleInput: e.target.value})}
            />
            <label htmlFor="date" className="input-label">
              Date
            </label>
            <input
              type="date"
              id="date"
              className="input"
              value={dateInput}
              onChange={e => this.setState({dateInput: e.target.value})}
            />
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
          <hr className="separator" />
          <div className="appointments-header">
            <h1 className="heading">Appointments</h1>
            <button
              type="button"
              className={`filter-button ${isStarredFilterActive ? 'active' : ''}`}
              onClick={this.toggleStarredFilter}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-list">
            {filteredAppointmentsList.map(appointment => (
              <AppointmentItem
                key={appointment.id}
                appointmentDetails={appointment}
                toggleStarred={this.toggleStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments

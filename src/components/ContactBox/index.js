import React, { Component } from 'react'
import axios from 'axios'
import './index.css'

const GOOGLE_FORM_MESSAGE_ID = 'entry.1249636003'
const GOOGLE_FORM_EMAIL_ID = 'entry.1157005188'
const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLScJX66KS2GUD1Ci-piKoPbsracqXFjJr7kSWd3yAin_vgk7OQ/formResponse'

class ContactBox extends Component {
  constructor(props){
    super(props)
    this.state = { 
      message: '', 
      email: '', 
      showForm: false,
      sendingMessage: false,
      messageSent: false
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      sendingMessage: true
    })
    this.sendMessage()
  }

  handleFormToggle = () => {
    this.setState( 
      (prevState) => {
        const { showForm } = prevState
        return {
          showForm: !showForm
        } 
      }
    )
  }

  handleReturnButton = () => {
    this.setState(
      {
        showForm: false,
        messageSent: false
      }
    )
  }

  sendMessage = () => {
    const formData = new FormData()
    formData.append(GOOGLE_FORM_MESSAGE_ID, this.state.message)
    formData.append(GOOGLE_FORM_EMAIL_ID, this.state.email)

    axios.post(GOOGLE_FORM_ACTION,formData)
      .then(() => {
        this.setState({ 
          messageSent: true,
          sendingMessage: false,
          message: '',
          email: ''
        })
      }).catch(() => {
        // eslint-disable-next-line no-console
        console.log('erro')
      })
  }

  render() {
    if(this.state.sendingMessage){
      return(
        <div>Sending...</div>
      )
    }

    if(this.state.messageSent){
      return(
        <React.Fragment>
          <div className='success-message'>Sent! I will respond asap</div>
          <button id='return-button' className='btn btn-xs' onClick={this.handleReturnButton}>Return</button>
        </React.Fragment>
      )
    }

    if(this.state.showForm === false){
      return(
        <button id='contact-button' className='btn btn-sm' onClick={this.handleFormToggle}>Contact</button>
      )
    }

    return(
      <React.Fragment>
        <div className='form-container'>
          <form onSubmit={this.handleSubmit}>
            <div className='form-group row'>
              <label htmlFor='email' className='col-sm-4 col-form-label'>
                Email:
              </label>
              <div className='col-sm-8'>
                <input 
                  type='email' 
                  name='email'
                  id='email'
                  className='form-control'
                  value={this.state.email} 
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>
            <div className='form-group row'>
              <label htmlFor='message' className='col-sm-4 col-form-label'>
                Message:
              </label>
              <div className='col-sm-8'>
                <textarea 
                  id='message'
                  name='message'
                  className='form-control'
                  required
                  value={this.state.message} 
                  onChange={this.handleChange} 
                />
              </div>
            </div>
            <div>
              <button type='button' id='cancel-button' className='btn btn-default btn-sm btn-action' onClick={this.handleFormToggle}>Cancel</button>
              <button type='submit' className='btn btn-sm btn-default btn-action'>Submit</button>
            </div>
          </form>
        </div>
      </React.Fragment>
    )
  }
}

export default ContactBox
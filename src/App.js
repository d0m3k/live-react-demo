import React from 'react';
import logo from './logo.svg';
import './App.css';

// We could/should keep all classes in separate source files for clarity in PROD way of living

class InputList extends React.Component {
  render () {
    const inputs = this.props.inputs.map(input => (
      <li key={input}>{input}</li>
    ))
    return (
      <div className="inputs">
        {inputs}
      </div>
    )
  }
}

class InputForm extends React.Component {
  render () {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <input type="text" onChange={this.props.handleChange} value={this.props.currentText}></input>
        <input type="submit"></input>
      </form>
    )
  }
}

class TextHolder extends React.Component {
  constructor() {
    super()
    this.state = {currentText: '', inputs: JSON.parse(localStorage.getItem('inputs')) || []}
  }

  handleChange = (e) => { // BINDINGS ARE LOL, alternative: this.handleClick = this.handleClick.bind(this); in constructor
    this.setState({currentText: e.target.value})
  }

  handleSubmit = (e) => {
    this.setState((state,props) => {
      const inputs = [state.currentText, ...state.inputs] // Asynchronous call would break it if you tried to set LocalStorage in handleSubmit outside setState
      localStorage.setItem('inputs', JSON.stringify(inputs))
      return ({
        currentText: '',
        inputs: inputs
    })})
    e.preventDefault()
  }

  render() {
    return (
      <div className='adders'>
        <div className="funnyAdder">
          <InputForm currentText={this.state.currentText} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        </div>
        <div className="inputList">
          <InputList inputs={this.state.inputs}/>
        </div>
      </div>
    )
  }
}

function App() {
    return (
      <div className="App">
        <header className="App-header">
          <TextHolder/>
        </header>
      </div>
    )
}


export default App;

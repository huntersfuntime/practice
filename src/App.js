import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      body: 'content here',
      customerIds: [{id: 1, name: 'Gary'}],
      filter: 'individual',
      subject: 'some random subject',
      customerStatus: [{id: 'active_payment', name: 'Active'}],
      customerList: '',
      customerStatuses: ''
    }

    // this is the props being brough in

    this.customerIndividuals = [['Gary', 1], ['Larry', 2], ['Hary', 3]]
    this.customerGroups = [['Active', 'active'], ['Past Due', 'past_due']]
  }

  handleSubmit = event => {
    event.preventDefault()
    let customer_notification_batch = {
      body: this.state.body,
      customer_status: this.state.customerStatus,
      filter: this.state.filter,
      subject: this.state.subject,
      customer_ids: this.state.customerIds
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          
          <p>
            Test
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
// form data needed
// body: string
// customer_status: string ('active')   
// filter: this.state.filter, string ('group')
// subject: this.state.subject, string ('subject')
// customer_ids: this.state.customerIds, array [1, 2, 3]


export default App;

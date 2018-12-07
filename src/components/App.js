import React, { Component } from "react"
import "./App.css"
import { Dropdown } from "../Dropdown"

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            body: "",
            subject: "",
            filter: "",
            selections: new Map(),
        }
        this.group = this.props.groups.map((_group) => {
            return { name: _group[0], id: _group[1], count: this.props[`${_group[1]}_count`] }
        })
        this.individual = this.props.customers.map((_customer) => ({ name: _customer[0], id: _customer[1], count: 1, state: "texas" }))
    }

    selectionIds = () => (this.state.selections.size > 0 ? Array.from(this.state.selections.keys()) : [])

    selections = () => (this.state.selections.size > 0 ? Array.from(this.state.selections.values()) : [])

    isSelected = (key) => this.state.selections.has(key)

    getRecipientTotal = () =>
        this.selections().length > 0
            ? this.selections()
                  .map((_selection) => _selection.count)
                  .reduce((_previousVal, _currentVal) => _previousVal + _currentVal)
            : 0

    handleUpdateState = (_key, _value) => this.setState({ [_key]: _value })

    handleSelectFilter = (_filter) => this.setState({ filter: _filter, selections: new Map() })

    handleAddSelection = (_selection) => this.setState({ selections: this.state.selections.set(_selection.id, _selection) })

    handleSubmit = () => {
        this.formIsValid()
            ? console.log("DATA TO SUBMIT", {
                  body: this.state.body,
                  filter: this.state.filter,
                  customer_status: this.state.filter === "group" ? this.selectionIds() : [],
                  subject: this.state.subject,
                  customer_ids: this.state.filter === "individual" ? this.selectionIds() : [],
              })
            : console.log("nice try sucker")
    }

    formIsValid = () => {
        //  all form validations

        let isValid = true

        if (this.state.selections.size === 0) {
            isValid = false
        }

        if (this.state.subject.length === 0) {
            isValid = false
        }

        if (this.state.body.length === 0) {
            isValid = false
        }

        return isValid
    }

    // handleSubmit = event => {
    //   event.preventDefault()
    //   let customer_notification_batch = {
    //     body: this.state.body,
    //     customer_status: this.state.customerStatus,
    //     filter: this.state.filter,
    //     subject: this.state.subject,
    //     customer_ids: this.state.customerIds
    //   }
    // }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p>Test</p>
                    <div>
                        To:{" "}
                        {this.selections().map((_value, _index) => (
                            <li key={_index}>{_value.name}</li>
                        ))}
                        <p>{this.getRecipientTotal()} recipients selected</p>
                    </div>
                    <form>
                        <label>message type</label>
                        <br />
                        <input type="radio" value="group" name="filter" checked={this.state.filter === "group"} onChange={(e) => this.handleSelectFilter("group")} /> group <br />
                        <input type="radio" value="individual" name="filter" checked={this.state.filter === "individual"} onChange={(e) => this.handleSelectFilter("individual")} /> individual <br />
                        <Dropdown default={"default"} options={this[this.state.filter] || []} onChange={this.handleAddSelection} isSelected={this.isSelected} />
                        <br />
                        <label>body: </label>
                        <input type="text" value={this.state.body} onChange={(e) => this.handleUpdateState("body", e.target.value)} />
                        <br />
                        <label>subject: </label>
                        <input type="text" value={this.state.subject} onChange={(e) => this.handleUpdateState("subject", e.target.value)} />
                        <br />
                        <br />
                        <input type={"button"} onClick={this.handleSubmit} disabled={!this.formIsValid()} value={"submit"} />
                    </form>
                </header>
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        )
    }
}

// form data needed
// body: string
// customer_status: string ('active')
// filter: this.state.filter, string ('group')
// subject: this.state.subject, string ('subject')
// customer_ids: this.state.customerIds, array [1, 2, 3]

export default App

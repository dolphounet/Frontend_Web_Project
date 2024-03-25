// Accounts.js
import React, { Component } from 'react';
import 'whatwg-fetch';
import AccountList from './AccountList';

class Accounts extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      error: null,
      account: '',
      mdp: ''
    };
    this.pollInterval = null;
  }

  componentDidMount() {
    this.loadAccountsFromServer();
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadAccountsFromServer, 2000);
    }
  }

  componentWillUnmount() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  onChangeText = (e) => {
    const newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  submitNewAccount = (e) => {
    e.preventDefault();
    const { account, mdp } = this.state;
    const data = [...this.state.data, { account, mdp, _id: Date.now().toString() }];
    this.setState({ data });
    fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ account, mdp }),
    }).then(res => res.json()).then((res) => {
      if (!res.success) this.setState({ error: res.error.message || res.error });
      else this.setState({ account: '', mdp: '', error: null });
    });
  }

  loadAccountsFromServer = () => {
    fetch('/api/comments/')
      .then(data => data.json())
      .then((res) => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ data: res.data });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="comments">
          <h2>Accounts:</h2>
          <AccountList data={this.state.data} />
        </div>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}

export default Accounts;
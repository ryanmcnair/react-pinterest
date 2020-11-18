import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class SearchInput extends Component {
  state = {
    type: 'pins',
    text: '',
  }

  handleSubmit= (e) => {
    e.preventDefault();
    this.props.history.push(`/search/${this.state.text}/${this.state.type}`);

    this.setState({
      type: 'pins',
      text: '',
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="d-flex search-input mx-5">
        <input className="form-control" type='text' name='text' value={this.state.text} onChange={this.handleChange} placeholder={'Search...'}/>
        <select className="btn btn-secondary dropdown-toggle" name='type' value={this.state.type} onChange={this.handleChange} >
          <option value='pins'>Pins</option>
          <option value='boards'>Boards</option>
        </select>
      </form>
    );
  }
}

export default withRouter(SearchInput);

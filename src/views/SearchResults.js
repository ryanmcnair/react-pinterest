import React, { Component } from 'react';
import BoardsCard from '../components/Cards/BoardsCards';
import PinsCard from '../components/Cards/PinsCard';

export default class SearchResults extends Component {
  state = {
    results: [],
    searchTerm: '',
    searchType: '',
  }

  componentDidMount() {
    this.performSearch();
  }

  performSearch = () => {
    const searchTerm = this.props.match.params.term;
    const searchType = this.props.match.params.type;

    if (searchType === 'boards') {
      // Make an API call that gets the boards with the search term .filter
      this.setState({
        // results
        searchTerm,
        searchType,
      });
    } else {
      // Make an API call that gets the pins with the search term .filter
      this.setState({
        // results
        searchTerm,
        searchType,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.props.match.params.term) {
      this.performSearch();
    }
  }

  render() {
    const { results, searchType } = this.state;
    const showResults = () => (
      results.map((result) => (
        searchType === 'boards' ? <BoardsCard key={results.firebaseKey} board={result} /> : <PinsCard key={results.firebaseKey} pin={result}/>
      ))
    );

    return (
      <div>
        <h1>Search Results</h1>
        {showResults()}
      </div>
    );
  }
}

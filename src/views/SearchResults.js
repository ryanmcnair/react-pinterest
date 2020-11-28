import React, { Component } from 'react';
import BoardsCard from '../components/Cards/BoardsCards';
import PinsCard from '../components/Cards/PinsCard';
import authData from '../helpers/data/authData';
import boardData from '../helpers/data/boardData';
import pinData from '../helpers/data/pinData';

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
    const userId = authData.getUid();

    if (searchType === 'boards') {
      // Make an API call that gets the boards with the search term .filter
      boardData.searchBoards(userId, searchTerm.toLowerCase())
        .then((response) => {
          this.setState({
            results: response,
            searchTerm,
            searchType,
          });
        });
    } else {
      // Make an API call that gets the boards with the search term .filter
      pinData.searchPins(searchTerm.toLowerCase())
        .then((response) => {
          this.setState({
            results: response,
            searchTerm,
            searchType,
          });
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
        searchType === 'boards' ? <BoardsCard key={result.firebaseKey} board={result} />
          : <PinsCard key={result.firebaseKey} pin={result} />
      ))
    );

    return (
      <div>
        <h1>Search Results</h1>
        <div className="search-results">
        { showResults() }
        </div>
      </div>
    );
  }
}

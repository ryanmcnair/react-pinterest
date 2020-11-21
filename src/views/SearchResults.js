import React, { Component } from 'react';
import getUid from '../helpers/data/authData';
import boardData from '../helpers/data/boardData';
import pinData from '../helpers/data/pinData';
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
    const searchType = this.props.match.params.type;
    const searchTerm = this.props.match.params.term.toLowerCase();
    const userId = getUid();
    if (searchType === 'boards') {
      this.getResults = boardData.searchBoards(userId, searchTerm)
        .then((results) => {
          this.setState({
            results,
            searchTerm,
            searchType,
          });
        });
    } else {
      pinData.searchPins(userId, searchTerm).then((results) => {
        this.setState({
          results,
          searchTerm,
          searchType,
        });
      });
    }
  }

  // allow searches to take place when the search results component is already mounted and it rerenders based on the changes identified in this function
  componentDidUpdate(prevProps, prevState) {
    // only update/rerender component if the params have changed
    if (prevState.searchTerm !== this.props.match.params.term.toLowerCase() || prevState.searchType !== this.props.match.params.type) {
      this.performSearch();
    }
  }

  render() {
    const { results, searchType } = this.state;
    const showResults = () => (
      results.length
        ? results.map((result) => (
          searchType === 'boards' ? <BoardsCard key={result.firebaseKey} board={result} /> : <PinsCard key={result.firebaseKey} pin={result} />
        )) : (
          'No Results'
        )
    );
    return (
      <div>
        <h1 className='mt-5'>Search Results</h1>
        <div className='d-flex flex-wrap justify-content-center container'>
          {showResults()}</div>
      </div>
    );
  }
}

/* @flow weak */

/*
 * Component: SearchFormContainer
 */

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// External Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, { Component } from 'react';
import { SearchInput } from 'components';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Internal Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import './SearchFormContainer.scss';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Component Definition
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class SearchFormContainer extends Component {
  props: {
  };

  static defaultProps = {
  };

  state = {
    // Initialize state here
  };

  componentDidMount() {
    // Component ready
  }

  searchValue = '';

  componentWillUnmount() {
    this.searchValue = '';
  }

  handleSearchChange = () => {
  }

  resetSearchResults = () => {
  }

  handleEnterKey = () => {
  }

  render() {
    return (
      <div className="search-form-container">
        <SearchInput
          results={[]}
          handleSearchChange={this.handleSearchChange}
          resetSearchResults={this.resetSearchResults}
          onEnter={this.handleEnterKey}
        />
      </div>
    );
  }
}

export default SearchFormContainer;

/* @flow weak */

/*
 * Component: SearchInput
 */

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// External Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, { Component } from 'react';
import { Button, Input, Image } from 'unchained-ui-react';
import { pushToDataLayer } from 'analytics';
import { withRouter } from 'react-router-dom';
import { LEFT_ARROW_CIRCLE_BLUE } from 'constants/assets';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Internal Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import './SearchInput.scss';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Component Definition
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class SearchInput extends Component {
  props: {
    handleSearchChange: () => void,
    resetSearchResults: () => void,
    onEnter: () => void,
    history: {
      push: () => void
    },
  };

  state = {
    isFocused: '',
    isSelfClick: false,
    searchTextValue: '',
    value: '',
    source: []
  };

  SEARCH_CHAR_COUNT = 1
  searchTextValue = ''

  handleResultSelect = (e, result) => this.setState({ value: result.title });

  componentDidMount() {
    // ...
  }
  clickSearchInput = () => {
    this.searchTextValue = '';
    this.setState({ isFocused: 'focus', isSelfClick: true });
  }
  searchInputFocusOut = () => {
    this.props.resetSearchResults();
    this.setState({ isFocused: '', searchTextValue: '' });
  }
  autoSuggestClick = () => {
    this.setState({ isSelfClick: true });
  }
  handleMouseUp = (e) => {
    if (!(e.target.localName === 'a' || e.target.id === 'auto-sugg-close')) {
      if (!this.state.isSelfClick) {
        this.setState({ isFocused: '', isSelfClick: false, searchTextValue: '' });
      }
      this.setState({ isSelfClick: false });
    }
  }
  handleEscape = (e) => {
    if (e.which === 27) {
      this.searchInputFocusOut();
    }
  }
  componentWillMount() {
    document.body.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('keydown', this.handleEscape);
  }
  componentWillUnmount() {
    document.body.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('keydown', this.handleEscape);
  }
  handleSearchChange = (e) => {
    const value = e.target.value;
    this.searchTextValue = value;
    const { handleSearchChange } = this.props;
    if (this.state.isFocused === '') {
      this.setState({ isFocused: 'focus' });
    }
    this.setState({ searchTextValue: value }, () => {
      if (handleSearchChange) {
        handleSearchChange(value);
      }
    });
  }

  handleSearchSubmitForm(val) {
    const value = val;
    pushToDataLayer('search', 'autosuggestSearchClick', { label: value });
    if (value && value.length > this.SEARCH_CHAR_COUNT) {
      this.props.history.push(`/library/?searchType=enter&searchVal=${encodeURIComponent(value)}`);
      this.props.onEnter(value);
      this.searchInputFocusOut();
    }
  }
  submitSearchForm = (val) => (e) => {
    if (e.key === 'Enter') {
      this.handleSearchSubmitForm(val);
    }
  }
  render() {
    const { isFocused, searchTextValue } = this.state;
    return (
      <div>
        <div className={`ui search search-input-text-box ${isFocused}`}>
          <div className="ui icon input">
            <Button className="bmo-search-icon search-icon" button={{ 'aria-label': 'search icon' }} />
            <Input
              className={'search-input-text'}
              input={{
                value: searchTextValue,
                className: 'prompt',
                placeholder: 'Quick Search',
                onMouseDown: this.clickSearchInput,
                onKeyPress: this.submitSearchForm(searchTextValue),
                'aria-label': 'Search input box',
                onInput: this.handleSearchChange,
                id: 'search-input-text-box'
              }}
            />
            {
              <Button className="enter-btn" onClick={() => this.handleSearchSubmitForm(searchTextValue)}>
                <Image src={LEFT_ARROW_CIRCLE_BLUE} />
              </Button>
            }
            <Button id={'auto-sugg-close'} className="cloes-auto-suggest bmo-close-btn bg-icon-props" onClick={this.searchInputFocusOut} button={{ 'aria-label': 'Close auto suggest' }} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SearchInput);

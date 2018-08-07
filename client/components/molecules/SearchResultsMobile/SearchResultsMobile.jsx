/* @flow weak */

/*
 * Component: SearchResultsMobile
 */

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// External Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { CustomNavLink } from 'components';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Internal Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import './SearchResultsMobile.scss';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Component Definition
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class SearchResultsMobile extends Component {
  props: {
    coverageLists: [],
    sectors: [],
    analysts: [],
    handleNavLinkClick: () => void,
    onClickLink: () => void,
    publications: [],
    searchTextValue: '',
    onClickShowAll: () => void,
    coverage: []
  };

  static defaultProps = {
  };

  state = {
    expandType: ''
  };

  componentDidMount() {
    // Component ready
  }
  getFirstRow = (data, type) => {
    if (type === 'company' && data.length) {
      const src = data[0]._source;
      const encodedTicker = encodeURIComponent(src.ticker);
      return (
        <div className="first-row">
          <NavLink
            className="comp-name-and-ticker"
            onClick={() => { this.props.handleNavLinkClick('companyTickerClick', src); }}
            to={`/library/?searchType=company&searchVal=${encodedTicker}&searchTicker=${encodedTicker}`}
          >
            <a className="comp-name">{src.name} </a>
            <a className="comp-ticker"> ({src.ticker})</a>
          </NavLink>
        </div>
      );
    } else if (type === 'industry' && data.length) {
      const sectorResult = data[0];
      return (
        <div className="first-row">
          <div
            tabIndex={0}
            role="button"
            onKeyPress={() => {}}
            className={'a-row analyst-name'}
            key={Math.random()}
            onClick={this.props.onClickLink('industry', sectorResult._source, sectorResult._source.name)}
          >
            <NavLink
              onClick={() => { this.props.handleNavLinkClick('industrySuggestionClick', sectorResult._source); }}
              to={`/library/?searchType=industry&searchVal=${encodeURIComponent(sectorResult._source.name)}&sectorId=${encodeURIComponent(sectorResult._source.bm_sector_id)}`}
            >
              {sectorResult._source.name}
            </NavLink>
          </div>
        </div>
      );
    } else if (type === 'publications' && data.length) {
      const publicationsResult = data[0];
      if (!publicationsResult) return null;
      const src = publicationsResult._source;
      const link = src.historical_publication ? src.radar_link : `/research/${src.product_id}/`; // eslint-disable-line
      return (
        <div
          tabIndex={0}
          role="button"
          onKeyPress={() => {}}
          className={'a-row'}
          key={Math.random()}
          onClick={this.props.onClickLink('publication', src, src.title)}
        >
          <CustomNavLink
            onClick={() => { this.props.handleNavLinkClick('researchSuggestionClick', src); }}
            to={link}
            isHistoricalPublication={src.historical_publication}
            radarLink={src.historical_publication ? src.radar_link : ''}
          >
            <div className="research-comp-details">
              {src.title}
              <span className="research-comp-comment-type">
                {src.tags && src.tags.research_type ? `(${src.tags.research_type})` : ''}
              </span>
            </div>
          </CustomNavLink>
        </div>
      );
    } else if (type === 'analysts' && data.length) {
      const anAnalyst = data[0];
      const src = anAnalyst._source;
      const encodedName = encodeURIComponent(src.display_name);
      return (
        <div
          tabIndex={0}
          role="button"
          onKeyPress={() => {}}
          className={'a-row analyst-name'}
          key={Math.random()}
          onClick={this.props.onClickLink('analyst', src, src.display_name)}
        >
          <NavLink
            onClick={() => { this.props.handleNavLinkClick('analystLinkClick', anAnalyst); }}
            to={`/library/?searchType=analyst&searchVal=${encodedName}`}
            className="analyst-name-role-position"
          >
            <span className="name">{`${src.display_name}${src.position ? ',' : ''} ${src.position || ''}`}</span>
          </NavLink>
        </div>
      );
    }
    return null;
  }
  getTheRest = (data, type, coverage) => {
    const rest = data.slice(1, Math.min(3, data.length));
    if (type === 'company' && coverage) {
      return (
        <div className="rest">
          {
            rest.map((row) => {
              const src = row._source;
              const encodedTicker = encodeURIComponent(src.ticker);
              return (
                <NavLink
                  className="comp-name-and-ticker"
                  onClick={() => { this.props.handleNavLinkClick('companyTickerClick', src); }}
                  to={`/library/?searchType=company&searchVal=${encodedTicker}&searchTicker=${encodedTicker}`}
                >
                  <span className="comp-name">{src.name} </span>
                  <span className="comp-ticker"> ({src.ticker})</span>
                </NavLink>
              );
            })
          }
          {
            (coverage && coverage.length >= 3) ?
              <div className={'show-all-text coverage'}>
                <NavLink
                  to={'/our-department/our-coverage/'}
                  className={'analyst-show-all'} onClick={this.props.onClickShowAll()}
                >
                  {'See All'}
                </NavLink>
              </div>
              :
              null
          }
        </div>
      );
    } else if (type === 'industry') {
      return (
        <div className="rest">
          {
            rest.map((sectorResult) => {
              return (
                <div
                  tabIndex={0}
                  role="button"
                  onKeyPress={() => {}}
                  className={'a-row analyst-name'}
                  key={Math.random()}
                  onClick={this.props.onClickLink('industry', sectorResult._source, sectorResult._source.name)}
                >
                  <NavLink
                    onClick={() => { this.props.handleNavLinkClick('industrySuggestionClick', sectorResult._source); }}
                    to={`/library/?searchType=industry&searchVal=${encodeURIComponent(sectorResult._source.name)}&sectorId=${encodeURIComponent(sectorResult._source && sectorResult._source.bm_sector_id)}`}
                  >
                    {sectorResult._source.name}
                  </NavLink>
                </div>
              );
            })
          }
          {
            (data && data.length >= 2) ?
              <div className={'show-all-text analysts'}>
                <NavLink
                  to={`/library/?searchType=enter&searchVal=${encodeURIComponent(this.props.searchTextValue)}`}
                  className={'analyst-show-all'} onClick={this.props.onClickShowAll()}
                >
                  {'See All'}
                </NavLink>
              </div>
              :
              null
          }
        </div>
      );
    } else if (type === 'publications') {
      return (
        <div className="rest">
          {
            rest.map((publicationsResult) => {
              if (!publicationsResult) return null;
              const src = publicationsResult._source;
              const link = src.historical_publication ? src.radar_link : `/research/${src.product_id}/`; // eslint-disable-line
              return (
                <div
                  tabIndex={0}
                  role="button"
                  onKeyPress={() => {}}
                  className={'a-row'}
                  key={Math.random()}
                  onClick={this.props.onClickLink('publication', src, src.title)}
                >
                  <CustomNavLink
                    onClick={() => { this.props.handleNavLinkClick('researchSuggestionClick', src); }}
                    to={link}
                    isHistoricalPublication={src.historical_publication}
                    radarLink={src.historical_publication ? src.radar_link : ''}
                  >
                    <div className="research-comp-details">
                      {src.title}
                      <span className="research-comp-comment-type">{src.tags ? `(${src.tags.research_type})` : ''}</span>
                    </div>
                  </CustomNavLink>
                </div>
              );
            })
          }
          {
            (data && data.length >= 3) ?
              <div className={'show-all-text analysts'}>
                <NavLink
                  to={`/library/?searchType=enter&searchVal=${encodeURIComponent(this.props.searchTextValue)}`}
                  className={'analyst-show-all'} onClick={this.props.onClickShowAll()}
                >
                  {'See All'}
                </NavLink>
              </div>
              :
              null
          }
        </div>
      );
    } else if (type === 'analysts') {
      return (
        <div className="rest">
          {
            rest.map(anAnalyst => {
              const src = anAnalyst._source;
              const encodedName = encodeURIComponent(src.display_name);
              return (
                <div
                  tabIndex={0}
                  role="button"
                  onKeyPress={() => {}}
                  className={'a-row analyst-name'}
                  key={Math.random()}
                  onClick={this.props.onClickLink('analyst', src, src.display_name)}
                >
                  <NavLink
                    onClick={() => { this.props.handleNavLinkClick('analystLinkClick', anAnalyst); }}
                    to={`/library/?searchType=analyst&searchVal=${encodedName}`}
                    className="analyst-name-role-position"
                  >
                    <span className="name">{`${src.display_name}${src.position ? ',' : ''} ${src.position || ''}`}</span>
                  </NavLink>
                </div>
              );
            })
          }
          {
            (data && data.length >= 2) ?
              <div className={'show-all-text analysts'}>
                <NavLink to={'/our-department/our-analysts/'} className={'analyst-show-all'} onClick={this.props.onClickShowAll()}>
                  {'See All'}
                </NavLink>
              </div>
              :
              null
          }
        </div>
      );
    }
    return null;
  }
  expandDd = (type) => () => {
    if (type === this.state.expandType) {
      this.setState({ expandType: '' });
    } else {
      this.setState({ expandType: type });
    }
  }
  render() {
    const { coverageLists, sectors, publications, analysts, coverage } = this.props;
    const { expandType } = this.state;
    return (
      <div className="search-results-mobile">
        {
          coverageLists ?
            <div className="result-row">
              <div className="result-left">
                Company:
              </div>
              <div className="result-right">
                {this.getFirstRow(coverageLists, 'company')}
                {expandType === 'company' && this.getTheRest(coverageLists, 'company', coverage)}
              </div>
              <div
                tabIndex={0}
                role="button"
                onKeyPress={() => {}}
                className="drop-down"
                onClick={this.expandDd('company')}
              >
                <i aria-hidden="true" className={expandType === 'company' ? 'bmo_chevron top' : 'bmo_chevron bottom'} />
              </div>
            </div>
            : null
        }
        {
          sectors ?
            <div className="result-row">
              <div className="result-left">
                Industry:
              </div>
              <div className="result-right">
                {this.getFirstRow(sectors, 'industry')}
                {expandType === 'industry' && this.getTheRest(sectors, 'industry')}
              </div>
              <div
                tabIndex={0}
                role="button"
                onKeyPress={() => {}}
                className="drop-down"
                onClick={this.expandDd('industry')}
              >
                <i aria-hidden="true" className={expandType === 'industry' ? 'bmo_chevron top' : 'bmo_chevron bottom'} />
              </div>
            </div>
            : null
        }
        {
          publications ?
            <div className="result-row">
              <div className="result-left">
                Research:
              </div>
              <div className="result-right">
                {this.getFirstRow(publications, 'publications')}
                {expandType === 'publications' && this.getTheRest(publications, 'publications')}
              </div>
              <div
                tabIndex={0}
                role="button"
                onKeyPress={() => {}}
                className="drop-down"
                onClick={this.expandDd('publications')}
              >
                <i aria-hidden="true" className={expandType === 'publications' ? 'bmo_chevron top' : 'bmo_chevron bottom'} />
              </div>
            </div>
            : null
        }
        {
          analysts ?
            <div className="result-row">
              <div className="result-left">
                Analyst:
              </div>
              <div className="result-right">
                {this.getFirstRow(analysts, 'analysts')}
                {expandType === 'analysts' && this.getTheRest(analysts, 'analysts')}
              </div>
              <div
                tabIndex={0}
                role="button"
                onKeyPress={() => {}}
                className="drop-down"
                onClick={this.expandDd('analysts')}
              >
                <i aria-hidden="true" className={expandType === 'analysts' ? 'bmo_chevron top' : 'bmo_chevron bottom'} />
              </div>
            </div>
            : null
        }
      </div>
    );
  }
}

export default SearchResultsMobile;

/* @flow weak */

/*
 * Component: ResultContentContainer
 */

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// External Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, { Component } from 'react';
import {
  FeaturedResearchResults,
  ChangeSummarySection,
  FeaturedResearchStockScreen,
  QModelDailyListResult,
  BmoRedFilterSection,
  ReportsResultSection,
  BMOModel,
  StockScreenerFilterSection,
  QuantitativeTechnical,
  QuantTips,
  StrategyMediaPage,
  StrategyVideoCastsPage,
  QModelTop15
} from 'components';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  GET_RESULTS,
  GET_RESULTS_METHOD_POST
} from 'store/actions';

import {
  resultSelector,
  userSelector
} from 'store/selectors';

import { getDateRangeBasedOnUserStatus } from 'utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Internal Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import './ResultContentContainer.scss';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Component Definition
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class ResultContentContainer extends Component {
  props: {
    data: {
      api_endpoint: '',
      defaults: {},
    },
    getResult: () => void,
    result: [],
    stockResults: [],
    toDateStrategy: '',
    fromDateStrategy: '',
    profile: {}
  };

  static defaultProps = {
  };

  state = {
    fromDate: '',
    toDate: '',
    fromDateBMOModel: '',
    toDateBMOModel: '',
  };

  componentWillMount() {
    const { fromDateStrategy, toDateStrategy, data } = this.props;
    this.setState({ fromDate: fromDateStrategy, toDate: toDateStrategy });
    const numberOfdays = data.defaults ? ((data.defaults.date_field) * 7) : 180;
    if (numberOfdays) {
      this.setDateObject();
    }
    if (data.method !== 'POST') {
      this.props.getResult(data.api_endpoint);
    }
  }

  setDateObject(props = this.props) {
    const { profile, data } = props;
    let fromDate = moment().subtract(180, 'days').format('YYYY-MM-DD');
    let toDate = moment().format('YYYY-MM-DD');

    if (data.defaults && data.defaults.date_field) {
      const dateField = getDateRangeBasedOnUserStatus(profile.user_status, data.defaults.date_field);
      if (dateField) {
        fromDate = dateField.fromDate;
        toDate = dateField.toDate;
      }
    }

    this.setState({
      fromDateBMOModel: fromDate,
      toDateBMOModel: toDate,
      fromDate,
      toDate
    });
  }

  componentWillReceiveProps(nextProps) {
    const { data, profile } = nextProps;
    if (data.api_endpoint !== this.props.data.api_endpoint && data.method !== 'POST') {
      this.props.getResult(data.api_endpoint);
    }
    if (profile.user_status && (profile.user_status !== this.props.profile.user_status)) { // eslint-disable-line
      this.setDateObject(nextProps);
    }
  }

  render() {
    const { data, result, stockResults } = this.props;
    const { fromDate, toDate, fromDateBMOModel, toDateBMOModel } = this.state;//eslint-disable-line
    return (
      <div className={`result-content-container ${data.reactComponentName}`}>
        {(data.reactComponentName === 'FeaturedResearchResults') && <FeaturedResearchResults result={result} /> }
        {(data.reactComponentName === 'FeaturedResearchStockScreen') && <FeaturedResearchStockScreen sectionTitle={data.api} result={stockResults} /> }
        {(data.reactComponentName === 'QModelDailyListResult') && <QModelDailyListResult result={result} defaults={data.defaults} /> }
        {(data.reactComponentName === 'BmoRedFilterSection') && <BmoRedFilterSection defaults={data.defaults} /> }
        {(data.reactComponentName === 'ChangeSummary') && <ChangeSummarySection result={result} apiEndPoint={data.api_endpoint} dateRange={data.defaults ? data.defaults.date_field : 6} /> }
        {(data.reactComponentName === 'ReportsResultSection') && <ReportsResultSection fromDate={fromDate || moment().subtract(180, 'days').format('YYYY-MM-DD')} toDate={toDate || moment().format('YYYY-MM-DD')} /> }
        {(data.reactComponentName === 'BMOModel') && <BMOModel apiEndPoint={data.api_endpoint} fromDate={fromDateBMOModel || moment().subtract(180, 'days').format('YYYY-MM-DD')} toDate={toDateBMOModel || moment().format('YYYY-MM-DD')} /> }
        {(data.reactComponentName === 'StockScreenerFilterSection') && <StockScreenerFilterSection api={data.api_endpoint} /> }
        {(data.reactComponentName === 'QuantitativeTechnical') && <QuantitativeTechnical api={data.api_endpoint} /> }
        {(data.reactComponentName === 'QuantTips') && <QuantTips api={data.api_endpoint} /> }
        {(data.reactComponentName === 'QModelTop15') && <QModelTop15 result={result} /> }
        {(data.reactComponentName === 'StrategyMediaPage') && <StrategyMediaPage apiEndPoint={data.api_endpoint} /> }
        {(data.reactComponentName === 'StrategyVideoCastsPage') && <StrategyVideoCastsPage apiEndPoint={data.api_endpoint} /> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  result: resultSelector.getResults(state),
  stockResults: resultSelector.getStockResults(state),
  profile: userSelector.getUserProfileInfo(state)
});

const mapDispatchToProps = (dispatch) => ({
  getResult: async (url, type = 'GET') => {
    if (type === 'POST') {
      await dispatch(GET_RESULTS_METHOD_POST(url, {}));
    } else {
      await dispatch(GET_RESULTS(url));
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultContentContainer);

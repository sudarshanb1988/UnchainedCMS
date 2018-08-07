/* @flow weak */

/*
 * Component: MegaMenuColumn
 */

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// External Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, { Component } from 'react';
import { Grid } from 'unchained-ui-react';
import { mapPropsToChildren } from 'utils/reactutils';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Internal Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import './MegaMenuColumn.scss';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Component Definition
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class MegaMenuColumn extends Component {
  props: {
    children: {},
    closeMegaMenu: () => void
  };

  static defaultProps = {
  };

  state = {
    // Initialize state here
  };

  componentDidMount() {
    // Component ready
  }

  render() {
    const { children, closeMegaMenu } = this.props;
    return (
      <Grid.Column computer={3} mobile={12} className={'mega-menu-column'}>
        {mapPropsToChildren(children, { closeMegaMenu })}
      </Grid.Column>
    );
  }
}

export default MegaMenuColumn;

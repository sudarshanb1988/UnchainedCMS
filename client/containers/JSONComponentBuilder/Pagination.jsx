import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Button, Icon } from 'unchained-ui-react';

import './Pagination.scss';

class Pagination extends React.Component {
  static propTypes = {
    currentActiveIndex: PropTypes.number,
    children: PropTypes.func,
    numberOfPagesPerScreen: PropTypes.number,
    totalNumberOfPages: PropTypes.number,
    onPageButtonClick: PropTypes.func,
    prefix: PropTypes.func,
    suffix: PropTypes.func,
    icons: PropTypes.object,
  };

  static defaultProps = {
    icons: {
      left: <Icon name="angle left" />,
      leftMost: <Icon name="angle double left" />,
      right: <Icon name="angle right" />,
      rightMost: <Icon name="angle double right" />,
    }
  };

  render() {
    const {
      currentActiveIndex,
      children,
      numberOfPagesPerScreen,
      totalNumberOfPages,
      onPageButtonClick,
      prefix,
      suffix,
      icons,
    } = this.props;
    if (!totalNumberOfPages || currentActiveIndex > totalNumberOfPages) {
      return (
        <div className="center">
          <h4> You are in wrong page </h4>
        </div>
      );
    }

    const minPoint = 1;
    const midPoint = Math.ceil(numberOfPagesPerScreen / 2);
    let buttonsListStartAt = minPoint;
    let buttonsListEndsAt = numberOfPagesPerScreen;
    const lastScreenPagesMinNumber = totalNumberOfPages - numberOfPagesPerScreen;
    const isCurrentNeartoEnd = lastScreenPagesMinNumber < currentActiveIndex < totalNumberOfPages;
    const isCurrentAtMiddle =
    !(currentActiveIndex <= (numberOfPagesPerScreen - midPoint)) &&
    !((totalNumberOfPages - midPoint) < currentActiveIndex);

    if (isCurrentAtMiddle && midPoint !== currentActiveIndex) { // middle
      buttonsListStartAt = currentActiveIndex - midPoint;
      buttonsListEndsAt = currentActiveIndex + midPoint;
    } else if (isCurrentNeartoEnd && ((totalNumberOfPages - midPoint) < currentActiveIndex)) { // end
      buttonsListStartAt = lastScreenPagesMinNumber;
      buttonsListEndsAt = totalNumberOfPages;
    }
    buttonsListStartAt = buttonsListStartAt < minPoint
      ? minPoint
      : buttonsListStartAt;
    buttonsListEndsAt = buttonsListEndsAt > totalNumberOfPages
      ? totalNumberOfPages
      : buttonsListEndsAt;
    const ButtonsList = [];
    for (let i = buttonsListStartAt; i <= buttonsListEndsAt; i += 1) {
      const newButton = (
        <Button
          onClick={() => {
            onPageButtonClick(i);
          }}
          className={classNames({ active: (currentActiveIndex === i) })}
        >
          {i}
        </Button>
      );
      ButtonsList.push(newButton);
    }
    return (
      <div className="pagination-continer">
        {children}
        <div className="buttons-container">
          <div activeIndex={currentActiveIndex} pagination>
            {prefix}
            { currentActiveIndex > (midPoint + 1) && <Button co icon className="previous-btn" onClick={() => onPageButtonClick(1)}> {icons.leftMost}  </Button> }
            { currentActiveIndex > (midPoint + 1) && <Button icon className="previous-btn" onClick={() => onPageButtonClick(currentActiveIndex - 1)}> {icons.left}  </Button> }
            {ButtonsList}
            { !((totalNumberOfPages - midPoint) < currentActiveIndex) && <Button icon className="next-btn" onClick={() => onPageButtonClick(currentActiveIndex + 1)}> {icons.right} </Button> }
            { !((totalNumberOfPages - midPoint) < currentActiveIndex) && <Button icon className="next-btn" onClick={() => onPageButtonClick(totalNumberOfPages)}>  {icons.rightMost} </Button> }
            {suffix}
          </div>
        </div>
      </div>
    );
  }
}

export default Pagination;

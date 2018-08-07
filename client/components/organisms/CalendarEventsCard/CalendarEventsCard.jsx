/* @flow weak */

/*
 * Component: CalendarEventsCard
 */

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// External Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, { Component } from 'react';
import moment from 'moment';
import { Button, Modal, Image } from 'unchained-ui-react';
import { GCI_CARDS } from 'constants/assets';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Internal Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import './CalendarEventsCard.scss';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Component Definition
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class CalendarEventsCard extends Component {
  props: {
    eventList: [],
  };

  static defaultProps = {
    eventList: [
      { date: moment().format('dddd MMMM DD'), numOFEvents: 3 },
      { date: moment().format('dddd MMMM DD'), numOFEvents: 2 },
      { date: moment().format('dddd MMMM DD'), numOFEvents: 3 },
      { date: moment().format('dddd MMMM DD'), numOFEvents: 0 },
      { date: moment().format('dddd MMMM DD'), numOFEvents: 5 }
    ]
  };

  state = {
    openCalendarPopup: false,
    activeIndex: null,
  };

  componentDidMount() {
    // Component ready
  }
  onClickEvent = (activeIndex) => () => {
    const { eventList } = this.props;
    const modalContent = {
      date: eventList[activeIndex].date
    };
    document.body.classList.add('noscroll');
    this.setState({ openCalendarPopup: true, activeIndex, modalContent });
  }

  closeCalendarModal = () => () => {
    document.body.classList.remove('noscroll');
    this.setState({ openCalendarPopup: false, activeIndex: null });
  }

  render() {
    const { eventList } = this.props;
    const { openCalendarPopup, activeIndex, modalContent } = this.state;
    return (
      <div className="calendar-events-card" id={'calendar-events-card'}>
        {
          eventList.map((item, i) => {
            return (
              <div className={`col event-item event-${i} ${activeIndex === i ? 'active' : ''}`} onClick={this.onClickEvent(i)} onKeyPress={() => {}} tabIndex={0} role="button">
                <div className={'date'}>{item.date}</div>
                <div className={'event-number'}>{`${item.numOFEvents} Events`}</div>
              </div>
            );
          })
        }
        <div className={'col calendar-btn'}>
          <Button secondary className={'see-calendar-btn'} content={'See full calendar'} />
        </div>
        {openCalendarPopup &&
          <Modal
            open={openCalendarPopup}
            className={'calendar-homepage-modal'}
            dimmer={true}
            mountNode={document.getElementById('calendar-events-card')}
            onClose={this.closeCalendarModal()}
          >
            <Modal.Content>
              <div className="close-button-bar">
                <div className={'empty-col'} />
                <div className={'modal-date'}>{modalContent.date}</div>
                <div className={'close-btn'}>
                  <Button className="close-button bmo-close-btn" onClick={this.closeCalendarModal()} />
                </div>
              </div>
              <div className="event-row">
                <div className={'first-col'}>
                  <Image alt={''} src={GCI_CARDS} className={'country-logo'} />
                </div>
                <div className={'second-col'}>
                  <div className={'single-event'}>
                    <div className={'time'}>8.30am</div>
                    <div className={'title'}>Employment Report
                      <span className={'blue-solid-plus'} />
                    </div>
                  </div>
                  <div className={'single-event'}>
                    <div className={'time'}>9.00am</div>
                    <div className={'title'}>BoC Senior Deputy Governor Wilkins joins a panel at Women’s Forum Canada in Toronto
                      <span className={'blue-solid-plus'} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="event-row">
                <div className={'first-col'}>
                  <Image alt={''} src={GCI_CARDS} className={'country-logo'} />
                </div>
                <div className={'second-col'}>
                  <div className={'single-event'}>
                    <div className={'time'}>8.30am</div>
                    <div className={'title'}>Employment Report
                      <span className={'blue-solid-plus'} />
                    </div>
                  </div>
                  <div className={'single-event'}>
                    <div className={'time'}>9.00am</div>
                    <div className={'title'}>BoC Senior Deputy Governor Wilkins joins a panel at Women’s Forum Canada in Toronto
                      <span className={'blue-solid-plus'} />
                    </div>
                  </div>
                </div>
              </div>
              <div className={'close-button-bar'}>
                <div className={'empty-col'} />
                <div className={'modal-date'}><Button secondary className={'see-calendar-btn'} content={'See full calendar'} /></div>
              </div>
            </Modal.Content>
          </Modal>
        }
      </div>
    );
  }
}

export default CalendarEventsCard;

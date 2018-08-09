import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { Icon, Button, Input, Table, Modal } from 'unchained-ui-react';

import './BaseComponentEditModal.scss';

const SIZE = {
  SMALL: 'small',
  FULLSCREEN: 'fullscreen',
};

class BaseComponentEditModal extends Component {
  static propTypes = {
    cancelCB: PropTypes.func,
  };

  state = {
    showComponentSpecificPopup: false,
    settings: [],
    size: SIZE.SMALL,
  };

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.getEditableSettingsContent(nextProps), this.state.settings)) {
      this.setState({
        settings: this.getEditableSettingsContent(nextProps),
      });
    }
  }

  getRecursiveObject(editableDataPoints, obj = {}) {
    Object.keys(editableDataPoints).map(data => {
      if (typeof editableDataPoints[data] === 'object') {
        this.getRecursiveObject(editableDataPoints[data], obj);
      }
      if (typeof editableDataPoints[data] === 'string') {
        obj[data] = editableDataPoints[data]; // eslint-disable-line
      }
    });
    return obj;
  }

  componentWillMount() {
    this.setState({ settings: this.getEditableSettingsContent(this.props) });
  }

  getEditableSettingsContent(props) {
    const { editableDataPoints } = props;
    if (editableDataPoints) {
      const obj = this.getRecursiveObject(editableDataPoints);
      return Object.keys(obj).map(item => {
        return {
          key: item,
          value: obj[item]
        };
      });
    }
    return [];
  }

  hidePopup = () => {
    const data = {};
    this.state.settings.map((ele) => {
      data[ele.key] = ele.value;
    });
    this.props.cancelCB(data);
  }

  updateSettingsObj = (el, setting) => {
    const { settings } = this.state;
    settings.map(s => {
      if (s.key === setting.key) {
        s.value = el.target.value; // eslint-disable-line
      }
    });
    this.setState({ settings });
  }

  setSize = (size) => this.setState({
    size,
  });

  render() {
    const { settings, size } = this.state;
    return (
      <Modal
        open
        className="unchainedEditableElSettingsPopup"
        size={size}
        closeOnEscape
        closeOnDimmerClick
        onClose={this.hidePopup}
      >
        <Modal.Header>
          Settings
          <div className="actions">
            {
              size === 'small' ?
                <Button
                  type="button"
                  icon
                  onClick={() => this.setSize(SIZE.FULLSCREEN)}
                >
                  <Icon name="window maximize outline" />
                </Button> :
                <Button
                  type="button"
                  icon
                  onClick={() => this.setSize(SIZE.SMALL)}
                >
                  <Icon name="window minimize outline" />
                </Button>
            }
          </div>
        </Modal.Header>
        <Modal.Content>
          <Table celled striped>
            <Table.Body>
              {
                settings && settings.map((setting, i) => {
                  return (
                    <Table.Row key={`setting-${i + 1}`}>
                      <Table.Cell>{setting.key}</Table.Cell>
                      <Table.Cell>
                        <Input
                          type="text"
                          value={setting.value}
                          onChange={(el) => this.updateSettingsObj(el, setting)}
                        />
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              }
            </Table.Body>
          </Table>
        </Modal.Content>
        <Modal.Actions>
          <Button className="actionBtns" onClick={this.hidePopup}>Cancel</Button>
          <Button className="actionBtns" onClick={this.hidePopup} content={'Save'} />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default BaseComponentEditModal;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';

import Modal from 'unchained-ui-react/src/components/containers/Modal';
import Table from 'unchained-ui-react/src/components/containers/Table';
import Input from 'unchained-ui-react/src/components/controls/Input';
import Button from 'unchained-ui-react/src/components/controls/Button';

class BaseComponentEditModal extends Component {
  static propTypes = {
    cancelCB: PropTypes.func,
  };

  state = {
    showComponentSpecificPopup: false,
    settings: [],
  };

  componentWillReceiveProps(nextProps) {
    if (!isEqual(getEditableSettingsContent(nextProps), this.state.settings)) {
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

  render() {
    const { settings } = this.state;

    return (
      <Modal open={true} className="unchainedEditableElSettingsPopup">
        <Modal.Header>
          Settings
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

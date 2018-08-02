import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from 'unchained-ui-react/src/components/containers/Modal';
import Table from 'unchained-ui-react/src/components/containers/Table';
import Input from 'unchained-ui-react/src/components/controls/Input';
import Button from 'unchained-ui-react/src/components/controls/Button';

class BaseComponentEditModal extends Component {
  static propTypes = {
    cancelCB: PropTypes.func,
    editableDataPoints: PropTypes.object,
  };

  state = {
    showComponentSpecificPopup: false
  };

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

  getEditableSettingsContent() {
    const { editableDataPoints } = this.props;
    if (editableDataPoints) {
      const obj = this.getRecursiveObject(editableDataPoints);
      return Object.keys(obj).map(item => {
        return (
          <Table.Row>
            <Table.Cell>{item}</Table.Cell>
            <Table.Cell>{<Input type="text" value={obj[item]} />}</Table.Cell>
          </Table.Row>
        );
      });
    }
    return null;
  }

  hidePopup = () => {
    this.props.cancelCB();
  }

  render() {
    return (
      <Modal open={true} className="unchainedEditableElSettingsPopup">
        <Modal.Header>
          Settings
        </Modal.Header>
        <Modal.Content>
          <Table celled striped>
            <Table.Body>
              {this.getEditableSettingsContent()}
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

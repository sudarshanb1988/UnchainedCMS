import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { Modal, Container, Input, Button, Image, Grid, Label, Icon } from 'unchained-ui-react';

import './BaseComponentEditModal.scss';

const SIZE = {
  SMALL: 'small',
  FULLSCREEN: 'fullscreen',
};
import ReactQuill from 'react-quill';


class BaseComponentEditModal extends Component {
  static propTypes = {
    cancelCB: PropTypes.func,
    editableDataPoints: []
  };

  state = {
    showComponentSpecificPopup: false,
    settings: [],
    size: SIZE.SMALL,
  };

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.getEditableSettingsContent(nextProps), this.state.settings)) {
      this.setState({
        settings: Object.assign([], nextProps.editableDataPoints),
      });
    }
  }

  getRecursiveObject(editableDataPoints, o = {}) {
    const obj = { ...o };
    Object.keys(editableDataPoints).map(data => {
      if (typeof editableDataPoints[data] === 'object') {
        this.getRecursiveObject(editableDataPoints[data], obj);
      }
      if (typeof editableDataPoints[data] === 'string') {
        obj[data] = editableDataPoints[data];
      }
    });
    return obj;
  }

  componentWillMount() {
    this.setState({ settings: Object.assign([], this.props.editableDataPoints) });
  }

  // getEditableSettingsContent = (props) => {
  //   const { editableDataPoints } = props;
  //   if (editableDataPoints) {
  //     return editableDataPoints.map(item => {
  //       return {
  //         key: item,
  //         value: obj[item],
  //         type: item.type
  //       };
  //     });
  //   }
  //   return [];
  // }

  hidePopup = () => {
    const data = {};
    this.state.settings.map((ele) => {
      data[ele.key] = ele.value;
    });
    this.props.cancelCB(data);
  }

  updateSettingsObj = (value, setting, type) => {
    const { settings } = this.state;
    settings.map(s => {
      if (s.id === setting.id) {
        s.value[type] = value; // eslint-disable-line
      }
    });
    this.setState({ settings });
  }

  setSize = (size) => this.setState({ size });
  
  getControlType(setting) {
    switch (setting.type) {
      case 'UnchainedCtrlRichTextBlock':
        return (
          <ReactQuill
            value={setting.value.richText}
            onChange={(value) => this.updateSettingsObj(value, setting, 'richText')}
          />
        );
      case 'UnchainedCtrlCharBlock':
        return (
          <Input
            type="text"
            value={setting.value.text}
            onChange={(el) => this.updateSettingsObj(el.target.value, setting, 'text')}
          />
        );
      case 'UnchainedCtrlImageBlock':
        return (
          <Grid>
            <Grid.Column computer={3}>
              <Image
                src={setting.value.image}
              />
              <Button className="editBtn">
                <Icon name={'edit'} />
              </Button>
            </Grid.Column>
            <Grid.Column computer={9}>
              <div>
                <Label ribbon={true}>Alt Text</Label>
                <Input
                  type="text"
                  value={setting.value.altText}
                  onChange={(el) => this.updateSettingsObj(el.target.value, setting, 'altText')}
                />
              </div>
            </Grid.Column>
          </Grid>
        );
      default: break;
    }
    return null;
  }

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
          <Container>
            {
              settings && settings.map((setting, i) => {
                return (
                  <div className="setting-control" key={`setting-${i + 1}`}>
                    {this.getControlType(setting)}
                  </div>
                );
              })
            }
          </Container>
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

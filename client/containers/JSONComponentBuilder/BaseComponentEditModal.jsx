import React, { Component } from 'react';
import PropTypes from 'prop-types';


import ReactQuill from 'react-quill';
import { Modal, Container, Input, Button, Image, Grid, Label, Icon, Checkbox } from 'unchained-ui-react';

import { FILE_TYPES } from 'constants/defaults';

import FilePickerModal from './FilePickerModal';

import './BaseComponentEditModal.scss';

const SIZE = {
  SMALL: 'small',
  FULLSCREEN: 'fullscreen',
};


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

  componentWillMount() {
    this.setState({ settings: Object.assign([], this.props.editableDataPoints) });
  }

  hidePopup = (data) => {
    this.props.cancelCB(data);
  }

  updateSettingsObj = (value, key, updatekey) => {
    const { settings } = this.state;
    const updateObject = {
      ...settings,
      [key]: {
        ...(settings[key]),
        [updatekey]: value
      }
    };
    this.setState({ settings: updateObject });
  }

  setSize = (size) => this.setState({ size });

  getControlType(setting, key) {
    switch (setting.type) {
      case 'richText':
        return (
          <ReactQuill
            value={setting.richText}
            onChange={(value) => this.updateSettingsObj(value, key, 'richText')}
          />
        );
      case 'text':
        return (
          <Input
            type="text"
            value={setting.text}
            onChange={(el) => this.updateSettingsObj(el.target.value, key, 'text')}
          />
        );
      case 'UnchainedCtrlBooleanBlock':
        return (
          <Checkbox
            label={setting.label}
            value={setting.radio}
            onChange={(el) => this.updateSettingsObj(el.target.value, key, 'text')}
          />
        );
      case 'image':
        return (
          <Grid>
            <Grid.Column computer={3}>
              <Image
                src={setting.url}
              />
              <Button
                className="editBtn"
                onClick={() => {
                  this.setState({
                    imagePickerData: setting,
                    imagePickerDataKey: key
                  });
                }}
              >
                <Icon name={'edit'} />
              </Button>
            </Grid.Column>
            <Grid.Column computer={9}>
              <div>
                <Label ribbon>Alt Text</Label>
                <Input
                  type="text"
                  value={setting.altText}
                  onChange={(el) => this.updateSettingsObj(el.target.value, key, 'altText')}
                />
              </div>
            </Grid.Column>
          </Grid>
        );
      default: break;
    }
    return null;
  }

  blackListProps = ['class_name'];

  render() {
    const { settings, size, imagePickerData, editableDataPoints, imagePickerDataKey } = this.state;
    return (
      <Modal
        open
        className="unchainedEditableElSettingsPopup"
        size={size}
        closeOnEscape
        closeOnDimmerClick
        onClose={() => this.hidePopup(editableDataPoints)}
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
                  <Icon name="window maximize" />
                </Button> :
                <Button
                  type="button"
                  icon
                  onClick={() => this.setSize(SIZE.SMALL)}
                >
                  <Icon name="window minimize" />
                </Button>
            }
          </div>
        </Modal.Header>
        <Modal.Content>
          <Container>
            {
              settings && Object.keys(settings).map((setting, i) => {
                if (this.blackListProps.indexOf(setting) > -1) return null;
                return (
                  <div className="setting-control" key={`setting-${i + 1}`}>
                    {this.getControlType(settings[setting], setting)}
                  </div>
                );
              })
            }
            {
              imagePickerData &&
                <FilePickerModal
                  fileType={FILE_TYPES.IMAGES}
                  updateImage={(imageUrl) => {
                    const newSettings = { ...settings };
                    newSettings[imagePickerDataKey].url = imageUrl;
                    this.setState({
                      settings: newSettings,
                      imagePickerData: null,
                      imagePickerDataKey: null
                    });
                  }}
                  handleModal={(imagePickerData) => {
                    this.setState({
                      imagePickerData,
                    });
                  }}
                />
            }
          </Container>
        </Modal.Content>
        <Modal.Actions>
          <Button className="actionBtns" onClick={() => this.hidePopup(editableDataPoints)}>Cancel</Button>
          <Button className="actionBtns" onClick={() => this.hidePopup(settings)} content={'Save'} />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default BaseComponentEditModal;

import React from 'react';
import PropTypes from 'prop-types';

import { map } from 'lodash';
import classNames from 'classnames';

import {
  Grid,
  Modal,
  Button,
} from 'unchained-ui-react';


import './ComponentRearrangeModal.scss';

class ComponentRearrangeModal extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    hidePopup: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      componentData: props.data,
    };
  }

  updateComponentData = (data, currentLocation, nextLocation, isStartPoint, isEndPoint) => {
    const newComponentData = [...this.state.componentData];
    if (!isStartPoint && !isEndPoint) {
      newComponentData[currentLocation] = newComponentData[nextLocation];
      newComponentData[nextLocation] = data;
    } else if (isStartPoint) {
      const newData = newComponentData.splice(0, 1);
      newComponentData.push(newData[0]);
    } else if (isEndPoint) {
      map([...newComponentData], (ele, i) => {
        if (i !== currentLocation) {
          newComponentData[i + 1] = ele;
        }
      });
      newComponentData[0] = data;
    }
    this.setState({
      componentData: newComponentData,
    });
  }
  removeComponentDate = (index) => {
    const newComponentData = [...this.state.componentData];
    newComponentData.splice(index, 1);
    this.setState({
      componentData: newComponentData,
    });
  }
  render() {
    const { hidePopup } = this.props;
    const { componentData } = this.state;
    const dataLength = componentData.length;
    return (
      <Modal open className="unchainedEditableElSettingsPopup component-rearrange-modal" size="fullscreen">
        <Modal.Header>
          Re-Position
        </Modal.Header>
        <Modal.Content>
          <Grid divided>
            <Grid.Row columns={4}>
              {
                map(componentData, (ele, i) => {
                  return (
                    <Grid.Column key={Math.random()}>
                      <div
                        className={classNames('edit-component', { hovered : ele.id === this.state.hoverDivId })}
                        id={`editComponent${i}`}
                        onDragStart={(ev) => {
                          ev.dataTransfer.setData('string', JSON.stringify(ele));
                        }}
                        onDrop={(ev) => {
                          ev.preventDefault();
                          const data = JSON.parse(ev.dataTransfer.getData('string'));
                          const newComponetData = [...componentData];
                          const dataLocation = componentData.indexOf(componentData.find((e) => e.id === data.id));
                          const eleLocation = componentData.indexOf(componentData.find((e) => e.id === ele.id));
                          newComponetData[dataLocation] = ele;
                          newComponetData[eleLocation] = data;
                          this.setState({
                            componentData: newComponetData,
                          });
                        }}
                        onDragOver={(ev) => {
                          ev.preventDefault();
                          this.setState({
                            hoverDivId: ele.id,
                          })
                        }}
                        draggable
                      >
                        <div>
                          {i + 1} {ele.value.altText}
                          <Button className="trash-icon" icon="trash" onClick={() => this.removeComponentDate(i)} />
                        </div>
                      </div>
                    </Grid.Column>
                  );
                })
              }
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button className="actionBtns" onClick={() => hidePopup()}>Cancel</Button>
          <Button className="actionBtns" onClick={() => hidePopup(componentData)} content={'Save'} />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ComponentRearrangeModal;


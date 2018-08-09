import React from 'react';
import PropTypes from 'prop-types';

import { map, flow } from 'lodash';
import HTML5Backend from 'react-dnd-html5-backend';
import classNames from 'classnames';
import { DragSource, DropTarget, DragDropContext } from 'react-dnd';
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
    return (
      <Modal open className="unchainedEditableElSettingsPopup component-rearrange-modal" size="fullscreen" onClose={() => hidePopup()}>
        <Modal.Header>
          Re-Position
        </Modal.Header>
        <Modal.Content>
          <Grid divided>
            <Grid.Row columns={4}>
              {
                map(componentData, (ele, i) => {
                  return (
                    <Grid.Column key={i}>
                      <DragAndDropComponent
                        data={ele}
                        onDropComponent={(data) => {
                          const newComponetData = [...componentData];
                          const dataLocation = componentData.indexOf(componentData.find((e) => e.id === data.id));
                          const eleLocation = componentData.indexOf(componentData.find((e) => e.id === ele.id));
                          newComponetData[dataLocation] = ele;
                          newComponetData[eleLocation] = data;
                          this.setState({
                            componentData: newComponetData,
                          });
                        }}
                      >
                        {i + 1} {ele.value.altText}
                        <Button className="trash-icon" icon="trash" onClick={() => this.removeComponentDate(i)} />
                      </DragAndDropComponent>
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

export default DragDropContext(HTML5Backend)(ComponentRearrangeModal);

class DragAndDrop extends React.Component { // eslint-disable-line
  render() {
    const { connectDragSource, connectDropTarget, children, isOver } = this.props; // eslint-disable-line
    return (
      <div>
        {
          connectDragSource(connectDropTarget(
            <div
              className={
                classNames(
                  'edit-component',
                  {
                    hover: isOver,
                  }
                )
              }
            >
              {children}
            </div>
          ))
        }
      </div>
    );
  }
}

const DragAndDropComponent = flow(
  DragSource(
    'DragAndDrop',
    {
      beginDrag(props) {
        return {
          ...props,
        };
      },
    },
    (connect, monitor) => {
      return {
        connectDragSource: connect.dragSource(),
        // You can ask the monitor about the current drag state:
        isDragging: monitor.isDragging()
      };
    }
  ),
  DropTarget(
    'DragAndDrop',
    {
      drop(targetProps, monitor) {
        const prevProps = monitor.getItem();
        targetProps.onDropComponent(prevProps.data);
        return targetProps;
      },
      hover(props) {
        return {
          ...props,
          isHover: true,
        };
      }
    },
    (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
    })
  ),
)(DragAndDrop);


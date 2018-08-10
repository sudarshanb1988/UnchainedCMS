import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { map } from 'lodash';

import {
  Grid,
  Modal,
  Button,
} from 'unchained-ui-react';

import DragAndDropComponent from './DragAndDrop';

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
  removeComponentDate = (index) => {
    const newComponentData = [...this.state.componentData];
    newComponentData.splice(index, 1);
    this.setState({
      componentData: newComponentData,
    });
  }
  render() {
    const { hidePopup } = this.props;
    const { componentData, isDragging } = this.state;
    return (
      <Modal open className="unchainedEditableElSettingsPopup component-rearrange-modal" size="fullscreen" onClose={() => hidePopup()}>
        <Modal.Header>
          Re-Position
        </Modal.Header>
        <Modal.Content>
          <Grid divided>
            <Grid.Row
              columns={4}
              className={
                classNames(
                  {
                    'component-dragging': isDragging,
                  }
                )
              }
            >
              {
                map(componentData, (ele, i) => {
                  return (
                    <Grid.Column key={i}>
                      <DragAndDropComponent
                        data={ele}
                        onDrag={(isDragging) => { this.setState({ isDragging }); }}
                        onDropComponent={(data) => {
                          const newComponetData = [...componentData];
                          const dataLocation = componentData.indexOf(data);
                          const eleLocation = componentData.indexOf(ele);
                          newComponetData[dataLocation] = ele;
                          newComponetData[eleLocation] = data;
                          this.setState({
                            componentData: newComponetData,
                          });
                        }}
                      >
                        {i + 1} {ele.value.children[0].value.text}
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

export default ComponentRearrangeModal;

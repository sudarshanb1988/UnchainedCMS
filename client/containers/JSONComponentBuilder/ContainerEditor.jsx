import React from 'react';
import PropTypes from 'prop-types';
import { cloneDeep } from 'lodash';
import {
  Icon,
  Button,
} from 'unchained-ui-react';

import ComponentRearrangeModal from './ComponentRearrangeModal';
import BaseComponentEditModal from './BaseComponentEditModal';

class ContainerEditor extends React.Component {
  static propTypes = {
    components: PropTypes.object,
    jsonObj: PropTypes.object,
    componentData: PropTypes.array,
    children: PropTypes.object,
    isCreateNew: PropTypes.bool,
    updateJsonData: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      componentRearrangeData: null,
      componentType: null,
      newComponentData: null
    };
  }

  componentDidCatch(error, errorInfo) {
    console.log(this, error, errorInfo); // eslint-disable-line
  }

  showModal = (componentData) => this.setState({ componentRearrangeData: componentData, componentType: componentData[0].type });
  hideModal = () => this.setState({ componentRearrangeData: null, componentType: null });

  dummyImageURL = 'https://dummyimage.com/100x100/000/ebebeb.png&text=Dummy+Image';

  emptyValues = (obj) => {
    if (obj.children) {
      obj.children.map((child) => this.emptyValues(child));
    } else {
      Object.keys(obj).map((key) => {
        if (obj[key] instanceof Object) {
          this.emptyValues(obj[key]);
        } else if (key !== 'type' && key !== 'image') {
          obj[key] = null; // eslint-disable-line
        } else if (key === 'image') {
          obj[key] = this.dummyImageURL; // eslint-disable-line
        }
      });
    }
  }

  showNewCompoentCreateModal = (newComponentData) => this.setState({ newComponentData });

  render() {
    const {
      componentRearrangeData,
      componentType,
      newComponentData,
    } = this.state;
    const {
      components,
      componentData,
      jsonObj,
      children,
      isCreateNew,
      updateJsonData,
    } = this.props;

    return (
      <div className="unchainedEditableEl parentEl">
        {children}
        <div className="unchainedEditableBtn">
          <Button
            icon
            className="editButtonUnchainedEditableEl"
            onClick={() => this.showModal(componentData)}
          >
            <Icon name="setting" />
          </Button>
          {
            isCreateNew &&
            <Button
              icon
              className="editButtonUnchainedEditableEl"
              onClick={() => {
                const newData = cloneDeep({ ...componentData[0] });
                this.emptyValues(newData);
                newData.value.children = newData.value.children.map((e) => ({
                  ...e,
                  id: Math.random()
                }));
                this.showNewCompoentCreateModal(newData.value.children);
              }}
            >
              <Icon name="plus" />
            </Button>
          }
        </div>
        {
          componentRearrangeData &&
            <ComponentRearrangeModal
              data={componentRearrangeData}
              type={componentType}
              components={components}
              hidePopup={(data) => {
                const updatedjsonObj = { ...jsonObj };
                if (data) {
                  const changedData = jsonObj.body.find((e) => (e.id === data[0].parent_id));
                  const changedDataLocation = changedData && jsonObj.body.indexOf(changedData);
                  if (changedDataLocation >= 0) {
                    updatedjsonObj.body[changedDataLocation].value.children = data;
                  }
                }
                this.hideModal();
                updateJsonData(updatedjsonObj);
              }}
            />
        }
        {
          newComponentData &&
            <BaseComponentEditModal
              editableDataPoints={newComponentData}
              cancelCB={(data) => {
                const updatedjsonObj = { ...jsonObj };
                if (data) {
                  const changedData = jsonObj.body.find((e) => (e.id === componentData[0].parent_id));
                  const changedDataLocation = changedData && jsonObj.body.indexOf(changedData);
                  if (changedDataLocation >= 0) {
                    const newData = cloneDeep({ ...componentData[0] });
                    this.emptyValues(newData);
                    updatedjsonObj.body[changedDataLocation].value.children.push({
                      ...newData,
                      isEditable: true,
                      parent_id: componentData[0].parent_id,
                      value: {
                        ...newData.value,
                        children: [...data],
                      }
                    });
                  }
                }
                updateJsonData(updatedjsonObj);
                this.setState({
                  newComponentData: null,
                });
              }}
            />
        }
      </div>
    );
  }
}

export default ContainerEditor;

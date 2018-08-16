import React from 'react';

import { updateCMDData } from 'api/auth';

import BaseComponentEditModal from './BaseComponentEditModal';
import ComponentRearrangeModal from './ComponentRearrangeModal';

class ComponentEditor extends React.Component {
  static propTypes = {
    jsonObj: PropTypes.object,
    components: PropTypes.object,
  };

  hidePopup = () => {
    this.setState({ showComponentSpecificPopup: false, editableDataPoints: null });
  }

  updateNode = (data, nodeId, changedData) => {
    if (Array.isArray(data)) {
      data.map(item => {
        if (item.id === nodeId) {
          item.value.children = changedData; // eslint-disable-line
        }
        return this.updateNode(item.value.children, nodeId, changedData);
      });
    }
  }

  updateJsonObjData = (data, parentData) => {
    if (Array.isArray(parentData)) {
      return map(parentData, (json) => {
        if (data[0].parent_id === json.id) {
          const newParentData = cloneDeep(json);
          newParentData.value.children = data;
          return newParentData;
        }
        if (json.value.children) {
          return this.updateJsonObjData(data, json.value.children);
        }
        return json;
      });
    } else if (Array.isArray(data) && data[0].parent_id === parentData.id) {
      const newParentData = parentData;
      newParentData.value.children = data;
      return newParentData;
    } else if (jsonObj.value.children) {
      return this.updateJsonObjData(data, jsonObj.children);
    }
    return parentData;
  }

  updateCMDData = async (data) => {
    const { jsonObj } = this.props;
    if (data) {
      this.updateNode(jsonObj.body, data[0].parent_id, data);
    }
    await updateCMDData(
      jsonObj.id,
      {
        type: jsonObj.meta.type,
        body: jsonObj.body,
      }
    );
    this.setState({
      jsonObj: {
        ...jsonObj,
      }
    });
    this.hidePopup();
  }

  render() {
    const {
      showComponentSpecificPopup,
      componentRearrangeData,
      componentType,
      editableDataPoints,
      jsonObj,
    } = this.state;
    const {
      components
    } = this.props;
    return (
      <div>
        {
          showComponentSpecificPopup ?
            <BaseComponentEditModal
              editableDataPoints={editableDataPoints}
              cancelCB={this.updateCMDData}
            />
            : null
        }
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
              this.setState({
                componentRearrangeData: null,
                jsonObj: updatedjsonObj,
              });
            }}
          />
        }
      </div>
    );
  }
}

export default ComponentEditor;
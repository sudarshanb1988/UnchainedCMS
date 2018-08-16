import React from 'react';
import PropTypes from 'prop-types';

import {
  Icon,
  Button,
} from 'unchained-ui-react';

import ComponentRearrangeModal from './ComponentRearrangeModal';

class ContainerEditor extends React.Component {
  static propTypes = {
    components: PropTypes.object,
    jsonObj: PropTypes.object,
    componentData: PropTypes.array,
    children: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      componentRearrangeData: null,
      componentType: null,
    };
  }

  showModal = (componentData) => this.setState({ componentRearrangeData: componentData, componentType: componentData[0].type });
  hideModal = () => this.setState({ componentRearrangeData: null, componentType: null });

  render() {
    const {
      componentRearrangeData,
      componentType,
    } = this.state;
    const {
      components,
      componentData,
      jsonObj,
      children,
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
      </div>
    );
  }
}

export default ContainerEditor;

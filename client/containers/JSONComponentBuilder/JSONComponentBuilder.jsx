import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { isEqual } from 'lodash';

import Message from 'unchained-ui-react/src/components/containers/Message';

import {
  updateCMDData,
} from 'api/auth';


import BaseComponentEditModal from './BaseComponentEditModal';
import ComponentRearrangeModal from './ComponentRearrangeModal';

class JSONComponentBuilder extends Component {
  static propTypes = {
    components: PropTypes.object,
    jsonObj: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.currentConfigData = null;
    this.state = {
      showComponentSpecificPopup: false,
      jsonObj: props.jsonObj,
    };
  }

  componentWillReceiveProps(nextProps, props) {
    if (isEqual(nextProps.jsonObj, props.jsonObj)) {
      this.setState({
        jsonObj: nextProps.jsonObj,
      });
    }
  }

  buildSEOComponents = (seoObj = {}) => {
    return Object.keys(seoObj).map((k, i) => {
      const key = k.toLowerCase();
      const value = seoObj[k];

      if (key.indexOf('og') === 0) {
        const loopKey = i + 1;
        const property = key.replace(/(og)(.*)/, (originalStr, former, latter) => `${former}:${latter.toLowerCase()}`);
        return <meta key={loopKey} property={property} content={value} />;
      }

      let tag = null;

      switch (key) {
        case 'seo_title':
          tag = <title key={Math.random()}>{value}</title>;
          break;
        case 'search_description':
          tag = <meta key={Math.random()} name={'description'} content={value} />;
          break;
        default:
          // tag = <meta key={Math.random()} name={key} content={value} />;
          break;
      }

      return tag;
    });
  }

  buildChildComponents(jsonObj) {
    if (!jsonObj || jsonObj.length === 0) {
      return null;
    }
    return (
      <div className="unchainedEditableEl parentEl">
        {this.developComponents(jsonObj)}
        <div className="unchainedEditableBtn">
          <button
            className="editButtonUnchainedEditableEl"
            onClick={() => {
              this.setState({
                componentRearrangeData: jsonObj,
              });
            }}
          >
            Edit
          </button>
        </div>
      </div>
    );
  }

  showComponentSpecificPopup = (props) => {
    this.setState({ showComponentSpecificPopup: true, editableDataPoints: props });
  }

  developComponents(jsonObj) {
    const {
      components,
    } = this.props;

    return jsonObj.map((item) => {
      const componentName = item.type;
      const Element = components[componentName];

      if (Element) {
        const children = this.buildChildComponents(item.value.children);
        const props = JSON.parse(JSON.stringify(item.value));
        delete props.children;

        if (props.wrapperComponent === true) {
          return children;
        }
        if (props.isEditable) {
          return (
            <div className="unchainedEditableEl">
              <div className="unchainedEditableBtn">
                <button className="editButtonUnchainedEditableEl" onClick={() => this.showComponentSpecificPopup(props)}>Edit</button>
              </div>
              <Element {...props}>{children}</Element>
            </div>
          );
        }
        return <Element {...props}>{children}</Element>;
      }

      return (
        <Message
          warning
          header={'Component work in Progress'}
          content={`We are working hard at building ${componentName} component`}
        />
      );
    });
  }

  hidePopup = () => {
    this.setState({ showComponentSpecificPopup: false, editableDataPoints: null });
  }
  updateCMDData = async (data) => {
    let updatedjsonObj = { ...jsonObj };
    if (data) {
      updatedjsonObj = jsonObj.body.map(fir => {
        const firChildren = fir.value.children.map((sec) => {
          const newSec = { ...sec };
          const rightSec = sec.id === editableDataPoints.parentId;
          if (rightSec) {
            newSec.value = {
              ...newSec.value,
              ...data,
              to: {
                ...newSec.value.to,
                url: data.url,
              }
            };
          }
          return newSec;
        });
        return {
          ...fir,
          value: {
            ...fir.value,
            children: firChildren,
          },
        };
      });
    }
    this.hidePopup();
    const res = await updateCMDData({
      ...jsonObj,
      body: updatedjsonObj,
    });
    this.setState({
      jsonObj: res,
    });
    window.unchainedSite = res;
  }
  render() {
    const {
      showComponentSpecificPopup,
      componentRearrangeData,
      componentType,
      editableDataPoints,
      jsonObj,
    } = this.state;

    return (
      <div>
        <Helmet>
          {this.buildSEOComponents(jsonObj.meta)}
        </Helmet>
        {this.developComponents(jsonObj.body)}
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
            hidePopup={(data) => {
              const updatedjsonObj = { ...jsonObj };
              if (data) {
                const changedData = jsonObj.body.find((e) => (e.id === data[0].parentId));
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

export default JSONComponentBuilder;

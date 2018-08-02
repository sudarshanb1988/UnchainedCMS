import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { isEqual } from 'lodash';

import Message from 'unchained-ui-react/src/components/containers/Message';

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
      jsonArray: props.jsonArray,
    };
  }

  componentWillReceiveProps(nextProps, props) {
    if (isEqual(nextProps.jsonArray, props.jsonArray)) {
      this.setState({
        jsonArray: nextProps.jsonArray,
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

  buildChildComponents(jsonArray) {
    if (!jsonArray || jsonArray.length === 0) {
      return null;
    }
    return (
      <span className="unchainedEditableEl parentEl">
        {this.developComponents(jsonArray, path)}
        <button
          className="editButtonUnchainedEditableEl"
          onClick={() => {
            this.setState({
              componentRearrangeData: jsonArray,
              currentPath: path,
            });
          }}
        >
          Edit
        </button>
      </span>
    );
  }

  showComponentSpecificPopup = (props) => {
    this.setState({ showComponentSpecificPopup: true, editableDataPoints: props });
  }

  developComponents(jsonArray, currentPath = '') {
    const {
      components,
    } = this.props;

    return jsonArray.map((item) => {
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
            <span className="unchainedEditableEl">
              <Element {...props}>{children}</Element>
              <button className="editButtonUnchainedEditableEl" onClick={() => this.showComponentSpecificPopup(props)}>Edit</button>
            </span>
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

  render() {
    const {
      jsonObj,
    } = this.props;

    const {
      showComponentSpecificPopup,
      currentPath,
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
              cancelCB={this.hidePopup}
            />
            : null
        }
        {
          componentRearrangeData &&
          <ComponentRearrangeModal
            data={componentRearrangeData}
            hidePopup={(data) => {
              const updatedJsonArray = [...jsonArray];
              updatedJsonArray[currentPath.slice(1, -1)] = data;
              this.setState({
                componentRearrangeData: null,
                jsonArray: updatedJsonArray,
              });
            }}
          />
        }
      </div>
    );
  }
}

export default JSONComponentBuilder;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import Message from 'unchained-ui-react/src/components/containers/Message';

import BaseComponentEditModal from './BaseComponentEditModal';

class JSONComponentBuilder extends Component {
  static propTypes = {
    components: PropTypes.object,
    jsonObj: PropTypes.object,
  };

  state = {
    showComponentSpecificPopup: false
  };

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
        {this.developComponents(jsonArray)}
        <button className="editButtonUnchainedEditableEl" onClick={() => {}}>Edit</button>
      </span>
    );
  }

  showComponentSpecificPopup = (props) => {
    this.setState({ showComponentSpecificPopup: true, editableDataPoints: props });
  }

  developComponents(jsonArray) {
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
      editableDataPoints
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
      </div>
    );
  }
}

export default JSONComponentBuilder;

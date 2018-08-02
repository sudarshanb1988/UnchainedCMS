import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import Message from 'unchained-ui-react/src/components/containers/Message';
import Modal from 'unchained-ui-react/src/components/containers/Modal';
import Table from 'unchained-ui-react/src/components/containers/Table';
import Input from 'unchained-ui-react/src/components/controls/Input';
import Button from 'unchained-ui-react/src/components/controls/Button';

class JSONComponentBuilder extends Component {
  static propTypes = {
    components: PropTypes.object,
    jsonArray: PropTypes.array,
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
        case 'title':
          tag = <title key={Math.random()}>{value}</title>;
          break;
        case 'searchdescription':
          tag = <meta key={Math.random()} name={'description'} content={value} />;
          break;
        default:
          tag = <meta key={Math.random()} name={key} content={value} />;
          break;
      }

      return tag;
    });
  }

  buildChildComponents(data) {
    const {
      children: jsonArray
    } = data;

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
      return Object.keys(item).map((componentName) => {
        if (componentName === 'seo') {
          return (
            <Helmet>
              {this.buildSEOComponents(item[componentName])}
            </Helmet>
          );
        } else if (componentName === 'page_parameters') {
          window.pageGlobalParams = {
            ...(item[componentName])
          };
          return null;
        }

        const Element = components[componentName];

        if (Element) {
          const children = this.buildChildComponents(item[componentName]);
          const props = JSON.parse(JSON.stringify(item[componentName]));
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
    });
  }

  getRecursiveObject(editableDataPoints, obj = {}) {
    const newObj = { ...obj };
    Object.keys(editableDataPoints).map(data => {
      if (typeof editableDataPoints[data] === 'object') {
        this.getRecursiveObject(editableDataPoints[data], newObj);
      }
      if (typeof editableDataPoints[data] === 'string') {
        newObj[data] = editableDataPoints[data];
      }
    });
    return newObj;
  }

  getEditableSettingsContent() {
    const { editableDataPoints } = this.state;
    if (editableDataPoints) {
      const obj = this.getRecursiveObject(editableDataPoints);
      return Object.keys(obj).map(item => {
        return (
          <Table.Row>
            <Table.Cell>{item}</Table.Cell>
            <Table.Cell>{<Input type="text" value={obj[item]} />}</Table.Cell>
          </Table.Row>
        );
      });
    }
    return null;
  }

  hidePopup = () => {
    this.setState({ showComponentSpecificPopup: false, editableDataPoints: null });
  }

  render() {
    const {
      jsonArray,
    } = this.props;

    return (
      <div>
        {this.developComponents(jsonArray)}
        {
          this.state.showComponentSpecificPopup ?
            <Modal open={true} className="unchainedEditableElSettingsPopup">
              <Modal.Header>
                Settings
              </Modal.Header>
              <Modal.Content>
                <Table celled striped>
                  <Table.Body>
                    {this.getEditableSettingsContent()}
                  </Table.Body>
                </Table>
              </Modal.Content>
              <Modal.Actions>
                <Button className="actionBtns" onClick={this.hidePopup}>Cancel</Button>
                <Button className="actionBtns" onClick={this.hidePopup} content={'Save'} />
              </Modal.Actions>
            </Modal>
            : null
        }
      </div>
    );
  }
}

export default JSONComponentBuilder;

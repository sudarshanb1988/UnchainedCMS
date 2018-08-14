import React from 'react';
import { Modal, Image, Button } from 'unchained-ui-react';

import ImageUploader from 'react-images-upload';
import PropTypes from 'prop-types';
import './ImagePickerModal.scss';

const data = {
  meta: {
    total_count: 2,
  },
  items: [
    {
      id: 22,
      meta: {
        type: 'wagtailimages.Image',
        detail_url: 'http://localhost/api/v2/images/22/',
        tags: [],
        file: 'https://dummyimage.com/100x100/e8d6e8/000fde.png&text=Avinash+600x315',
      },
      title: 'test image2'
    },
    {
      id: 23,
      meta: {
        type: 'wagtailimages.Image',
        detail_url: 'http://localhost/api/v2/images/23/',
        tags: [],
        file: 'https://dummyimage.com/100x100/e8d6e8/000fde.png&text=Alchemy+600x315',
      },
      title: 'Screen Shot 2018-07-19 at 10.33.58 AM.png'
    }
  ]
};

class ImagePickerModal extends React.Component {
  static propTypes = {
    handleModal: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = { pictures: [] };
  }

  onDrop = (picture) => {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });
  }

  renderFileUploader = () => {
    return (
      <ImageUploader
        withIcon={true}
        buttonText="Choose images"
        onChange={this.onDrop}
        imgExtension={['.jpg', '.gif', '.png', '.gif']}
        maxFileSize={5242880}
      />
    );
  }
  hidePop = () => {
    this.props.handleModal(false);
  }
  render() {
    return (
      <div>
        <Modal open className="image-picker-modal" onClose={this.hidePop}>
          <Modal.Header>
            Change Image
          </Modal.Header>
          <Modal.Content>
            {
              data.items.map(({ meta }, title) => {
                const { file } = meta;
                return (
                  <Image lazyload alt={title} src={file} />
                );
              })
            }
            {this.renderFileUploader()}
          </Modal.Content>
          <Modal.Actions>
            <Button className="actionBtns" onClick={this.hidePopup}>Cancel</Button>
            <Button className="actionBtns" onClick={this.hidePopup} content={'Save'} />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default ImagePickerModal;

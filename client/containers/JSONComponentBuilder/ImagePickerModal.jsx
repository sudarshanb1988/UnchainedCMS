import React from 'react';
import { Modal, Image, Button } from 'unchained-ui-react';

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
        file: 'http://localhost:9000/media/original_images/Test_Shwe'
      },
      title: 'test image2'
    },
    {
      id: 23,
      meta: {
        type: 'wagtailimages.Image',
        detail_url: 'http://localhost/api/v2/images/23/',
        tags: [],
        file: 'http://localhost:9000/media/original_images/Screen_Shot_2018-07-19_at_10.33.58_AM.png'
      },
      title: 'Screen Shot 2018-07-19 at 10.33.58 AM.png'
    }
  ]
};

class ImagePickerModal extends React.Componenet {
  render() {
    return (
      <div>
        <Modal open>
          <Modal.Header>
            Change Image
          </Modal.Header>
          <Modal.Content>
            {
              data.items.map(({ meta }, title) => {
                <Image alt={title} src={meta.file} />
              })
            }
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

import React from 'react';
import PropTypes from 'prop-types';

import { map } from 'lodash';

import { Modal, Image, Form, Button } from 'unchained-ui-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { getImages, uploadImage } from 'api/auth';

// import 'react-tabs/style/react-tabs.less';
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
    updateImage: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      options: [],
      images: data,
      formData: {
        tags: [],
      },
    };
  }

  componentDidMount() {
    this.fetchImages();
  }

  fetchImages = async () => {
    const res = await getImages();
    this.setState({
      images: res,
    });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    await uploadImage({
      ...e.value,
    });
  }

  renderFileUploader = () => {
    const { options, formData } = this.state;
    const tagsValue = map(formData.tags, ({ value }) => (value));
    return (
      <Form onSubmit={(e) => this.onSubmit(e)}>
        <Form.Input fluid label="Title" placeholder="Title" />
        <Form.Input fluid type="file" label="Image" placeholder="Image" />
        <Form.Select
          search
          selectOnBlur={false}
          name="tags"
          options={options}
          value={tagsValue}
          allowAdditions
          selection
          multiple
          onAddItem={(e, { value }) => {
            const selectedValue = find(options, { id: value });
            if (!selectedValue) {
              this.setState({
                options: [...options, { text: value, value }],
                formData: {
                  tags: [...formData.tags, { text: value, value }],
                }
              });
            }
          }}
          onChange={(e, { value }) => {
            const selectedValue = find(options, { value });
            if (selectedValue) {
              this.setState({
                formData: {
                  tags: [...selectedValue],
                }
              });
            }
          }}
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
  hidePop = () => {
    this.props.handleModal(false);
  }
  render() {
    const { updateImage } = this.props;
    const { images } = this.state; // eslint-disable-line
    return (
      <div>
        <Modal open className="image-picker-modal" onClose={this.hidePop}>
          <Modal.Header>
            Change Image
          </Modal.Header>
          <Modal.Content>
            <Tabs>
              <TabList>
                <Tab>Pick Image </Tab>
                <Tab>Upload Image </Tab>
              </TabList>
              <TabPanel>
                <Image.Group size="small">
                  {
                    data.items.map((imageDetails) => {
                      const { meta: { file }, title } = imageDetails;
                      return (
                        <Image
                          alt={title}
                          src={file}
                          onClick={() => {
                            updateImage(file);
                          }}
                        />
                      );
                    })
                  }
                </Image.Group>
              </TabPanel>
              <TabPanel>
                {this.renderFileUploader()}
              </TabPanel>
            </Tabs>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default ImagePickerModal;

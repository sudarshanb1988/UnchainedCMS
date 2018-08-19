import React from 'react';
import PropTypes from 'prop-types';

import { Card, Icon } from 'unchained-ui-react';


import Pagination from './Pagination';


class FileGallary extends React.Component {
  static propTypes = {
    images: PropTypes.array,
    updateImage: PropTypes.func,
    // isLoading: PropTypes.boolean,
  };

  constructor(props) {
    super(props);
    this.IMAGES_LENGTH = props.images.length;
    this.PAGES_PER_SCREEEN = 10;
    this.state = {
      currentPageNumber: 1,
    };
  }

  render() {
    const { images, updateImage } = this.props;
    const paginatedImages = images.slice(this.IMAGES_LENGTH, 6);
    return (
      <Card.Group size="small">
        {
          paginatedImages &&
            <Pagination
              totalNumberOfPages={this.IMAGES_LENGTH}
              numberOfPagesPerScreen={this.PAGES_PER_SCREEEN}
              onPageButtonClick={(currentPageNumber) => {
                this.setState({
                  currentPageNumber,
                });
              }}
              currentActiveIndex={this.state.currentPageNumber}
            >
              {
                paginatedImages.map((imageDetails) => {
                  const { meta: { file }, title } = imageDetails;
                  return (
                    <Card>
                      <Card.Content>
                        <Icon
                          name="file outline"
                          onClick={() => {
                            updateImage(file);
                          }}
                        />
                        {title}
                      </Card.Content>
                    </Card>
                  );
                })
              }
            </Pagination>
        }
      </Card.Group>
    );
  }
}

export default FileGallary;

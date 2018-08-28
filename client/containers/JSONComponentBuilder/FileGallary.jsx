import React from 'react';
import PropTypes from 'prop-types';

import { Card, Icon } from 'unchained-ui-react';

import Pagination from './Pagination';

class FileGallary extends React.Component {
  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.images !== state.images) {
      return {
        ...state,
        currentPageNumber: 1,
        images: nextProps.images,
      };
    }
    return null;
  }

  static propTypes = {
    images: PropTypes.array,
    updateImage: PropTypes.func,
    // isLoading: PropTypes.boolean,
  };

  constructor(props) {
    super(props);
    this.IMAGES_LENGTH = props.images.length;
    this.NO_IMAGES = 10;
    this.PAGES_PER_SCREEEN = 10;
    this.TOTAL_NO_PAGES = Math.ceil(this.IMAGES_LENGTH / this.NO_IMAGES) - 1;
    this.state = {
      currentPageNumber: 0,
    };
  }

  render() {
    const { images, updateImage } = this.props;
    const paginatedImages = images.slice(currentPageNumber * this.NO_IMAGES, (currentPageNumber * this.NO_IMAGES) + this.NO_IMAGES);
    if (paginatedImages.length === 0) return null;
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

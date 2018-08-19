import React from 'react';
import PropTypes from 'prop-types';

import { Image } from 'unchained-ui-react';


import Pagination from './Pagination';


class ImageGallary extends React.Component {
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
    const { currentPageNumber } = this.state;
    const paginatedImages = images.slice(currentPageNumber * this.NO_IMAGES, (currentPageNumber * this.NO_IMAGES) + this.NO_IMAGES);
    if (paginatedImages.length === 0) return null;
    return (
      <Pagination
        totalNumberOfPages={this.TOTAL_NO_PAGES}
        numberOfPagesPerScreen={this.PAGES_PER_SCREEEN}
        onPageButtonClick={(currentPageNumber) => {
          this.setState({
            currentPageNumber,
          });
        }}
        currentActiveIndex={this.state.currentPageNumber}
      >
        <Image.Group size="small">
          {
            paginatedImages.map((imageDetails) => {
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
      </Pagination>
    )
  }
}

export default ImageGallary;

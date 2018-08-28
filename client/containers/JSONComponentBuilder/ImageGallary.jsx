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
  constructor(props) {
    super(props);
    this.IMAGES_LENGTH = props.images.length;
    this.NO_IMAGES = 10;
    this.PAGES_PER_SCREEEN = 10;
    this.TOTAL_NO_PAGES = Math.ceil(this.IMAGES_LENGTH / this.NO_IMAGES) - 1;
    this.state = {
      currentPageNumber: 1,
      images: props.images,
    };
  }

  render() {
    const { updateImage } = this.props;
    const { currentPageNumber, images } = this.state;
    const pageNumber = currentPageNumber === 1 ? 0 : currentPageNumber;
    const paginatedImages = images.slice(pageNumber * this.NO_IMAGES, (pageNumber * this.NO_IMAGES) + this.NO_IMAGES);
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
    );
  }
}

export default ImageGallary;

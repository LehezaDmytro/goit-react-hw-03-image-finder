import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  imageURL,
  showModal,
  largeImageURL,
  tags,
}) => {
  return (
    <li
      onClick={() => showModal(largeImageURL, tags)}
      className="ImageGalleryItem"
    >
      <img className="ImageGalleryItem-image" src={imageURL} alt={tags} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  showModal: PropTypes.func.isRequired,
  imageURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ items, showModal }) => {
  return (
    <>
      {items.map(element => (
        <li
          key={element.id}
          onClick={() => showModal(element.id)}
          className="ImageGalleryItem"
        >
          <img
            className="ImageGalleryItem-image"
            src={element.webformatURL}
            alt=""
          />
        </li>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  showModal: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
};

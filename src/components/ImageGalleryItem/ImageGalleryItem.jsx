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

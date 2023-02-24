import PropTypes from 'prop-types';

export const Button = ({ loadMore }) => {
  return (
    <button className="Button" onClick={loadMore}>
      Load more
    </button>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

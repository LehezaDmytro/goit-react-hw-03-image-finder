import PropTypes from 'prop-types';

export const ErrorMessage = ({ error }) => {
  return <p className="Error">{error}</p>;
};

ErrorMessage.propTypes = {
  error: PropTypes.string.isRequired,
};

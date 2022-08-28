import React from 'react';
import PropTypes from 'prop-types';
// Components
import IconSmile from '../Catalog-icon/IconSmile';

const Message = ({ content, className }) => {
  return (
    <p className={className}>
      {content} <IconSmile />
    </p>
  );
};

Message.propTypes = {
  content: PropTypes.string,
  className: PropTypes.string,
};

export default Message;

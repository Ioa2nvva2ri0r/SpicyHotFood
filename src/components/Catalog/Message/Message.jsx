import React from 'react';
import PropTypes from 'prop-types';
// Components
import IconSmile from '../Catalog-icon/IconSmile';

const Message = ({ content, className, style }) => {
  return (
    <p className={className} style={style}>
      {content} <IconSmile />
    </p>
  );
};

Message.propTypes = {
  content: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Message;

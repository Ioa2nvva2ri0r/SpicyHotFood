import React from 'react';
import PropTypes from 'prop-types';

const IconClose = ({ icon }) => {
  return icon === 'square' ? (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        rx="7.5"
        fill="white"
        stroke="#DBDBDB"
      />
      <path
        d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z"
        fill="#B5B5B5"
      />
    </svg>
  ) : icon === 'circle' ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40px"
      height="40px"
      viewBox="0 0 40 40"
    >
      <path
        fill="#786344"
        d="M 20 0 C 8.953125 0 0 8.953125 0 20 C 0 31.046875 8.953125 40 20 40 C 31.046875 40 40 31.046875 40 20 C 40 8.953125 31.046875 0 20 0 Z M 27.070312 25.304688 C 27.558594 25.792969 27.558594 26.582031 27.070312 27.070312 C 26.582031 27.558594 25.792969 27.558594 25.304688 27.070312 L 20.007812 21.773438 L 14.675781 27.109375 C 14.183594 27.597656 13.386719 27.597656 12.894531 27.109375 C 12.402344 26.613281 12.402344 25.816406 12.894531 25.328125 L 18.226562 19.992188 L 12.929688 14.699219 C 12.441406 14.207031 12.441406 13.417969 12.929688 12.929688 C 13.417969 12.441406 14.210938 12.441406 14.699219 12.929688 L 19.992188 18.226562 L 25.363281 12.855469 C 25.859375 12.363281 26.65625 12.363281 27.144531 12.855469 C 27.640625 13.347656 27.640625 14.144531 27.144531 14.636719 L 21.773438 20.007812 Z M 27.070312 25.304688 "
      />
    </svg>
  ) : (
    ''
  );
};

IconClose.propTypes = {
  icon: PropTypes.string,
};

export default IconClose;
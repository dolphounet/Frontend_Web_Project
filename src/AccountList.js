// AccountList.js
import React from 'react';
import PropTypes from 'prop-types';

const CommentList = (props) => {
  const commentNodes = props.data.map(comment => (
    <div>
      <h3> { comment.account} </h3>
      <p style={{ textAlign: "left" }}> { comment.mdp } </p>
    </div>
  ));
  return (
    <div>
      { commentNodes }
    </div>
  );
};

CommentList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string
  })),
};

CommentList.defaultProps = {
  data: [],
};

export default CommentList;
/**
 * A list of comments
 */
import React from 'react';
import PropTypes from 'prop-types';

const renderComment = comment => <li>{comment.commentText}</li>;

const CommentList = ({ comments }) => (
  <ul>{comments.map(comment => renderComment(comment))}</ul>
);

CommentList.propTypes = {
  comments: PropTypes.array,
};

CommentList.defaultProps = {
  comments: [],
};

export default CommentList;

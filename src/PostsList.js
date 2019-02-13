import React from "react";
import PropTypes from "prop-types";

const PostsList = ({ list }) => {
  return (
    <ul>
      {list.map((post, index) => {
        return (
          <li key={post.created_at_i}>
            <a href={post.url} rel="noopener" target="_blank">
              <h3>{`${index + 1}) ${post.title}`}</h3>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

PostsList.propTypes = {
  list: PropTypes.array.isRequired
};

PostsList.defaultProps = {
  list: []
};

export default PostsList;

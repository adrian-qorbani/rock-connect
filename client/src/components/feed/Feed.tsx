import React from "react";
import { Link } from "react-router-dom";
import { Post } from "../../types/types";

interface FeedRouteProps {
  posts: Post[];
}

const FeedRoute: React.FC<FeedRouteProps> = ({ posts }) => (
  <div>
    <h2>Posts</h2>
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default FeedRoute;
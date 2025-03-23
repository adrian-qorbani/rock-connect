import React from "react";
import { Link } from "react-router-dom";
import { Post } from "../../types/types";
import styles from "../../styles/Feed.module.css";

interface FeedRouteProps {
  posts: Post[];
}

const FeedRoute: React.FC<FeedRouteProps> = ({ posts }) => (
  <div className={styles.feed}>
    <h2>Posts</h2>
    <ul className={styles.postList}>
      {posts.map((post) => (
        <li key={post.id} className={styles.postItem}>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default FeedRoute;
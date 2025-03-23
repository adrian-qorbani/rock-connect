import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../../types/types";
import styles from "../../styles/Post.module.css";

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [posts] = useState<Post[]>([
    {
      id: "1",
      title: "First Post",
      author: "John Doe",
      publishedAt: "2023-10-01",
      content: "This is the content of the first post.",
    },
    {
      id: "2",
      title: "Second Post",
      author: "Jane Smith",
      publishedAt: "2023-10-02",
      content: "This is the content of the second post.",
    },
  ]);

  const post = posts.find((post) => post.id === id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className={styles.postDetail}>
      <h2>{post.title}</h2>
      <p>Posted by {post.author} on {post.publishedAt}</p>
      <p>{post.content}</p>
    </div>
  );
};

export default PostDetail;
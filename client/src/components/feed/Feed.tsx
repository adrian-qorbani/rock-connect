import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useGetCurrentUserFeedPostsQuery } from "../../generated/graphql";

interface Post {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  content: string;
  userId: number;
}

const FeedRoute: React.FC = () => {
  const { data, loading, error } = useGetCurrentUserFeedPostsQuery({
    fetchPolicy: "cache-and-network",
    context: {
      credentials: "include",
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading posts: {error.message}</div>;
  }

  const posts: Post[] =
    data?.getCurrentUserFeedPosts?.map((post) => ({
      id: post.id,
      title: post.title,
      author: post.user.username,
      createdAt: post.createdAt,
      content: post.content,
      userId: post.userId,
    })) || [];

  if (posts.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Your Feed</h2>
        <p>No posts available. Follow some users to see their posts!</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Feed</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  <Link
                    to={`/posts/${post.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {post.title}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    to={`/users/${post.userId}`}
                    style={{ textDecoration: "none" }}
                  >
                    {post.author}
                  </Link>
                </TableCell>
                <TableCell>{post.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FeedRoute;

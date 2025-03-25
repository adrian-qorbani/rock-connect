import React from "react";
import { Link } from "react-router-dom";
import { Post } from "../../types/types";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

interface FeedRouteProps {
  posts: Post[];
}

const FeedRoute: React.FC<FeedRouteProps> = ({ posts }) => (
  <div>
    <h2>Posts</h2>
    {/* <ul> */}
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </TableCell>
              <TableCell>{post.author}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {/* </ul> */}
  </div>
);

export default FeedRoute;

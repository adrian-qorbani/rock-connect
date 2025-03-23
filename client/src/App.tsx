import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link, useParams } from "react-router-dom";

// Define TypeScript interfaces
interface User {
  id: string;
  name: string;
}

interface Post {
  id: string;
  title: string;
  author: string;
  publishedAt: string;
  content: string;
}

// Define component props
interface PostProps {
  post: Post;
}

interface LoginProps {
  onLogin: (user: User) => void;
}

// Components
const HomeRoute: React.FC = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const FeedRoute: React.FC<{ posts: Post[] }> = ({ posts }) => (
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

const ConnectionsRoute: React.FC = () => (
  <div>
    <h2>Friends and Connections</h2>
  </div>
);

const ProfileRoute: React.FC = () => (
  <div>
    <h2>Current User Profile</h2>
  </div>
);

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
    <div>
      <h2>{post.title}</h2>
      <p>Posted by {post.author} on {post.publishedAt}</p>
      <p>{post.content}</p>
    </div>
  );
};

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const handleLogin = () => {
    // Simulate a user login
    const user: User = { id: "1", name: "John Doe" };
    onLogin(user);
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
};

const UserRoute: React.FC<{ users: User[] }> = ({ users }) => {
  return (
    <div>
      <h2>User Profile</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
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
  const [user, setUser] = useState<User | null>(null);

  const login = (user: User) => {
    setUser(user);
  };

  const padding = {
    padding: "5px",
  };

  // Example users for UserRoute
  const currentUsers: User[] = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
  ];

  return (
    <Router>
      <div>
        <Link style={padding} to="/">
          Home
        </Link>
        <Link style={padding} to="/feed">
          Feed
        </Link>
        <Link style={padding} to="/connections">
          Friends
        </Link>
        <Link style={padding} to="/profile">
          User Profile
        </Link>
        {user ? (
          <em>Welcome, {user.name}.</em>
        ) : (
          <Link style={padding} to="/login">
            Login
          </Link>
        )}
      </div>

      <Routes>
        <Route path="/feed" element={<FeedRoute posts={posts} />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/users/:username" element={<UserRoute users={currentUsers} />} />
        <Route path="/users" element={<ConnectionsRoute />} />
        <Route
          path="/profile"
          element={user ? <ProfileRoute /> : <Navigate replace to="/login" />}
        />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/" element={<HomeRoute />} />
      </Routes>

      <div>
        <i>Rock-Connect: Connecting Fans and Artists since 2025</i>
      </div>
    </Router>
  );
};

export default App;
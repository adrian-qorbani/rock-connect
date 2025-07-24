import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
} from "@mui/material";
import React from "react";
import { User } from "../../types/graphql.types";

const Home: React.FC = () => {
  // Dummy users data - in a real app, this would come from an API
  const latestUsers: User[] = [
    {
      username: "musiclover99",
      profilePicture: "https://randomuser.me/api/portraits/women/44.jpg",
      createdAt: "2023-05-15T10:30:00Z",
    },
    {
      username: "rockstar22",
      profilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
      createdAt: "2023-05-14T09:15:00Z",
    },
    {
      username: "guitar_hero",
      profilePicture: "https://randomuser.me/api/portraits/women/63.jpg",
      createdAt: "2023-05-13T14:20:00Z",
    },
    {
      username: "drummerpro",
      profilePicture: "https://randomuser.me/api/portraits/men/75.jpg",
      createdAt: "2023-05-12T11:45:00Z",
    },
    {
      username: "vocalqueen",
      profilePicture: "https://randomuser.me/api/portraits/women/28.jpg",
      createdAt: "2023-05-11T16:10:00Z",
    },
    {
      username: "bassmaster",
      profilePicture: "https://randomuser.me/api/portraits/men/90.jpg",
      createdAt: "2023-05-10T13:25:00Z",
    },
  ];

  // Format date to something more readable
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div>
      <Box sx={{ mt: 4 }}>
        <Card elevation={0}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Welcome to Rock-Connect!
            </Typography>
            <Typography paragraph>
              We're excited to have you here. This platform is designed to help
              you connect with like-minded music fans and prime artists in music
              industry.
            </Typography>
            <Typography paragraph>
              To start, follow your friends or connect with new ones below:
            </Typography>
          </CardContent>
        </Card>

        <Box sx={{ mt: 4 }}>
          {latestUsers.length > 0 ? (
            <Grid
              container
              spacing={2}
              sx={{ overflowX: "auto", flexWrap: "nowrap" }}
            >
              {latestUsers.slice(0, 6).map((user) => (
                <Grid
                  item
                  key={user.username}
                  sx={{
                    minWidth: 150, // Set a minimum width for each item
                    flexShrink: 0, // Prevent items from shrinking
                  }}
                >
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      p: 2,
                      height: "100%",
                    }}
                  >
                    <Avatar
                      src={user.profilePicture}
                      alt={user.username}
                      sx={{ width: 80, height: 80, mb: 1 }}
                    />
                    <Typography variant="subtitle1" noWrap>
                      {user.username}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Joined: {formatDate(user.createdAt)}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" color="text.secondary">
              No users yet 😢
            </Typography>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Home;

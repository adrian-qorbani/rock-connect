import { IconButton, Typography } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

interface LikeButtonProps {
  isLiked: boolean;
  isLoading: boolean;
  likeCount: number;
  onClick: (e: React.MouseEvent) => void;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  isLiked,
  isLoading,
  likeCount,
  onClick,
}) => (
  <>
    <IconButton
      onClick={onClick}
      disabled={isLoading}
      color={isLiked ? "error" : "default"}
    >
      {isLiked ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
    <Typography variant="body2" sx={{ ml: 1 }}>
      {likeCount}
    </Typography>
  </>
);

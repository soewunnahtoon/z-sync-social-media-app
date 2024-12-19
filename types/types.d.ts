interface ChildrenProp {
  children: React.ReactNode;
}

interface UserInfo {
  name: string;
  email: string;
  id: string;
  username: string;
  avatarUrl: string | null;
  isTwoFactorEnable: boolean;
}

interface MessageCountInfo {
  unreadCount: number;
}

interface NotificationCountInfo {
  unreadCount: number;
}

interface FollowerInfo {
  followers: number;
  isFollowedByUser: boolean;
}

interface BookmarkInfo {
  isBookmarkedByUser: boolean;
}

interface LikeInfo {
  likes: number;
  isLikedByUser: boolean;
}

interface Attachment {
  file: File;
  mediaId?: string;
  isUploading: boolean;
}

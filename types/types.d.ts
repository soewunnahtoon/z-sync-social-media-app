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

interface UserButtonProps {
  user: UserInfo | undefined;
}

interface FollowButtonProps {
  userId: string;
  initialState: FollowerInfo;
  className?: string;
}

interface FollowerCountProps {
  userId: string;
  initialState: FollowerInfo;
}

interface UserAvatarProps {
  avatarUrl: string | null | undefined;
  size?: number;
  className?: string;
}

interface BookmarkButtonProps {
  postId: string;
  initialState: BookmarkInfo;
}

interface MenuBarProps {
  className?: string;
}

interface Attachment {
  file: File;
  mediaId?: string;
  isUploading: boolean;
}

interface AddAttachmentsButtonProps {
  onFilesSelected: (files: File[]) => void;
  disabled: boolean;
}

interface AttachmentPreviewsProps {
  attachments: Attachment[];
  removeAttachment: (fileName: string) => void;
}

interface AttachmentPreviewProps {
  attachment: Attachment;
  onRemoveClick: () => void;
}

interface FollowerInfo {
  followers: number;
  isFollowedByUser: boolean;
}

interface NotificationCountInfo {
  unreadCount: number;
}

interface NotificationsButtonProps {
  initialState: NotificationCountInfo;
}

interface InfiniteScrollContainerProps extends ChildrenProp {
  onBottomReached: () => void;
}

interface MessageCountInfo {
  unreadCount: number;
}

interface MessagesButtonProps {
  initialState: MessageCountInfo;
}

interface BookmarkInfo {
  isBookmarkedByUser: boolean;
}

interface LikeInfo {
  likes: number;
  isLikedByUser: boolean;
}

interface LikeButtonProps {
  postId: string;
  initialState: LikeInfo;
}

interface PageProps {
  params: { username: string };
}

interface SearchResultsProps {
  query: string;
}

interface UserPostsProps {
  userId: string;
}

interface CropImageDialogProps {
  src: string;
  cropAspectRatio: number;
  onCropped: (blob: Blob | null) => void;
  onClose: () => void;
}

interface PageProps {
  searchParams: { q: string };
}

interface ChatSidebarProps {
  open: boolean;
  onClose: () => void;
}

interface NewChatDialogProps {
  onOpenChange: (open: boolean) => void;
  onChatCreated: () => void;
}

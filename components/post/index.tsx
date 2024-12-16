"use client";

import Link from "next/link";
import Linkify from "@/components/linkify";
import UserAvatar from "@/components/user-avatar";
import UserTooltip from "@/components/user-tooltip";
import LikeButton from "@/components/post/like-button";
import BookmarkButton from "@/components/post/bookmark-button";
import PostMoreButton from "@/components/post/post-more-button";
import Comments from "@/components/post/comment";
import CommentButton from "@/components/post/comment-button";
import MediaPreviews from "@/components/post/media-previews";

import { useState } from "react";
import { formatRelativeDate } from "@/lib/utils/format-date";
import { useClientUser } from "@/hooks/use-client-user";
import { PostProps } from "@/lib/utils/post-data-include";

const Post = ({ post }: PostProps) => {
  const user = useClientUser();
  const [showComments, setShowComments] = useState<boolean>(false);

  return (
    <article className="group/post space-y-2 rounded-2xl bg-card px-4 py-2 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-wrap gap-2">
          <UserTooltip user={post.user}>
            <Link href={`/${post.user.username}`}>
              <UserAvatar avatarUrl={post.user.avatarUrl} size={44} />
            </Link>
          </UserTooltip>

          <div>
            <UserTooltip user={post.user}>
              <Link
                href={`/${post.user.username}`}
                className="block font-medium hover:underline"
              >
                {post.user.name}
              </Link>
            </UserTooltip>

            <div
              className="text-xs text-muted-foreground"
              suppressHydrationWarning
            >
              {formatRelativeDate(post.createdAt)}
            </div>
          </div>
        </div>

        {post.user.id === user?.id && (
          <PostMoreButton
            post={post}
            // className="opacity-0 transition-opacity group-hover/post:opacity-100"
          />
        )}
      </div>

      <div>
        <Linkify>
          <Link href={`/post/${post.id}`}>
            <div className="whitespace-pre-line break-words">
              {post.content}
            </div>
          </Link>
        </Linkify>
      </div>

      {!!post.attachments.length && (
        <MediaPreviews attachments={post.attachments} />
      )}

      <hr className="text-muted-foreground" />

      <div className="flex justify-between gap-4">
        <div className="flex items-center gap-4">
          <LikeButton
            postId={post.id}
            initialState={{
              likes: post._count.likes,
              isLikedByUser: post.likes.some(
                (like) => like.userId === user?.id
              ),
            }}
          />

          <CommentButton
            post={post}
            onClick={() => setShowComments(!showComments)}
          />
        </div>

        <BookmarkButton
          postId={post.id}
          initialState={{
            isBookmarkedByUser: post.bookmarks.some(
              (bookmark) => bookmark.userId === user?.id
            ),
          }}
        />
      </div>

      {showComments && <Comments post={post} />}
    </article>
  );
};

export default Post;

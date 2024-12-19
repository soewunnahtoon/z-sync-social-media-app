import { PostData } from "@/lib/utils/post-data-include";
import { MessageSquare } from "lucide-react";

interface CommentButtonProps {
  post: PostData;
  onClick: () => void;
}

const CommentButton = ({ post, onClick }: CommentButtonProps) => {
  return (
    <button onClick={onClick} className="flex items-center gap-2">
      <MessageSquare className="size-4" />

      <span className="text-sm font-medium tabular-nums">
        {post._count.comments}{" "}
        <span className="hidden sm:inline">comments</span>
      </span>
    </button>
  );
};
export default CommentButton;

import Spinner from "@/components/Spinner";

import { useState } from "react";
import { SendHorizonal } from "lucide-react";
import { CreateCommentMutation } from "@/mutations/create-comment-mutation";
import { PostData } from "@/lib/utils/post-data-include";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CommentInputProps {
  post: PostData;
}

const CommentInput = ({ post }: CommentInputProps) => {
  const [input, setInput] = useState("");

  const mutation = CreateCommentMutation(post.id);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!input) return;

    mutation.mutate(
      {
        post,
        content: input,
      },
      {
        onSuccess: () => setInput(""),
      }
    );
  }

  return (
    <form className="flex w-full items-center gap-2" onSubmit={onSubmit}>
      <Input
        placeholder="Write a comment..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        disabled={!input.trim() || mutation.isPending}
      >
        {!mutation.isPending ? <SendHorizonal /> : <Spinner />}
      </Button>
    </form>
  );
};
export default CommentInput;

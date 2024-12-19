"use client";

import "./styles.css";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import LoadingButton from "@/components/LoadingButton";
import UserAvatar from "@/components/UserAvatar";
import AttachmentPreviews from "@/components/editor/AttachmentPreviews";
import AddAttachmentsButton from "@/components/editor/AddAttachmentsButton";

import { cn } from "@/lib/utils";
import { ClipboardEvent } from "react";
import { Loader2 } from "lucide-react";
import { EditorContent, useEditor } from "@tiptap/react";
import { useDropzone } from "@uploadthing/react";
import { useMediaUpload } from "@/hooks/use-media-upload";
import { CreatePostMutation } from "@/mutations/create-post-mutation";

interface PostEditorProps {
  name: string;
  avatarUrl: string | null;
}

const PostEditor = ({ name, avatarUrl }: PostEditorProps) => {
  const mutation = CreatePostMutation();

  const {
    startUpload,
    attachments,
    isUploading,
    uploadProgress,
    removeAttachment,
    reset: resetMediaUploads,
  } = useMediaUpload();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: startUpload,
  });

  const { ...rootProps } = getRootProps();

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: `What's on your mind, ${name.split(" ")[0]}?`,
      }),
    ],
  });

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  function onSubmit() {
    mutation.mutate(
      {
        content: input,
        mediaIds: attachments.map((a) => a.mediaId).filter(Boolean) as string[],
      },
      {
        onSuccess: () => {
          editor?.commands.clearContent();
          resetMediaUploads();
        },
      }
    );
  }

  function onPaste(e: ClipboardEvent<HTMLInputElement>) {
    const files = Array.from(e.clipboardData.items)
      .filter((item) => item.kind === "file")
      .map((item) => item.getAsFile()) as File[];
    startUpload(files);
  }

  return (
    <div className="flex flex-col gap-2 rounded-2xl bg-card p-2 shadow-sm">
      <div className="flex gap-2">
        <UserAvatar avatarUrl={avatarUrl} />

        <div {...rootProps} className="w-full">
          <EditorContent
            editor={editor}
            className={cn(
              "max-h-[20rem] w-full overflow-y-auto rounded-2xl bg-background px-2 py-2",
              isDragActive && "outline-dashed"
            )}
            onPaste={onPaste}
          />
          <input {...getInputProps()} />
        </div>
      </div>

      {!!attachments.length && (
        <AttachmentPreviews
          attachments={attachments}
          removeAttachment={removeAttachment}
        />
      )}

      <div className="flex items-center justify-end gap-2">
        {isUploading && (
          <div className="flex gap-2 justify-center items-center">
            <span className="text-sm">{uploadProgress ?? 0}%</span>
            <Loader2 className="animate-spin" />
          </div>
        )}

        <AddAttachmentsButton
          onFilesSelected={startUpload}
          disabled={isUploading || attachments.length >= 5}
        />

        <LoadingButton
          onClick={onSubmit}
          loading={mutation.isPending}
          disabled={!input.trim() || isUploading}
          className="min-w-20"
        >
          Post
        </LoadingButton>
      </div>
    </div>
  );
};

export default PostEditor;

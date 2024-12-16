import AttachmentPreview from "@/components/editor/attachment-preview";

import { cn } from "@/lib/utils";

const AttachmentPreviews = ({
  attachments,
  removeAttachment,
}: AttachmentPreviewsProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        attachments.length && "grid grid-cols-5"
      )}
    >
      {attachments.map((attachment) => (
        <AttachmentPreview
          key={attachment.file.name}
          attachment={attachment}
          onRemoveClick={() => removeAttachment(attachment.file.name)}
        />
      ))}
    </div>
  );
};

export default AttachmentPreviews;

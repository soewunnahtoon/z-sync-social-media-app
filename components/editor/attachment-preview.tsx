import Image from "next/image";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const AttachmentPreview = ({
  attachment: { file, mediaId, isUploading },
  onRemoveClick,
}: AttachmentPreviewProps) => {
  const src = URL.createObjectURL(file);

  return (
    <div className={cn("relative mx-auto", isUploading && "opacity-50")}>
      {file.type.startsWith("image") ? (
        <Image
          src={src}
          alt="attachment-preview"
          width={500}
          height={500}
          className="rounded-2xl object-cover w-full h-full"
        />
      ) : (
        <video controls className="size-fit max-h-[30rem] rounded-2xl">
          <source src={src} type={file.type} />
        </video>
      )}

      {!isUploading && (
        <button
          onClick={onRemoveClick}
          className="absolute right-2 top-2 rounded-full bg-foreground p-1 text-background transition-colors hover:bg-foreground/60"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};

export default AttachmentPreview;

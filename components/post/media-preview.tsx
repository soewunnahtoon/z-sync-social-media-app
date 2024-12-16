import Image from "next/image";

import { Media } from "@prisma/client";

interface MediaPreviewProps {
  media: Media;
}

const MediaPreview = ({ media }: MediaPreviewProps) => {
  if (media.type === "IMAGE") {
    return (
      <Image
        src={media.url}
        alt="attachment"
        width={500}
        height={500}
        className="mx-auto rounded-2xl w-full h-full object-cover"
      />
    );
  }

  if (media.type === "VIDEO") {
    return (
      <div>
        <video
          src={media.url}
          controls
          className="mx-auto size-fit max-h-[30rem] rounded-2xl"
        />
      </div>
    );
  }

  return <p className="text-destructive">Unsupported media type</p>;
};

export default MediaPreview;

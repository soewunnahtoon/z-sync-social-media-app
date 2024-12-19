import MediaPreview from "@/components/post/MediaPreview";

import { Media } from "@prisma/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface MediaPreviewsProps {
  attachments: Media[];
}

const MediaPreviews = ({ attachments }: MediaPreviewsProps) => {
  return (
    <Carousel className="relative">
      <CarouselContent>
        {attachments.map((m) => (
          <CarouselItem
            key={m.id}
            className={cn(
              attachments.length > 3
                ? "basis-1/3"
                : attachments.length >= 2
                ? "basis-1/2"
                : ""
            )}
          >
            <MediaPreview media={m} />
          </CarouselItem>
        ))}
      </CarouselContent>

      {attachments.length > 2 && (
        <CarouselPrevious className="left-0 top-1/2" />
      )}
      {attachments.length > 2 && <CarouselNext className="right-0 top-1/2" />}
    </Carousel>
  );
};
export default MediaPreviews;

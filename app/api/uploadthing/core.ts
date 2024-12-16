import streamServerClient from "@/lib/stream";

import { createUploadthing, FileRouter } from "uploadthing/next";
import { UploadThingError, UTApi } from "uploadthing/server";
import { prisma } from "@/lib/prisma";
import { validateUser } from "@/actions/auth/validate-user";

const f = createUploadthing();

export const fileRouter = {
  avatar: f({ image: { maxFileSize: "512KB" } })
    .middleware(async () => {
      const user = await validateUser();
      if (!user) throw new UploadThingError("Unauthorized");

      return { user };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const oldAvatarUrl = metadata.user.avatarUrl;

      if (oldAvatarUrl) {
        const key = oldAvatarUrl.split(`/f/`)[1];

        await new UTApi().deleteFiles(key);
      }

      await Promise.all([
        prisma.user.update({
          where: { id: metadata.user.id },
          data: { avatarUrl: file.url },
        }),

        streamServerClient.partialUpdateUser({
          id: metadata.user.id,
          set: { image: file.url },
        }),
      ]);

      return { avatarUrl: file.url };
    }),
  attachment: f({
    image: { maxFileSize: "4MB", maxFileCount: 5 },
    video: { maxFileSize: "64MB", maxFileCount: 5 },
  })
    .middleware(async () => {
      const user = await validateUser();
      if (!user) throw new UploadThingError("Unauthorized");

      return {};
    })
    .onUploadComplete(async ({ file }) => {
      const media = await prisma.media.create({
        data: {
          url: file.url,
          type: file.type.startsWith("image") ? "IMAGE" : "VIDEO",
        },
      });

      return { mediaId: media.id };
    }),
} satisfies FileRouter;

export type AppFileRouter = typeof fileRouter;

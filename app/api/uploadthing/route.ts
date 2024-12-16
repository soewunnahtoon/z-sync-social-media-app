import { createRouteHandler } from "uploadthing/next";
import { fileRouter } from "@/app/api/uploadthing/core";

export const { GET, POST } = createRouteHandler({
  router: fileRouter,
});

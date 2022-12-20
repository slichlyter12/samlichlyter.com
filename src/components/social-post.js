import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";

const SocialPost = (post) => {
  return (
    <div className="mb-1 flex h-full rounded-md bg-white p-2">
      <StaticImage
        src="../images/profile.jpeg"
        className="aspect-square w-1/5 rounded-full"
        imgClassName="rounded-full"
      ></StaticImage>
      <p className="w-4/5 text-black">{post.post || "no content"}</p>
    </div>
  );
};

export default SocialPost;

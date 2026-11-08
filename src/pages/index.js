import React, { useState, useEffect } from "react";
import { StaticImage } from "gatsby-plugin-image";
import {
  faBluesky,
  faMastodon,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import MastodonToot from "../components/mastodon-toot";
import SocialLink from "../components/social-link";
import PixelfedPost from "../components/pixelfed-post";

const mycomponent = () => {
  const somedata = "data"
}

const IndexPage = () => {
  const greetings = [
    "Hello there!",
    "Welcome to my humble internet abode!",
    "Tag! You're it!",
  ];

  const random = (list) => {
    return list[Math.floor(Math.random() * list.length)];
  };

  const socials = [
    {
      socialType: "mastodon",
      name: "@samlichlyter@pdx.social",
      icon: faMastodon,
      link: "https://pdx.social/@samlichlyter",
    },
    {
      socialType: "bluesky",
      name: "@samlichlyter.bsky.social",
      icon: faBluesky,
      link: "https://bsky.app/profile/samlichlyter.bsky.social",
    },
    {
      socialType: "github",
      name: "@slichlyter12",
      icon: faGithub,
      link: "https://github.com/slichlyter12",
    },
    {
      socialType: "linkedin",
      name: "@slichlyter12",
      icon: faLinkedin,
      link: "https://www.linkedin.com/in/slichlyter12/",
    },
  ];

  const [toots, setToots] = useState([]);
  useEffect(() => {
    fetch(
      `https://pdx.social/api/v1/accounts/109299434483023005/statuses?limit=15`
    )
      .then((response) => response.json())
      .then((results) => {
        setToots(results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(
      `https://pixelfed.pdx.social/api/pixelfed/v1/accounts/510533981864091649/statuses?limit=5&only_media=true`
    )
      .then((response) => response.json())
      .then((results) => {
        setPosts(results);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <main className="m-0 h-full bg-gradient-to-r from-rose-800 to-orange-600 bg-scroll p-5 text-white">
      <div className="flex">
        <div>
          <StaticImage
            className="aspect-square w-auto max-w-md rounded-full border-2 border-solid border-white drop-shadow-2xl"
            imgClassName="rounded-full drop-shadow-xl"
            alt="Sam wearing a Boston Red Sox baseball cap and a tan scarf with the Portland Thorns logo. Sam is a white man, in his late 20's with a short red-ish brown beard."
            src="../images/profile.jpeg"
          />
          <div className="sticky left-0 top-2 mb-auto">
            <p>You can find me at:</p>
            <ul className="text-lg">
              {socials.map((social) => (
                <SocialLink social={social} key={social.link} />
              ))}
            </ul>
          </div>
        </div>
        <div className="h-full w-2/3">
          <h1 className="text-8xl">Sam Lichlyter</h1>
          <h2 className="text-2xl">{random(greetings)} 👋🏻</h2>
          <div className="ml-5 w-full pt-12">
            <p>What I've been saying lately:</p>
            {toots.map((toot) => (
              <MastodonToot toot={toot} key={toot.id} />
            ))}
            {posts.map((post) => (
              <PixelfedPost post={post} key={post.id} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export const Head = () => <title>Sam Lichlyter</title>;

export default IndexPage;

import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faMastodon,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import SocialPost from "../components/social-post";

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
      name: "@samlichlyter@pdx.social",
      icon: faMastodon,
      link: "https://pdx.social/@samlichlyter",
    },
    {
      name: "@slichlyter12",
      icon: faInstagram,
      link: "https://www.instagram.com/slichlyter12/",
    },
    {
      name: "@slichlyter12",
      icon: faGithub,
      link: "https://github.com/slichlyter12",
    },
  ];

  const socialPosts = [
    {
      id: "0",
      profilePic: "../images/profile.jpeg",
      post: "We're on Mastodon!!",
    },
    {
      id: "1",
      post: "Another post!",
    },
  ];

  return (
    <main className="m-0 flex h-screen flex-col justify-between bg-gradient-to-r from-rose-800 to-orange-600 p-5 text-white">
      <div className="flex">
        <StaticImage
          className="aspect-square w-auto max-w-md rounded-full border-2 border-solid border-white drop-shadow-2xl"
          imgClassName="rounded-full drop-shadow-xl"
          alt="Sam wearing a Boston Red Sox baseball cap and a tan scarf with the Portland Thorns logo. Sam is a white man, in his late 20's with a short red-ish brown beard."
          src="../images/profile.jpeg"
        />
        <div className="h-full w-2/3">
          <h1 className="text-8xl">Sam Lichlyter</h1>
          <h2 className="text-2xl">{random(greetings)} 👋🏻</h2>
          <div className="ml-5 w-96 pt-24">
            <p>What I've been saying lately:</p>
            {socialPosts.map((social) => (
              <SocialPost social={social} key={social.id} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <p>You can find me at:</p>
        <ul className="text-lg">
          {socials.map((social) => (
            <div className="flex">
              <FontAwesomeIcon
                icon={social.icon}
                className="pr-2 pt-2"
              ></FontAwesomeIcon>
              <li key={social.name}>
                <a
                  href={social.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:underline"
                >
                  {social.name}
                </a>
              </li>
            </div>
          ))}
        </ul>
      </div>
      <div className="grow"></div>
    </main>
  );
};

export const Head = () => <title>Sam Lichlyter</title>;

export default IndexPage;

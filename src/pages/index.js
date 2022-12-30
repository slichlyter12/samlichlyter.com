import * as React from "react";
import { graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import {
  faInstagram,
  faMastodon,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import MastodonToot from "../components/mastodon-toot";
import SocialLink from "../components/social-link";

export const query = graphql`
  query Toots {
    allToot(sort: { created_at: DESC }, limit: 7) {
      nodes {
        content
        account {
          avatar
          display_name
          username
        }
        id
        reblog {
          content
          url
          account {
            avatar
            display_name
            username
          }
          media_attachments {
            url
            description
            meta {
              small {
                height
                width
              }
            }
          }
        }
        url
      }
    }
  }
`;

const IndexPage = ({ data }) => {
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
          <div className="sticky top-2 left-0 mb-auto">
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
            {data.allToot.nodes.map((toot) => (
              <MastodonToot toot={toot} key={toot.id} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export const Head = () => <title>Sam Lichlyter</title>;

export default IndexPage;

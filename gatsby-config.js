/**
 * @type {import('gatsby').GatsbyConfig}
 */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `samlichlyter.com`,
    siteUrl: `https://samlichlyter.com`,
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-source-mastodon",
      options: {
        api_url: "https://pdx.social/api/v1/",
        limit: 10,
        access_token: process.env.MASTO_ACCESS_TOKEN,
      },
    },
  ],
};

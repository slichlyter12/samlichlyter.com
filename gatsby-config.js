/**
 * @type {import('gatsby').GatsbyConfig}
 */
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
        api_url: "https://pdx.social/api/v2/",
        limit: 7,
        access_token: process.env.MASTO_ACCESS_TOKEN,
      },
    },
  ],
};

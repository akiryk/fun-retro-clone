import React from "react";
import { Link } from "gatsby";
import ReadStory from "../components/story/read_story";

import Layout from "../components/layout";
import SEO from "../components/seo";

const ThirdPage = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <ReadStory />
    <Link to="/">Go back to the homepage</Link>
  </Layout>
);

export default ThirdPage;

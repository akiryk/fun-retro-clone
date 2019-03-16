import React from "react";
import { Link } from "gatsby";
import CreateStory from "../components/story/create_story";

import Layout from "../components/layout";
import SEO from "../components/seo";

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <CreateStory />
    <Link to="/">Go back to the homepage</Link>
    <Link to="/page-3/">Go to page 3</Link>
  </Layout>
);

export default SecondPage;

import { Feed } from "feed";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const SITE_URL = "https://blog.timdehof.dev";
const SITE_TITLE = "Tim's Blog";
const SITE_DESCRIPTION = "A blog about my life and software development";

function generateRSS() {
  let posts;
  try {
    posts = JSON.parse(
      readFileSync(join(process.cwd(), ".velite/posts.json"), "utf-8"),
    );
  } catch (error) {
    console.error(
      `Error reading or parsing .velite/posts.json: ${error instanceof Error ? error.message : error}`,
    );
    process.exit(1);
  }

  const feed = new Feed({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    id: SITE_URL,
    link: SITE_URL,
    language: "en",
    image: `${SITE_URL}/avatar-tim.png`,
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Timothy DeHof`,
    updated: new Date(),
    generator: "Feed for Node.js",
    feedLinks: {
      rss: `${SITE_URL}/rss.xml`,
    },
    author: {
      name: "Timothy DeHof",
      email: "timdehof@gmail.com",
      link: SITE_URL,
    },
  });

  posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .forEach((post) => {
      const postUrl = `${SITE_URL}/blog/${post.slugAsParams || post.slug.split("/").pop()}`;

      feed.addItem({
        title: post.title,
        id: postUrl,
        link: postUrl,
        description: post.description,
        content: post.description,
        author: [
          {
            name: "Timothy DeHof",
            email: "timdehof@gmail.com",
            link: SITE_URL,
          },
        ],
        date: new Date(post.date),
        image: `${SITE_URL}/avatar-tim.png`,
      });
    });

  const publicDir = join(process.cwd(), "public");
  if (!existsSync(publicDir)) {
    mkdirSync(publicDir, { recursive: true });
  }

  writeFileSync(join(publicDir, "rss.xml"), feed.rss2());
  console.log("RSS feed generated successfully!");
}

generateRSS();

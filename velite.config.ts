import { copyFileSync, existsSync, mkdirSync } from "fs";
import { dirname, join, resolve } from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import sharp from "sharp";
import { defineCollection, defineConfig, s } from "velite";

interface CodeLineNode {
  type: string;
  children?: Array<{ type: string; value?: string }>;
  properties?: {
    className?: string[];
  };
}

const computedFields = async <T extends { slug: string; cover?: string }>(
  data: T,
) => {
  // Process cover image if present
  let cover = undefined;
  if (data.cover) {
    cover = await processImage(data.cover, data.slug);
  }

  return {
    ...data,
    cover,
    slugAsParams: data.slug.split("/").slice(1).join("/"),
  };
};

const processImage = async (src: string, slug: string) => {
  const slugDir = slug.replace(/\/index\.mdx$/, "").replace("blog/", "");

  // Resolve the source image path using path.resolve
  const imagePath = resolve(process.cwd(), "src/content/blog", slugDir, src);

  // Verify the resolved path starts with the post-directory root to prevent path traversal
  const postDirRoot = resolve(process.cwd(), "src/content/blog", slugDir);
  if (!imagePath.startsWith(postDirRoot)) {
    throw new Error(
      `Path traversal detected: ${src} is outside the post directory`,
    );
  }

  const outputDir = join(process.cwd(), "public/static/blog", slugDir);
  const outputPath = join(outputDir, src);

  // Ensure the full directory tree for the destination exists (including parent dirs of outputPath)
  const outputParentDir = dirname(outputPath);
  if (!existsSync(outputParentDir)) {
    mkdirSync(outputParentDir, { recursive: true });
  }

  // Copy the image to the output directory
  copyFileSync(imagePath, outputPath);

  // Process image for metadata
  const image = sharp(imagePath);
  const metadata = await image.metadata();

  // Generate blur data
  const blurImage = await image.resize(8, 8, { fit: "inside" }).toBuffer();

  return {
    src: `/static/blog/${slugDir}/${src}`,
    height: metadata.height,
    width: metadata.width,
    blurDataURL: `data:image/${metadata.format};base64,${blurImage.toString("base64")}`,
    blurWidth: 8,
    blurHeight: 8,
  };
};

const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(250),
      description: s.string().max(999).optional(),
      date: s.isodate(),
      published: s.boolean().default(true),
      tags: s.array(s.string()).optional(),
      canonical_url: s.string().url().optional(),
      cover: s.string().optional(),
      body: s.mdx(),
    })
    .transform(computedFields),
});

export default defineConfig({
  root: "src/content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: false, // Disable clean to preserve manually copied images
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: {
            dark: "github-dark",
            light: "github-light",
          },
          keepBackground: true,
          onVisitLine(node: CodeLineNode) {
            if (node.children?.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node: CodeLineNode) {
            node.properties?.className?.push("highlighted");
          },
          onVisitHighlightedWord(node: CodeLineNode) {
            node.properties = { className: ["word"] };
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
    remarkPlugins: [],
  },
});

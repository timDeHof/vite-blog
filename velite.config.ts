import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { join } from "path";
import sharp from "sharp";

const computedFields = <T extends { slug: string }>(data: T) => ({

	...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
});

const processImage = async (src: string) => {
	const imagePath = join(process.cwd(), "src/content/blog", src);
	const image = sharp(imagePath);
	const metadata = await image.metadata();

	// Generate blur data
	const blurImage = await image.resize(8, 8, { fit: "inside" }).toBuffer();

	return {
		src: `/static/${src}`,
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
			cover: s
				.string()
				.optional()
				.transform(async (src) => {
					if (!src) return undefined;
					return await processImage(src);
				}),
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
		clean: true,
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
					onVisitLine(node: any) {
						if (node.children.length === 0) {
							node.children = [{ type: "text", value: " " }];
						}
					},
					onVisitHighlightedLine(node: any) {
						node.properties.className.push("highlighted");
					},
					onVisitHighlightedWord(node: any) {
						node.properties.className = ["word"];
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

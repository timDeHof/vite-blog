
import { slug } from "github-slugger";
import { badgeVariants } from "./ui/badge";

interface TagProps {
	tag: string;
	current?: boolean;
	count?: number;
}
export function Tag({ tag, current, count }: TagProps) {
	return (
		<a
			className={badgeVariants({
				variant: current ? "default" : "secondary",
				className: "no-underline rounded-md",
			})}
			href={`/tags/${slug(tag)}`}>
			{tag} {count ? `(${count})` : null}
		</a>
	);
}

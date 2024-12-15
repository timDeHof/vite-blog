import { Calendar } from "lucide-react";

import { cn } from "../lib/utils";
import { formatDate } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Tag } from "./tag";
interface PostItemProps {
	slug: string;
	title: string;
	description?: string;
	date: string;
	tags?: string[];
}
export const PostItem = ({
	slug,
	title,
	description,
	date,
	tags,
}: PostItemProps) => {
	return (
		<article className='flex flex-col gap-2 border-border border-b py-3'>
			<div>
				<h2 className='text-2xl font-bold'>
					<a href={"/" + slug}>{title}</a>
				</h2>
			</div>
			<div className='flex gap-2'>
				{tags && tags.map((tag) => <Tag key={tag} tag={tag} />)}
			</div>
			<div className='max-w-none text-muted-foreground'>{description}</div>
			<div className='flex justify-between items-center'>
				<dl>
					<dt className='sr-only'>Published On</dt>
					<dd className='text-sm sm:text-base font-medium flex items-center gap-1'>
						<Calendar className='h-4 w-4' />
						<time dateTime={date}>{formatDate(date)}</time>
					</dd>
				</dl>
				<a
					href={"/" + slug}
					className={cn(buttonVariants({ variant: "link" }), "py-0")}>
					Read more →
				</a>
			</div>
		</article>
	);
};

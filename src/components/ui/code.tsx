import React from "react";
import CopyButton from "../copy-button";

interface CodeElementProps {
	children: string | string[];
	className?: string;
	[key: string]: any;
}

interface CodeBlockProps
	extends React.HTMLAttributes<HTMLPreElement | HTMLElement> {
	"children": React.ReactNode;
	"data-language"?: string;
	"data-theme"?: string;
	"data-title"?: string;
	"data-caption"?: string;
	"data-line-numbers"?: boolean;
	"data-highlighted-lines"?: string;
}

// Enhanced Pre component with better type safety
const Pre = ({ children, ...props }: React.ComponentProps<"pre">) => {
	const codeElement = React.Children.toArray(children).find(
		(child): child is React.ReactElement<CodeElementProps> =>
			React.isValidElement(child) && child.type === "code",
	);

	const codeContent = Array.isArray(codeElement?.props?.children)
		? codeElement?.props?.children.join("")
		: codeElement?.props?.children || "";

	return (
		<div className='group relative'>
			<CopyButton text={codeContent} />
			<pre {...props}>{children}</pre>
		</div>
	);
};

// Enhanced Code component with better structure
const Code = ({ children, className, ...props }: CodeBlockProps) => {
	const language = props?.["data-language"];
	const title = props?.["data-title"];
	const caption = props?.["data-caption"];
	const isInline = !className?.includes("language-");

	if (isInline) {
		return (
			<code
				className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm'
				{...props}>
				{children}
			</code>
		);
	}

	return (
		<div data-rehype-pretty-code-figure=''>
			{title && (
				<div data-rehype-pretty-code-title className='flex items-center gap-2'>
					{language && <span className='text-xs font-medium'>{language}</span>}
					<span>{title}</span>
				</div>
			)}
			<code className={className} {...props}>
				{children}
			</code>
			{caption && <div data-rehype-pretty-code-caption>{caption}</div>}
		</div>
	);
};

export { Code, Pre };

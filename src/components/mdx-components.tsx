import * as runtime from "react/jsx-runtime";
import React, { useState } from "react";
import { Copy, Check, Link } from "lucide-react";
import { Callout } from "./callout";

const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" ");

// Enhanced TypeScript interfaces
interface FrontMatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
  canonical_url?: string;
  cover?: string;
}

interface CodeElementProps {
  children: string | string[];
  className?: string;
  [key: string]: any;
}

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement | HTMLElement> {
  children: React.ReactNode;
  'data-language'?: string;
  'data-theme'?: string;
  'data-title'?: string;
  'data-caption'?: string;
  'data-line-numbers'?: boolean;
  'data-highlighted-lines'?: string;
}

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  id?: string;
}

// Enhanced Copy Button with better accessibility
const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy');
      setTimeout(() => setError(null), 2000);
    }
  };

  return (
    <button
      onClick={copy}
      className={cn(
        "code-block-copy-button",
        copied ? "text-green-500" : undefined,
        error ? "text-red-500" : undefined
      )}
      aria-label={error ? "Failed to copy" : copied ? "Copied!" : "Copy code"}
      title={error ? "Failed to copy" : copied ? "Copied!" : "Copy code"}
    >
      {error ? (
        "!"
      ) : copied ? (
        <Check className="h-3.5 w-3.5" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  );
};

// Enhanced Pre component with better type safety
const Pre = ({ children, ...props }: React.ComponentProps<'pre'>) => {
  const codeElement = React.Children.toArray(children).find(
    (child): child is React.ReactElement<CodeElementProps> =>
      React.isValidElement(child) && child.type === 'code'
  );

  const codeContent = Array.isArray(codeElement?.props?.children)
    ? codeElement?.props?.children.join('')
    : codeElement?.props?.children || '';

  return (
    <div className="group relative">
      <CopyButton text={codeContent} />
      <pre {...props}>{children}</pre>
    </div>
  );
};

// Enhanced Code component with better structure
const Code = ({ children, className, ...props }: CodeBlockProps) => {
  const language = props?.['data-language'];
  const title = props?.['data-title'];
  const caption = props?.['data-caption'];
  const isInline = !className?.includes('language-');

  if (isInline) {
    return (
      <code
        className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <div data-rehype-pretty-code-figure="">
      {title && (
        <div data-rehype-pretty-code-title className="flex items-center gap-2">
          {language && <span className="text-xs font-medium">{language}</span>}
          <span>{title}</span>
        </div>
      )}
      <code className={className} {...props}>
        {children}
      </code>
      {caption && (
        <div data-rehype-pretty-code-caption>{caption}</div>
      )}
    </div>
  );
};

// Enhanced heading component with better accessibility
const Heading = ({ children, id, ...props }: HeadingProps) => (
  <h2 id={id} className="group scroll-m-20 border-b pb-2" {...props}>
    {id && (
      <a
        href={`#${id}`}
        className="subheading-anchor block"
        aria-label={`Link to ${typeof children === 'string' ? children : 'section'}`}
      >
        {children}
        <Link className="ml-2 inline-block h-4 w-4 opacity-0 group-hover:opacity-100" />
      </a>
    )}
    {!id && children}
  </h2>
);

const components = {
  pre: Pre,
  code: Code,
  h2: Heading,
  'code[data-inline="true"]': ({ children }: { children: React.ReactNode }) => (
    <code className="font-mono text-sm">{children}</code>
  ),
  span: ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
    <span style={style}>{children}</span>
  ),
  Callout
};

interface MdxProps {
  code: string;
  frontMatter?: FrontMatter;
}

const useMDXComponents = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

export function MDXContent({ code, frontMatter }: MdxProps) {
  const Component = useMDXComponents(code);
  return (
    <article className="prose dark:prose-invert max-w-none">
      {frontMatter && (
        <div className="mb-8">
          <h1 className="mb-2">{frontMatter.title}</h1>
          <p className="text-muted-foreground mb-4">{frontMatter.description}</p>
          <div className="flex flex-wrap gap-2">
            {frontMatter.tags?.map((tag) => (
              <span
                key={tag}
                className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
      <Component components={components} />
    </article>
  );
}

export { components };
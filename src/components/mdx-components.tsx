import * as runtime from "react/jsx-runtime";
import React, { lazy, Suspense } from "react";
import { Link } from "lucide-react";
import { cn } from "@/lib/utils";

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
  level?: number;
}

// Dynamic imports for heavy components
const CopyButton = lazy(() => import('./copy-button'));
const Callout = lazy(() => import('./callout'));
const CoverImage = lazy(() => import('./cover-image'));
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
  const isInline = !className?.includes('language-');

  if (isInline) {
    return (
      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm" {...props}>
        {children}
      </code>
    );
  }

  return (
    <div className="group relative my-6" data-language={language}>
      <Suspense fallback={<div className="h-8 animate-pulse bg-muted rounded-md" />}>
        <CopyButton text={String(children)} />
      </Suspense>
      <pre className={className} {...props}>
        {children}
      </pre>
    </div>
  );
};

// Enhanced heading component with better type handling
const Heading = ({ children, id, level = 2, className, ...props }: HeadingProps) => {
  const linkContent = (
    <span className="inline-flex items-center">
      {children}
      {id && (
        <a
          href={`#${id}`}
          className="ml-2 inline-block h-4 w-4 opacity-0 group-hover:opacity-100"
          aria-label={`Link to ${typeof children === 'string' ? children : 'section'}`}
        >
          <Link className="h-4 w-4" />
        </a>
      )}
    </span>
  );

  const headingProps = {
    id,
    className: cn('group scroll-m-20 border-b pb-2', className),
    ...props
  };

  switch (level) {
    case 1:
      return <h1 {...headingProps}>{linkContent}</h1>;
    case 3:
      return <h3 {...headingProps}>{linkContent}</h3>;
    default:
      return <h2 {...headingProps}>{linkContent}</h2>;
  }
};

const components = {
  pre: Pre,
  code: Code,
  h1: (props: HeadingProps) => <Heading {...props} level={1} />,
  h2: (props: HeadingProps) => <Heading {...props} level={2} />,
  h3: (props: HeadingProps) => <Heading {...props} level={3} />,
  'code[data-inline="true"]': ({ children }: { children: React.ReactNode }) => (
    <code className="font-mono text-sm">{children}</code>
  ),
  span: ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
    <span style={style}>{children}</span>
  ),
  Callout: (props: any) => (
    <Suspense fallback={<div className="h-24 animate-pulse bg-muted rounded-lg" />}>
      <Callout {...props} />
    </Suspense>
  ),
  img: (props: any) => (
    <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-lg" />}>
      <CoverImage {...props} />
    </Suspense>
  ),
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
export default MDXContent;
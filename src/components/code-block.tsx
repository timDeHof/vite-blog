import { lazy, Suspense } from 'react';
import { cn } from '@/lib/utils';

const CopyButton = lazy(() => import('./copy-button'));

export function CodeBlock({ children, className, ...props }: any) {
  return (
    <div className={cn("relative", className)}>
      <Suspense fallback={<div className="h-6 w-6 animate-pulse bg-muted rounded-md" />}>
        <CopyButton text={String(children)} />
      </Suspense>
      <code {...props}>
        {children}
      </code>
    </div>
  );
}
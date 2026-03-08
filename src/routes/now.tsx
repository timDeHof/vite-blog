import { siteConfig } from '@/config/site';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Helmet } from 'react-helmet-async';

// Last updated timestamp - update this when making significant changes
const LAST_UPDATED = new Date('2026-03-07');

/**
 * Renders the "Now" page that presents current focus, learning journey, technical skills, goals, and connection links.
 *
 * @returns A JSX element containing page metadata (title, description, RSS), a last-updated timestamp, and structured content sections with external and internal navigation links.
 */
function NowPage() {
  return (
    <>
      <Helmet>
        <title>Now - Tim DeHof</title>
        <meta name="description" content="What I'm currently working on and learning" />
        <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/rss.xml" />
      </Helmet>

      <div className="container max-w-4xl py-6 lg:py-10">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-x-4">
            <h1 className="inline-block font-black text-4xl lg:text-5xl">
              Now
            </h1>
          </div>
        </div>
        <p className="text-muted-foreground text-sm mt-2 mb-8">
          Last updated: {LAST_UPDATED.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <hr className="my-8" />

        <div className="prose dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Current Focus</h2>
            <p className="text-muted-foreground text-lg">
              I'm currently enrolled in the <strong>AWS Cloud Institute's Cloud Application Developer</strong> curriculum.
              This comprehensive program is helping me develop enterprise-ready cloud computing skills with a focus on
              building scalable, cloud-native applications.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Learning Journey</h2>
            <p className="text-muted-foreground text-lg mb-4">
              My AWS Cloud Institute curriculum covers:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Software Development Fundamentals</li>
              <li>Scripting & Programming (TypeScript, Python)</li>
              <li>Data Structures & Algorithms</li>
              <li>DevOps & Version Control</li>
              <li>Distributed Systems Development & Software Architecture</li>
              <li>Relational & Nonrelational Databases</li>
              <li>Data Storage and Processing</li>
              <li>Data and Cloud Security</li>
              <li>Operating Systems & Networking</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'TanStack Router'].map((skill) => (
                    <span key={skill} className="bg-muted px-3 py-1 rounded-md text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Cloud & Backend</h3>
                <div className="flex flex-wrap gap-2">
                  {['AWS Lambda', 'DynamoDB', 'S3', 'CloudFront', 'API Gateway', 'IAM'].map((skill) => (
                    <span key={skill} className="bg-muted px-3 py-1 rounded-md text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Tools & Practices</h3>
                <div className="flex flex-wrap gap-2">
                  {['Git', 'GitHub', 'CI/CD', 'REST APIs', 'Serverless'].map((skill) => (
                    <span key={skill} className="bg-muted px-3 py-1 rounded-md text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Databases</h3>
                <div className="flex flex-wrap gap-2">
                  {['PostgreSQL', 'MongoDB', 'Redis', 'DynamoDB'].map((skill) => (
                    <span key={skill} className="bg-muted px-3 py-1 rounded-md text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Goals</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Complete AWS Cloud Institute Cloud Application Developer certification</li>
              <li>Build and deploy serverless applications on AWS</li>
              <li>Write technical blog posts about cloud development</li>
              <li>Contribute to open-source projects</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Connect</h2>
            <p className="text-muted-foreground text-lg mb-4">
              Feel free to reach out or follow my journey:
            </p>
            <div className="flex gap-4">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                GitHub
              </a>
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                Twitter/X
              </a>
              <Link
                to="/blog"
                search={{ page: '1' }}
                className="text-primary hover:underline"
              >
                Blog
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export const Route = createFileRoute('/now')({
  component: NowPage,
})

export default NowPage

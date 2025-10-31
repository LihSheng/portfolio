import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import { shimmerPlaceholderDataUrl } from '@/lib/image-utils';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/content';
import { compileMDXWithPlugins } from '@/lib/mdx';
import { BlogPost } from '@/types';

interface BlogPostPageProps {
    params: {
        slug: string;
    };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
    const posts = await getAllBlogPosts();

    return posts.map((post) => ({
        slug: post.slug,
    }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const post = await getBlogPostBySlug(params.slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: post.coverImage ? [
                {
                    url: post.coverImage,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ] : [],
            type: 'article',
            publishedTime: post.date,
            modifiedTime: post.updated,
            authors: [post.author.name],
            tags: post.tags,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: post.coverImage ? [post.coverImage] : [],
        },
        authors: [{ name: post.author.name }],
        keywords: post.tags,
    };
}

// Table of Contents component
function TableOfContents({ content }: { content: string }) {
    // Extract headings from content
    const headings = content.match(/^#{2,4}\s+(.+)$/gm) || [];
    
    if (headings.length === 0) return null;

    const tocItems = headings.map((heading) => {
        const level = heading.match(/^#+/)?.[0].length || 2;
        const text = heading.replace(/^#+\s+/, '');
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        
        return { level, text, id };
    });

    return (
        <div className="bg-muted/50 rounded-lg p-6 mb-8">
            <h2 className="font-semibold mb-4">Table of Contents</h2>
            <nav>
                <ul className="space-y-2">
                    {tocItems.map((item, index) => (
                        <li key={index}>
                            <a
                                href={`#${item.id}`}
                                className={`block text-sm hover:text-primary transition-colors ${
                                    item.level === 3 ? 'ml-4' : item.level === 4 ? 'ml-8' : ''
                                }`}
                            >
                                {item.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

// Get navigation data for previous/next posts
async function getPostNavigation(currentSlug: string) {
    const posts = await getAllBlogPosts();
    const currentIndex = posts.findIndex(p => p.slug === currentSlug);

    return {
        previous: currentIndex > 0 ? posts[currentIndex - 1] : null,
        next: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const post = await getBlogPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    // Compile MDX content
    const { content: mdxContent } = await compileMDXWithPlugins<BlogPost>(
        post.content || ''
    );

    // Get navigation
    const navigation = await getPostNavigation(params.slug);

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 py-6">
                    <Link
                        href="/writing"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Writing
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-12 lg:py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Cover Image */}
                        {post.coverImage && (
                            <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-8">
                                <Image
                                    src={post.coverImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                    placeholder="blur"
                                    blurDataURL={shimmerPlaceholderDataUrl}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                                />
                            </div>
                        )}

                        {/* Post Header */}
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                                    {post.title}
                                </h1>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    {post.excerpt}
                                </p>
                            </div>

                            {/* Metadata */}
                            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground border-b pb-6">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <span>{post.author.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <time dateTime={post.date}>
                                        {new Date(post.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </time>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <span>{post.readingTime} min read</span>
                                </div>
                                {post.updated && (
                                    <div className="flex items-center gap-2">
                                        <span>Updated:</span>
                                        <time dateTime={post.updated}>
                                            {new Date(post.updated).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </time>
                                    </div>
                                )}
                            </div>

                            {/* Tags */}
                            {post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <Link
                                            key={tag}
                                            href={`/writing?tag=${encodeURIComponent(tag)}`}
                                            className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:bg-secondary/80 transition-colors"
                                        >
                                            <Tag className="h-3 w-3" />
                                            {tag}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Table of Contents */}
                        <TableOfContents content={post.content} />

                        {/* Article Content */}
                        <article className="prose prose-gray dark:prose-invert max-w-none">
                            {mdxContent}
                        </article>
                    </div>
                </div>
            </section>

            {/* Post Navigation */}
            {(navigation.previous || navigation.next) && (
                <section className="py-12 border-t">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Previous Post */}
                                {navigation.previous && (
                                    <Link
                                        href={`/writing/${navigation.previous.slug}`}
                                        className="group p-6 border rounded-lg hover:bg-accent transition-colors"
                                    >
                                        <div className="space-y-3">
                                            <div className="text-sm text-muted-foreground">Previous Post</div>
                                            <h3 className="font-semibold group-hover:text-primary transition-colors">
                                                {navigation.previous.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {navigation.previous.excerpt}
                                            </p>
                                            <div className="text-xs text-muted-foreground">
                                                {navigation.previous.readingTime} min read
                                            </div>
                                        </div>
                                    </Link>
                                )}

                                {/* Next Post */}
                                {navigation.next && (
                                    <Link
                                        href={`/writing/${navigation.next.slug}`}
                                        className="group p-6 border rounded-lg hover:bg-accent transition-colors md:text-right"
                                    >
                                        <div className="space-y-3">
                                            <div className="text-sm text-muted-foreground">Next Post</div>
                                            <h3 className="font-semibold group-hover:text-primary transition-colors">
                                                {navigation.next.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {navigation.next.excerpt}
                                            </p>
                                            <div className="text-xs text-muted-foreground">
                                                {navigation.next.readingTime} min read
                                            </div>
                                        </div>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
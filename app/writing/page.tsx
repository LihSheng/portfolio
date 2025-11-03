import { Suspense } from 'react';
import { Metadata } from 'next';
import { getAllBlogPosts } from '@/lib/content';
import { WritingClient } from './writing-client';
import { WritingPageContent } from './writing-page-content';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Technical articles, tutorials, and insights on web development, programming, and technology.',
  openGraph: {
    title: 'Writing | Developer Portfolio',
    description: 'Technical articles, tutorials, and insights on web development, programming, and technology.',
    type: 'website',
  },
};

interface WritingPageProps {
  searchParams: Promise<{
    tag?: string;
    search?: string;
  }>;
}

export default async function WritingPage({ searchParams }: WritingPageProps) {
  const allPosts = await getAllBlogPosts();
  const { tag, search } = await searchParams;
  
  return (
    <WritingPageContent>
      <Suspense fallback={<div className="text-center">Loading posts...</div>}>
        <WritingClient 
          posts={allPosts} 
          initialTag={tag}
          initialSearch={search}
        />
      </Suspense>
    </WritingPageContent>
  );
}
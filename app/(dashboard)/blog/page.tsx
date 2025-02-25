'use client'
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '@/data/blogData';
import { useRouter } from 'next/navigation';

const Blog = () => {
    const router = useRouter()
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-lg text-gray-600">
          Latest articles, tips, and resources for test preparation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-brand-purple font-medium">
                  {post.category}
                </span>
                <span className="text-sm text-gray-500">
                  {post.readTime}
                </span>
              </div>
              <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
              <CardDescription>{post.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{post.date}</span>
                <Button variant="ghost" onClick={() => router.push(`/blog/${post.id}`)} size="sm" className="text-brand-purple hover:text-brand-purple/90">
                  Read more <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blog;

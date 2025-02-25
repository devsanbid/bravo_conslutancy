import { blogPosts } from "@/data/blogData";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BlogPostPageProps {
	params: {
		id: string;
	};
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
	const post = blogPosts.find((post) => post.id === parseInt(params.id));

	if (!post) {
		notFound();
	}

	return (
		<div className="container px-4 py-8">
			<Link href="/blog">
				<Button variant="ghost" className="mb-6 ml-10 gap-2">
					<ArrowLeft className="h-4 w-4" /> Back to Blog
				</Button>
			</Link>
			<article className="max-w-3xl ml-14">
				<header className="mb-8">
					<div className="flex items-center gap-4 mb-4">
						<span className="text-sm text-brand-purple font-medium">
							{post.category}
						</span>
						<span className="text-sm text-gray-500">{post.readTime}</span>
					</div>
					<h1 className="text-4xl font-bold text-gray-900 mb-4">
						{post.title}
					</h1>
					<p className="text-lg text-gray-600 mb-4">{post.description}</p>
					<time className="text-sm text-gray-500">{post.date}</time>
				</header>

				<div className="prose max-w-none">
					<p>
						This is a placeholder for the blog post content. In a real
						application, you would fetch the full content from your data source.
					</p>
				</div>
			</article>
		</div>
	);
}

export async function generateStaticParams() {
	return blogPosts.map((post) => ({
		id: post.id.toString(),
	}));
}

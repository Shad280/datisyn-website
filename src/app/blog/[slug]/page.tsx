import { use } from 'react';

type Props = { params: { slug: string } };

export default function BlogPostPage({ params }: Props) {
  // simple placeholder page — in a real app you'd fetch the post by slug
  return (
    <main style={{padding:40}}>
      <h1>Blog: {params.slug}</h1>
      <p>This is a sample blog post page for slug <strong>{params.slug}</strong>.</p>
    </main>
  );
}

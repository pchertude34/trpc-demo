import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import PostCard from '../components/PostCard';
import PublishPostForm from '../components/PublishPostForm';
import type { PostType } from './api/posts';
import type { AxiosResponse } from 'axios';
import { AUTHOR_ID } from '../utils/constants';

export default function RestPostsPage() {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    const postsResponse: AxiosResponse<PostType[]> = await axios.get('/api/posts');
    setPosts(postsResponse.data);
  }

  async function handleCreatePost(postTitle: string, postContent: string) {
    await axios.post('/api/posts', {
      title: postTitle,
      content: postContent,
      authorId: AUTHOR_ID,
    });
    loadPosts();
  }

  async function handleDeletePost(postId: number) {
    await axios.delete(`/api/posts/${postId}`, { data: { authorId: AUTHOR_ID } });
    loadPosts();
  }

  return (
    <>
      <Head>
        <title>Posts with REST</title>
      </Head>
      <main className="container mx-auto p-4">
        <h1 className="text-center text-3xl text-gray-700 font-extrabold">Posts with REST</h1>
        <div className="max-w-lg mt-4 mx-auto">
          <div className="flex flex-col space-y-2 mb-8">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                content={post.content}
                authorName={post.author.name}
                authorEmail={post.author.email}
                authorImageUrl={post.author.imageUrl}
                onDelete={post.author.id === AUTHOR_ID ? () => handleDeletePost(post.id) : undefined}
              />
            ))}
          </div>
          <PublishPostForm onSubmit={handleCreatePost} />
        </div>
      </main>
    </>
  );
}

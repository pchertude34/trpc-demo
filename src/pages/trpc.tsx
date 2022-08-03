import Head from 'next/head';
import { trpc } from '../utils/trpc';
import PostCard from '../components/PostCard';
import PublishPostForm from '../components/PublishPostForm';
import { AUTHOR_ID } from '../utils/constants';

export default function TrpcPostsPage() {
  const trpcContext = trpc.useContext();

  const { data: posts } = trpc.useQuery(['post.all']);
  const createPost = trpc.useMutation(['post.create'], {
    onSuccess() {
      trpcContext.invalidateQueries(['post.all']);
    },
  });
  const deletePost = trpc.useMutation(['post.delete'], {
    onSuccess() {
      trpcContext.invalidateQueries(['post.all']);
    },
  });

  function handleCreatePost(postTitle: string, postContent: string) {
    createPost.mutate({ title: postTitle, content: postContent, authorId: AUTHOR_ID });
  }

  function handleDeletePost(postId: number) {
    deletePost.mutate({ id: postId });
  }

  return (
    <>
      <Head>
        <title>Posts with tRPC</title>
      </Head>
      <main className="container mx-auto p-4">
        <h1 className="text-center text-3xl text-gray-700 font-extrabold">Posts with tRPC</h1>
        <div className="max-w-lg mt-4 mx-auto">
          <div className="flex flex-col space-y-2 mb-8">
            {posts?.map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                content={post.content}
                authorName={post.author.name}
                authorEmail={post.author.email}
                authorImageUrl={post.author.imageUrl}
                onDelete={post.authorId === AUTHOR_ID ? () => handleDeletePost(post.id) : undefined}
              />
            ))}
          </div>
          <PublishPostForm onSubmit={handleCreatePost} />
        </div>
      </main>
    </>
  );
}

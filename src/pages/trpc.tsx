import Head from 'next/head';
import { trpc } from '../utils/trpc';
import PostCard from '../components/PostCard';
import PublishPostForm from '../components/PublishPostForm';
import { AUTHOR_ID } from '../utils/constants';

export default function TrpcPostsPage() {
  return (
    <>
      <Head>
        <title>Posts with tRPC</title>
      </Head>
      <main className="container mx-auto p-4">
        <h1 className="text-center text-3xl text-gray-700 font-extrabold">Posts with tRPC</h1>
        <div className="max-w-lg mt-4 mx-auto">
          <div className="flex flex-col space-y-2 mb-8">{/* PostCard Goes Here */}</div>
          {/* PublishPostForm Goes Here */}
        </div>
      </main>
    </>
  );
}

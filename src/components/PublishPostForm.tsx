import { useState } from 'react';

type PublishPostFormProps = {
  onSubmit: (postTitle: string, postContent: string) => void;
  errorMessage?: string;
};

export default function PublishPostForm(props: PublishPostFormProps) {
  const { onSubmit, errorMessage } = props;

  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');

  function handleSubmit() {
    onSubmit(postTitle, postContent);
  }

  return (
    <div className="flex flex-col space-y-2 bg-purple-100 rounded-lg p-4">
      <h2 className="text-xl text-gray-700 font-semibold">Create Post</h2>
      <div>
        <label htmlFor="title" className="block text-md text-gray-600">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={(e) => setPostTitle(e.target.value)}
          className="p-2 shadow-sm  block w-full sm:text-sm border-2 border-gray-500 rounded-md"
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-md text-gray-600">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          rows={5}
          onChange={(e) => setPostContent(e.target.value)}
          className="p-2 shadow-sm block w-full  sm:text-sm border-2 border-gray-500 rounded-md"
        ></textarea>
      </div>
      {errorMessage && (
        <p className="text-xs text-red-500">
          Something went wrong while publishing your post! Please try again.
        </p>
      )}
      <button
        onClick={handleSubmit}
        className="w-full flex justify-center items-center px-4 py-2 border-2 border-gray-500 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        Publish
      </button>
    </div>
  );
}

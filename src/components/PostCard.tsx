import Image from 'next/image';

type PostCardProps = {
  title: string;
  content: string;
  authorName: string;
  authorEmail: string;
  authorImageUrl?: string;
  onDelete?: () => void;
};

export default function PostCard(props: PostCardProps) {
  const { title, content, authorName, authorEmail, authorImageUrl, onDelete } = props;

  return (
    <div className="w-full p-3 border-2 border-gray-500 duration-200 rounded shadow-md cursor-pointer flex flex-col motion-safe:hover:scale-105">
      <h3 className="text-lg font-semibold text-purple-600">{title}</h3>
      <p className="mt-1 text-sm text-gray-600 line-clamp-2">{content}</p>
      <div className="flex mt-6">
        {authorImageUrl && (
          <Image
            className="h-10 w-10 rounded-full"
            src={authorImageUrl}
            height={40}
            width={40}
            alt={`avatar of ${authorName}`}
          />
        )}
        <div className={authorImageUrl ? 'ml-2' : ''}>
          <p className="text-sm font-medium text-gray-700">{authorName}</p>
          <p className="text-sm text-gray-400">{authorEmail}</p>
        </div>
        {onDelete && (
          <button
            className="ml-auto text-sm px-2 rounded-md border-2 border-red-500 text-red-500 hover:bg-red-100"
            onClick={onDelete}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

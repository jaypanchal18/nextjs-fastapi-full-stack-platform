import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

interface Post {
  id: string;
  title: string;
  content: string;
}

interface PostPageProps {
  post: Post | null;
}

const PostPage: React.FC<PostPageProps> = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params || {};
  
  if (!id) {
    return {
      notFound: true,
    };
  }

  try {
    const res = await fetch(`http://localhost:8000/api/posts/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch post');
    }
    const post: Post = await res.json();

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        post: null,
      },
    };
  }
};

export default PostPage;
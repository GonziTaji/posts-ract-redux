import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import PostFilters from '../components/postFilters';
import PostForm from '../components/postForm';
import PostList from '../components/postList';
import { Post } from '../interfaces';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        loadPosts();
    }, []);

    async function loadPosts() {
        const body = await fetch('/api/posts').then((res) => res.json());

        setPosts(body.posts);
    }

    return (
        <div
            style={{
                maxWidth: '30rem',
            }}
        >
            <PostFilters />
            <PostList posts={posts} />
            <PostForm />
        </div>
    );
};

export default Home;

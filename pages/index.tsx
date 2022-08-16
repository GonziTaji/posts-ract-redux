import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from '../appstate/store';
import PostFilters from '../components/postFilters';
import PostForm from '../components/postForm';
import PostList from '../components/postList';
import { Post } from '../interfaces';

const Home: NextPage = () => {
    // const [posts, setPosts] = useState<Post[]>([]);

    // useEffect(() => {
    //     loadPosts();
    // }, []);

    // async function loadPosts() {
    //     const body = await fetch('/api/posts').then((res) => res.json());

    //     setPosts(body.posts);
    // }

    return (
        <Provider store={store}>
            <div
                style={{
                    maxWidth: '30rem',
                }}
            >
                <PostFilters />
                <PostList />
                <PostForm />
            </div>
        </Provider>
    );
};

export default Home;

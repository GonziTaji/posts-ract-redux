import type { NextPage } from 'next';
import { Provider } from 'react-redux';
import store from '../appstate/store';
import Header from '../components/header';
import PostFilters from '../components/postFilters';
import PostForm from '../components/postForm';
import PostList from '../components/postList';

const Home: NextPage = () => {
    return (
        <Provider store={store}>
            <div className="container">
                <Header />
                <PostFilters />
                <PostList className="my-2" />
                <PostForm />
            </div>
        </Provider>
    );
};

export default Home;

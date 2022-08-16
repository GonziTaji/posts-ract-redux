import {
    configureStore,
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';
import { Post } from '../interfaces';

interface NewPostForm {
    name: string;
    description: string;
}

interface AppState {
    posts: Post[];
    displayedPosts: Post[];
    postForm: NewPostForm;
    searchTerm: string;
    status: 'loading-list' | 'loading-add' | 'loading-delete' | 'idle';
}

const initialState: AppState = {
    posts: [],
    displayedPosts: [],
    postForm: {
        name: '',
        description: '',
    },
    searchTerm: '',
    status: 'idle',
};

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (postId: string) => {
        const body = await fetch('/api/posts/' + postId, {
            method: 'DELETE',
        }).then((res) => res.json());

        return body as { post_id: string };
    }
);

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const body = await fetch('/api/posts').then((res) => res.json());

    return body.posts as Post[];
});

export const createPost = createAsyncThunk(
    'posts/createPost',
    async (postForm: NewPostForm) => {
        const headers = new Headers();

        headers.append('Content-Type', 'application/json');

        const body = await fetch('/api/posts', {
            method: 'POST',
            headers,
            body: JSON.stringify(postForm),
        }).then((res) => res.json());

        return body as { post_id: string };
    }
);

function _filterPosts(posts: Post[], searchTerm: string) {
    if (searchTerm === '') {
        return posts;
    } else {
        const pattern = new RegExp(searchTerm, 'i');

        return posts.filter(
            (p) => pattern.test(p.name) || pattern.test(p.description)
        );
    }
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // addPost(state, action) {
        //     state.posts.push(state.postForm);
        //     state.postForm.name = '';
        //     state.postForm.description = '';
        // },
        // removePost(state, action) {
        //     const index = state.posts.findIndex(
        //         ({ post_id }) => post_id === action.payload.id
        //     );

        //     state.posts.splice(index, 1);
        // },
        setForm(
            state,
            action: {
                payload: { field: 'name' | 'description'; value: string };
            }
        ) {
            const fieldChanged = action.payload.field;

            state.postForm[fieldChanged] = action.payload.value;
        },
        filterPosts(state, action) {
            state.searchTerm = action.payload.searchTerm.trim();
            state.displayedPosts = _filterPosts(state.posts, state.searchTerm);

            if (state.searchTerm === '') {
                state.displayedPosts = state.posts;
            } else {
                const pattern = new RegExp(state.searchTerm, 'i');

                state.displayedPosts = state.posts.filter(
                    (p) => pattern.test(p.name) || pattern.test(p.description)
                );
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading-list';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'idle';
                state.posts = action.payload;
                state.displayedPosts = action.payload;
            })
            .addCase(createPost.pending, (state) => {
                state.status = 'loading-add';
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts.push({
                    post_id: action.payload.post_id,
                    name: state.postForm.name,
                    description: state.postForm.description,
                });

                state.displayedPosts = _filterPosts(
                    state.posts,
                    state.searchTerm
                );

                state.postForm.name = '';
                state.postForm.description = '';
                state.status = 'idle';
            })
            .addCase(deletePost.pending, (state) => {
                state.status = 'loading-delete';
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                const index = state.posts.findIndex(
                    (p) => p.post_id === action.payload.post_id
                );

                state.posts.splice(index, 1);

                state.displayedPosts = _filterPosts(
                    state.posts,
                    state.searchTerm
                );

                state.status = 'idle';
            });
    },
});

const store = configureStore({
    reducer: postSlice.reducer,
});

export const { setForm, filterPosts } = postSlice.actions;

export const selectPosts = (state: AppState) => state.posts;
export const selectDisplayedPosts = (state: AppState) => state.displayedPosts;
export const selectPostForm = (state: AppState) => state.postForm;
export const selectStatus = (state: AppState) => state.status;
export const selectSearchterm = (state: AppState) => state.searchTerm;

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

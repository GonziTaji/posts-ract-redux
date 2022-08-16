import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../appstate/hooks';
import {
    deletePost,
    fetchPosts,
    selectDisplayedPosts,
    selectPosts,
    selectStatus,
} from '../appstate/store';

interface PostListProps {
    // posts: Post[];
}

export default function PostList({}: PostListProps) {
    const dispatch = useAppDispatch();
    // const dispatchDeletePosts = (id: string) => dispatch(deletePost(id))
    const posts = useSelector(selectPosts);
    const displayedPosts = useSelector(selectDisplayedPosts);
    const status = useSelector(selectStatus);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Acción</th>
                </tr>
            </thead>

            <tbody>
                {displayedPosts.map(({ post_id, name, description }, i) => (
                    <tr key={i}>
                        <td>{name}</td>
                        <td>{description}</td>
                        <td>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => dispatch(deletePost(post_id))}
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../appstate/hooks';
import {
    deletePost,
    fetchPosts,
    selectActiveSearchterm,
    selectDisplayedPosts,
    selectPosts,
    selectStatus,
} from '../appstate/store';
import { WithClassName } from '../interfaces';

interface PostListProps extends WithClassName {}

const BigNumber = ({ children }: any) => (
    <span className="lead px-2 bold">{children}</span>
);

export default function PostList({ className = '' }: PostListProps) {
    const dispatch = useAppDispatch();
    const posts = useSelector(selectPosts);
    const displayedPosts = useSelector(selectDisplayedPosts);
    const status = useSelector(selectStatus);
    const activeSearchTerm = useSelector(selectActiveSearchterm);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <div className={'card ' + className}>
            <div className="card-body">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th className="text-right">Acción</th>
                        </tr>
                    </thead>

                    <tbody>
                        {status === 'loading-list' ? (
                            <tr>
                                <td colSpan={3} className="text-end">
                                    <span>Cargando Posts</span>
                                    <div
                                        className="spinner-border text-primary"
                                        role="status"
                                    >
                                        <span className="visually-hidden">
                                            Cargando...
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            displayedPosts.map(
                                ({ post_id, name, description }, i) => (
                                    <tr key={i}>
                                        <td>{name}</td>
                                        <td>{description}</td>
                                        <td style={{ width: '1px' }}>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() =>
                                                    dispatch(
                                                        deletePost(post_id)
                                                    )
                                                }
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                )
                            )
                        )}
                    </tbody>
                </table>

                <div className="d-flex justify-content-between align-items-center">
                    <span>Filtro activo: {activeSearchTerm}</span>

                    <span>
                        Mostrando
                        <BigNumber>{displayedPosts.length}</BigNumber>
                        Posts de
                        <BigNumber>{posts.length}</BigNumber>
                    </span>
                </div>
            </div>
        </div>
    );
}

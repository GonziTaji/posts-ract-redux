import { Fragment } from 'react';
import { Post } from '../interfaces';
import styles from '../styles/Home.module.css';

interface PostListProps {
    posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
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
                {posts.map(({ name, description }, i) => (
                    <tr key={i}>
                        <td>{name}</td>
                        <td>{description}</td>
                        <td>
                            <button className="btn btn-sm btn-danger">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

import { FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../appstate/hooks';
import { createPost, selectPostForm, setForm } from '../appstate/store';

interface PostFormProps {}

export default function PostForm({}: PostFormProps) {
    const dispatch = useAppDispatch();
    const postForm = useSelector(selectPostForm);

    const onsubmit = async (ev: FormEvent) => {
        ev.preventDefault();
        const headers = new Headers();

        headers.append('Content-Type', 'application/json');

        const response = await fetch('/api/posts', {
            method: 'POST',
            headers,
            body: JSON.stringify({
                name: 'post 1',
                description: 'este es mi primer post',
            }) as any,
        });
    };

    return (
        <div>
            <label htmlFor="name">Nombre</label>
            <input
                value={postForm.name}
                type="text"
                className="form-control"
                id="name"
                onChange={(ev) =>
                    dispatch(
                        setForm({
                            field: 'name',
                            value: ev.currentTarget.value,
                        })
                    )
                }
            />

            <label htmlFor="description">Descripción</label>
            <textarea
                value={postForm.description}
                className="form-control"
                id="description"
                onChange={(ev) =>
                    dispatch(
                        setForm({
                            field: 'description',
                            value: ev.currentTarget.value,
                        })
                    )
                }
            />

            <div className="text-end">
                <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={() => dispatch(createPost(postForm))}
                >
                    Crear
                </button>
            </div>
        </div>
    );
}

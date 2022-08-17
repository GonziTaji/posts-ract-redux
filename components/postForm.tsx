import { useSelector } from 'react-redux';
import { useAppDispatch } from '../appstate/hooks';
import {
    createPost,
    selectPostForm,
    selectStatus,
    setForm,
} from '../appstate/store';
import { WithClassName } from '../interfaces';

interface PostFormProps extends WithClassName {}

export default function PostForm({ className }: PostFormProps) {
    const dispatch = useAppDispatch();
    const postForm = useSelector(selectPostForm);
    const status = useSelector(selectStatus);

    return (
        <div className={'card ' + className}>
            <div
                className="card-body row"
                style={{ gridTemplateColumns: 'auto 1fr auto' }}
            >
                <div className="col-12 col-sm-4">
                    <input
                        value={postForm.name}
                        type="text"
                        placeholder="Nombre"
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
                </div>

                <div className="col-12 col-sm">
                    <textarea
                        rows={1}
                        value={postForm.description}
                        className="form-control"
                        placeholder="Descripción"
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
                </div>

                <div className="col-12 col-sm-auto text-end">
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => dispatch(createPost(postForm))}
                    >
                        Crear Post
                        {status === 'loading-list' && (
                            <div
                                className="spinner-border text-primary"
                                role="status"
                            >
                                <span className="visually-hidden">
                                    Cargando...
                                </span>
                            </div>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

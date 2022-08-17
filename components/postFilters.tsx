import { useSelector } from 'react-redux';
import { useAppDispatch } from '../appstate/hooks';
import {
    clearFilters,
    filterPosts,
    selectSearchterm,
    setSearchTerm,
} from '../appstate/store';
import { WithClassName } from '../interfaces';

interface PostFilterProps extends WithClassName {}

export default function PostFilters({ className }: PostFilterProps) {
    const dispatch = useAppDispatch();
    const searchTerm = useSelector(selectSearchterm);

    return (
        <div className={'d-flex gap-3 ' + className}>
            <input
                value={searchTerm}
                onChange={(ev) =>
                    dispatch(setSearchTerm(ev.currentTarget.value))
                }
                type="text"
                className="form-control"
                placeholder="Buscar..."
                title="Puede buscar por nombre o por descripción"
            />

            <button
                type="button"
                className="btn btn-primary"
                onClick={() => dispatch(filterPosts())}
            >
                Filtrar
            </button>

            <button
                type="button"
                className="btn btn-warning"
                onClick={() => {
                    dispatch(clearFilters());
                }}
            >
                Limpiar
            </button>
        </div>
    );
}

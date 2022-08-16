import { FormEvent } from 'react';

interface PostFormProps {}

export default function PostForm({}: PostFormProps) {
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

        console.log(response);
    };

    return (
        <form onSubmit={onsubmit}>
            <label htmlFor="name">Nombre</label>
            <input type="text" className="form-control" id="name" />

            <label htmlFor="description">Descripción</label>
            <textarea className="form-control" id="description" />

            <div className="text-end">
                <button className="btn btn-sm btn-primary">Crear</button>
            </div>
        </form>
    );
}

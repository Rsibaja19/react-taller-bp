import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { db } from '../firebase';

const Formulario = () => {
    const [modoEdicion, setModoEdicion] = useState(false);
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [origen, setOrigen] = useState('')
    const [autor, setAutor] = useState('')
    const [nota, setNota] = useState('')
    const [edad, setEdad] = useState('')
    const [oficio, setOficio] = useState('')
    const [imagen, setImagen] = useState('');
    const [lista, setLista] = useState([])
    const [id, setId] = useState('')

    const obtenerImagen = async () => {
        try {
            const res = await fetch('https://picsum.photos/300');
            setImagen(res.url)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        obtenerImagen();
        const obtenerDatos = async () => {
            try {
                await onSnapshot(collection(db, 'Lista'), (query) => {
                    setLista(query.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                })
            } catch (error) {
                console.log(error)
            }
        }
        obtenerDatos();
    }, []);

    const guardar = async (e) => {
        e.preventDefault()
        try {
            const data = await addDoc(collection(db, 'Lista'), {
                nombre,
                descripcion,
                origen,
                autor,
                edad,
                nota,
                oficio,
                imagen,
            })

            setLista([
                ...lista,
                {
                    nombre,
                    descripcion,
                    origen,
                    autor,
                    edad,
                    nota,
                    oficio,
                    imagen,
                    id: data.id
                }
            ])

            setNombre('')
            setDescripcion('')
            setEdad('')
            setNota('')
            setAutor('')
            setOrigen('')
            setOficio('')
            setId('')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='container mt-5'>
            <div className="row">
                <div className="col-8">
                    <h4 className="text-center">Lista</h4>
                    <ul className="list-group">
                        {
                            lista.map(item => (
                                <li className="list-group-item" key={item.id}>
                                    <img src={item.imagen} alt={item.nombre} />
                                    <hr />
                                    <span className="lead"> {item.nombre} - {item.descripcion} - {item.origen} -</span>
                                    <span className="lead"> {item.autor} - {item.edad} - {item.oficio} -</span>
                                    <span className="lead"> {item.nota} </span>
                                    <button className="btn btn-danger btn-sm float-end mx-2"> Eliminar </button>
                                    <button className="btn btn-warning btn-sm float-end"> Editar </button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="col-4">
                    <h4 className="text-center">
                        {
                            modoEdicion ? 'Editar' : 'Agregar'
                        }
                    </h4>
                    <form onSubmit={guardar}>
                        <input type="text"
                            className='form-control mb-2'
                            placeholder='Ingrese Nombre'
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />

                        <input type="text"
                            className='form-control mb-2'
                            placeholder='Ingrese Descripción'
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />

                        <input type="text"
                            className='form-control mb-2'
                            placeholder='Lugar de Origen'
                            value={origen}
                            onChange={(e) => setOrigen(e.target.value)}
                        />

                        <input type="text"
                            className='form-control mb-2'
                            placeholder='Ingrese Autor'
                            value={autor}
                            onChange={(e) => setAutor(e.target.value)}
                        />

                        <input type="number"
                            className='form-control mb-2'
                            placeholder='Ingrese Edad'
                            value={edad}
                            onChange={(e) => setEdad(e.target.value)}
                        />

                        <input type="text"
                            className='form-control mb-2'
                            placeholder='Ingrese Oficio'
                            value={oficio}
                            onChange={(e) => setOficio(e.target.value)}
                        />

                        <input type="text"
                            className='form-control mb-2'
                            placeholder='Agregue una Nota'
                            value={nota}
                            onChange={(e) => setNota(e.target.value)}
                        />
                        <div className='row my-2'>
                            <img src={imagen} alt="imagen" className='rounded' width={200} height={200} />
                        </div>

                        {
                            modoEdicion ?
                                (
                                    <>
                                        <button
                                            className="btn btn-warning btn-block"
                                        >
                                            Editar
                                        </button>
                                        <button className="btn btn-dark btn-block mx-2"
                                        >
                                            Cancelar
                                        </button>
                                    </>
                                )
                                :
                                <button className="btn btn-primary btn-block" type='submit'>
                                    Agregar
                                </button>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Formulario

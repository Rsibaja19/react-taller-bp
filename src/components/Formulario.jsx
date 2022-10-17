import React, { useState, useEffect } from 'react'
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
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

    const cancelar = () => {
        setModoEdicion(false)
        setNombre('')
        setDescripcion('')
        setEdad('')
        setNota('')
        setAutor('')
        setOrigen('')
        setOficio('')
        setId('')
    }
    const eliminar = async (id) => {
        try {
            await deleteDoc(doc(db, 'Lista', id))
        } catch (error) {
            console.log(error)
        }
    }

    const editar = (item) => {
        setNombre(item.nombre)
        setDescripcion(item.descripcion)
        setEdad(item.edad)
        setNota(item.nota)
        setAutor(item.autor)
        setOrigen(item.origen)
        setOficio(item.oficio)
        setId(item.id)
        setImagen(item.imagen)
        setModoEdicion(true)
    }

    const editar2 = async e => {
        e.preventDefault()

        try {
            const docRef = doc(db, 'Lista', id);
            await updateDoc(docRef, {
                nombre,
                descripcion,
                origen,
                autor,
                edad,
                nota,
                oficio,
                imagen,
            })

            const nuevoArray = lista.map(
                item => item.id === id ? {
                    id: id,
                    nombre,
                    descripcion,
                    origen,
                    autor,
                    edad,
                    nota,
                    oficio,
                    imagen,
                } : item
            )

            setLista(nuevoArray)
            setModoEdicion(false)
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
                                <li className="list-group-item text-center" key={item.id}>
                                    <img src={item.imagen} alt={item.nombre} />
                                    <hr />
                                    <span className="lead"> {item.nombre} - {item.descripcion} - {item.origen} -</span>
                                    <span className="lead"> {item.autor} - {item.edad} - {item.oficio} -</span>
                                    <span className="lead"> {item.nota} </span>
                                    <button className="btn btn-danger btn-sm float-end mx-2" onClick={() => { eliminar(item.id) }}> Eliminar </button>
                                    <button className="btn btn-warning btn-sm float-end" onClick={() => { editar(item) }}> Editar </button>
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
                    <form onSubmit={modoEdicion ?editar2: guardar}>
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
                            <img src={imagen} alt="imagen" width={200} height={200} />
                        </div>

                        {
                            modoEdicion ?
                                (
                                    <>
                                        <button
                                            className="btn btn-warning btn-block"
                                            type='submit'
                                        >
                                            Editar
                                        </button>
                                        <button className="btn btn-dark btn-block mx-2"
                                            onClick={cancelar}>
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

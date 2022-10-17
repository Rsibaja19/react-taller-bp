import React, { useState, useEffect } from 'react'

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
    }, []);

    return (
        <div className='container mt-5'>
            <div className="row">
                <div className="col-8">
                    <h4 className="text-center">Lista</h4>
                </div>
                <div className="col-4">
                    <h4 className="text-center">
                        {
                            modoEdicion ? 'Editar' : 'Agregar'
                        }
                    </h4>
                    <form >
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

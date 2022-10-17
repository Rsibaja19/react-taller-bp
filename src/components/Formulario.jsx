import React, { useState } from 'react'

const Formulario = () => {
    const [modoEdicion, setModoEdicion] = useState(false);
    return (
        <div className='container mt-5'>
            <div className="row">
                <div className="col-8">
                    <h4 className="text-center">Lista de Personajes</h4>
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
                        />

                        <input type="text"
                            className='form-control mb-2'
                            placeholder='Ingrese Descripción'
                        />

                        <input type="text"
                            className='form-control mb-2'
                            placeholder='Lugar de Origen'
                        />

                        <input type="text"
                            className='form-control mb-2'
                            placeholder='Ingrese Objeto Insignia'
                        />

                        <input type="text"
                            className='form-control mb-2'
                            placeholder='Ingrese Edad del Personaje'
                        />

                        <input type="text"
                            className='form-control mb-2'
                            placeholder='Ingrese Rol del Personaje'
                        />

                        <input type="text"
                            className='form-control mb-2'
                            placeholder='Agregue una Nota'
                        />

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

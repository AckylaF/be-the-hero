import React, { useEffect, useState } from 'react'
import { Power, Trash2 } from 'react-feather'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'
import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function Profile() {
    const [incidents, setIncidents] = useState([])

    const history = useHistory()

    const ongName = localStorage.getItem('ongName')
    const ongId = localStorage.getItem('ongId')

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId, 
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId])

    async function handleDelete(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            })
            
            setIncidents(incidents.filter(incident => incident.id !== id ))
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente')            
        }
    }

    function handleLogOut() {
        localStorage.clear()

        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>

                <span>Bem vinda, {ongName} </span>
                <Link to="/incidents/new" className="button">Cadastrar novo caso</Link>
                <button onClick={handleLogOut} type="button">
                    <Power size={20} color="#E02041" />
                </button>
            </header>

            <section className="incidents">
                <h1>Casos cadastrados</h1>

                <ul>
                    {incidents.map(incident => (
                        <li key={incident.id}>

                            <strong>caso:</strong>
                            <p>{incident.title}</p>

                            <strong>descrição:</strong>
                            <p>{incident.description}</p>

                            <strong>valor:</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                            <button onClick={() => handleDelete(incident.id)} type="button">
                                <Trash2 size={20} color="#a8a8b3" />
                            </button>

                        </li>
                    ))}
                    
                </ul>
            </section>
        </div>
    )
}
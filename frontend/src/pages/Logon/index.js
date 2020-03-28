import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { LogIn } from 'react-feather'

import api from '../../services/api'
import './styles.css'

import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

export default function Logon() {
    const [id, setId] = useState('')

    const history = useHistory()

    async function handleLogon(e) {
        e.preventDefault()

        try {
            const response = await api.post('/sessions', { id })
            
            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name)

            history.push('/profile')
        } catch (err) {
            alert('Falha no login, tente novamente')
        }
    }
    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the Hero"/>

                <form onSubmit={handleLogon}>
                    <h1>Faça seu logon</h1>
                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="link" to="/register">
                        <LogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={ heroesImg } alt="Heroes" />
        </div>
    )
}
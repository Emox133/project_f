import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuth} from '../contexts/authContext'
import axios from 'axios'
import {setAuthHeader} from '../utils/SetAuthHeader'

function Login() {
    const [fields, setFields] = useState({
      email: '',
      password: ''
    })

    const [errors, setErrors] = useState({
        combinedMessage: ''
    })

    const {setAuth} = useAuth()
    const history = useHistory()

    const handleFieldsChange = e => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        const data = {
            ...fields
        }

        axios.post('/users/login', data)
        .then(res => {
            if(res.status === 200) {
                setAuthHeader(res.data.token)
                setAuth(true)
                history.push('/')
            }
        })
        .catch(err => {
            console.log(err.response)
            const msg = err.response.data.message
            setErrors({combinedMessage: msg})
        })
    }

    return (
        <div className="welcome-container">
            <div className="welcome__box">
                <div className="welcome__title-box">
                    <h2 className="welcome__title">Prijava</h2>
                </div>
                <form className="welcome__form" onSubmit={handleSubmit}>
                    {errors.combinedMessage ? <span>{errors.combinedMessage}</span> : null}
                    <input className={errors.combinedMessage ? 'error' : null} type="email" placeholder="E-mail" name="email" onChange={handleFieldsChange}/>
                    {errors.combinedMessage ? <span>{errors.combinedMessage}</span> : null}
                    <input className={errors.combinedMessage ? 'error' : null} type="password" placeholder="Lozinka" name="password" onChange={handleFieldsChange}/>

                    <button className="welcome__btn btn-2" type="submit">Potvrdi</button>
                </form>
            </div>
        </div>
    )
}

export default Login

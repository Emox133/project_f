import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import {useAuth} from '../contexts/authContext'
import {setAuthHeader} from '../utils/SetAuthHeader'

function Signup() {
    const [fields, setFields] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
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

        axios.post('/users/signup', data)
        .then(res => {
            if(res.status === 201) {
                setAuthHeader(res.data.token)
                setAuth(true)
                history.push('/')
            }
        })
        .catch(err => {
            console.log(err.response)
            const errObj = err.response.status !== 403 ? err.response.data.error.errors : {
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            } 
            setErrors({...errObj})
        })
    }

    return (
        <div className="welcome-container">
            <div className="welcome__box">
                <div className="welcome__title-box">
                    <h2 className="welcome__title">Registracija</h2>
                </div>

                <form className="welcome__form" onSubmit={handleSubmit}>
                   {errors.firstName ? <span>{errors.firstName.message}</span> : null}
                   <input className={errors.firstName ? 'error' : null} type="text" placeholder="Ime" name="firstName" onChange={handleFieldsChange}/>
                   {errors.lastName ? <span>{errors.lastName.message}</span> : null}
                   <input className={errors.lastName ? 'error' : null} type="text" placeholder="Prezime" name="lastName" onChange={handleFieldsChange}/>
                   {errors.email ? <span>{errors.email.message}</span> : null}
                   <input className={errors.email ? 'error' : null} type="email" placeholder="E-mail" name="email" onChange={handleFieldsChange}/>
                   {errors.username ? <span>{errors.username.message}</span> : null}
                   <input className={errors.username ? 'error' : null} type="text" placeholder="Korisničko Ime" name="username" onChange={handleFieldsChange}/>
                   {errors.password ? <span>{errors.password.message}</span> : null}
                   <input className={errors.password ? 'error' : null} type="password" placeholder="Lozinka" name="password" onChange={handleFieldsChange}/>
                   {errors.confirmPassword ? <span>{errors.confirmPassword.message}</span> : null}
                   <input className={errors.confirmPassword ? 'error' : null} type="password" placeholder="Ponovite Lozinku" name="confirmPassword" onChange={handleFieldsChange}/>

                   <button className="welcome__btn btn-2" type="submit">Potvrdi</button>
                </form>
            </div>
        </div>
    )
}

export default Signup

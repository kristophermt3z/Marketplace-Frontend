import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css';  

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/crear-vendedores`, {
                email,
                password
            });
            alert('Usuario registrado exitosamente');
            
        } catch (error) {
            setError('Error al registrar el usuario');
        }
    };

    return (
        <div className="register-container">
            <h1>Registro de Usuario</h1>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Contraseña</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label>Confirmar Contraseña</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
}

export default RegisterPage;

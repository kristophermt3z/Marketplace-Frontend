import React, { useState } from 'react';
import axios from 'axios';

function VendedorForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/crear-vendedores`, { email, password });
            alert('Vendedor creado: ' + response.data);
            setEmail('');
            setPassword('');
        } catch (error) {
            alert('Error al crear vendedor: ' + error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registrar Vendedor</h2>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Contraseña:</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Registrar</button>
        </form>
    );
}

export default VendedorForm;

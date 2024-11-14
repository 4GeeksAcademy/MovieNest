import React from 'react';

const SendEmailButton = () => {
    const handleClick = async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/send_email`, {
                method: 'POST',
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
            } else {
                alert('Hubo un error: ' + data.error);
            }
        } catch (error) {
            alert('Hubo un error al enviar el correo: ' + error.message);
        }
    };

    return (
        <button onClick={handleClick}>
            Enviar Correo
        </button>
    );
};

export default SendEmailButton;

import React from 'react';

const LoginForm = () => {
    const handleBlur = (event) => {
        console.log(event.target.name, event.target.value);
        if (event.target.name === 'email') {
            const isEmailValid = /^\S+@\S+\.\S+/.test(event.target.value);
            console.log(isEmailValid);
        }
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 6;
            const isPasswordNumber = /\d{1}/.test(event.target.value);
            console.log(isPasswordValid && isPasswordNumber);
        }
    }
    const handleSubmit = () => {

    }
    return (
        <div>
            <h2>Our own Authentication</h2>
            <form onSubmit={handleSubmit}>
                Email: <input type="text" name="email" onBlur={handleBlur} placeholder="Enter Your Email" required />
                <br />
                Password: <input type="password" name="password" onBlur={handleBlur} placeholder="Enter Your Password" required />
                <br />
                <input type="submit" value="submit" />
            </form>
        </div>
    );
};

export default LoginForm;
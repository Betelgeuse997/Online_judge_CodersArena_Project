import React, { useState } from 'react';
import { Card, Form, Button, Image, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import image from '../../images/signIn.svg';
import { useAuth } from '../../context/AuthContext';
import { getUser } from '../../services/api';
import '../../CSS_Files/SignIn.css';
const SignIn = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState();

    const navigate = useNavigate();

    const { login } = useAuth();

    const inputValidation = () => {
        const errors = {};
        // const usernamePattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // if (!usernamePattern.test(username)) {
        //     errors.username = 'Invalid username address';
        // }
        if (password.trim().length !== password.length) {
            errors.password = 'Password Should not contain whitespace';
        }
        setErrors(errors); 
        return Object.keys(errors).length === 0;
    }

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (inputValidation()) {
            const result = await getUser({ username, password }); 
            console.log(result.status);
            if (result.status === 201) {
                setMessage(result.data.message);
                
            } else if (result.status === 202) {
                setMessage(result.data.message);
            } else if (result.status === 200) {
                setMessage(result.data.message);
                
                login(result.data.token, result.data.userId, result.data.username);

                setPassword('');
                setUsername('');
                try {
                    navigate('/');
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }

    const handleInputFocus = () => setMessage('');

    return (
        <div>
        <Card className='p-3 w-25'>
        
          {message && <Alert variant='danger'>{message}</Alert>}
          <Form onSubmit={handleSubmit} onFocus={handleInputFocus}>
            <Form.Group className='mb-3' controlId='formGroupusername'>
              <Form.Label className='form-label'><b>Username</b></Form.Label>
              <Form.Control
                required
                type='Username'
                placeholder='Enter Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                isInvalid={!!errors.username}
              />
              {errors.username && (
                <Form.Control.Feedback type='invalid'>
                  {errors.username}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className='mb-3' controlId='formGroupPassword'>
              <Form.Label className='form-label'>Password</Form.Label>
              <Form.Control
                required
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!errors.password}
              />
              {errors.password && (
                <Form.Control.Feedback type='invalid'>
                  {errors.password}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Button className='btn' variant='outline-dark' type='submit'>
              Submit
            </Button>
            <Form.Text className='form-text'>
              <span>Don't have an account?</span>&nbsp;
              <a className='fw-bold' href='/user/signUp'>
                Sign up
              </a>
            </Form.Text>
          </Form>
        </Card>
      </div>
    )
}

export default SignIn;
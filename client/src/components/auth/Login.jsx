import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { loginUser } from '../../actions/auth'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Login = ({ loginUser, isAuthenticated }) => {
    // Default states & variables
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        source: 'CODE Production'
    })
    const { email, password, source } = formData

    const changeHandler = (event) => setFormData({ ...formData, [event.target.name]: event.target.value })

    const submitHandler = (event) => {
        event.preventDefault()
        loginUser(email, password, source)
    }

    if (isAuthenticated) return <Navigate to='/issue/' />

    return (
        <div className='container py-5'>
            <div className='card bg-light'>
                <div className='card-header text-center'>
                    <h1>PLEASE LOG IN BELOW</h1>
                </div>
                <div className='card-body'>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className='mb-3'>
                            <Form.Label>
                                <h5>Email</h5>
                            </Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <img src='/assets/icons/email.svg' alt='' />
                                </InputGroup.Text>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter your email'
                                    name='email'
                                    value={email}
                                    onChange={changeHandler}
                                    required
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>
                                <h5>Password</h5>
                            </Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <img src='/assets/icons/password.svg' alt='' />
                                </InputGroup.Text>
                                <Form.Control
                                    type='password'
                                    placeholder='Enter your password'
                                    name='password'
                                    value={password}
                                    onChange={changeHandler}
                                    minLength='8'
                                    required
                                />
                            </InputGroup>
                        </Form.Group>
                        <div className='d-grid gap-2 col-12 mx-auto pt-4'>
                            <Button variant='warning' type='submit' size='lg'>
                                <b>Login</b>
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { loginUser })(Login)

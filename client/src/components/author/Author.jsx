import { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

// Redux
import { getAuthor } from '../../actions/author'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Author = ({ getAuthor, author: { author } }) => {
    // Default states & variables
    const [formData, setFormData] = useState({
        fname: '',
        lname: ''
    })
    const { fname, lname } = formData

    const changeHandler = (event) => setFormData({ ...formData, [event.target.name]: event.target.value })

    const submitHandler = (event) => {
        event.preventDefault()
        getAuthor(fname, lname)
        setFormData({
            fname: '',
            lname: ''
        })
    }

    // Set placeholder image
    const errorHandler = (event) => {
        event.target.src = '/assets/img/blank.png'
        event.onerror = null
    }

    return (
        <div className='py-5 px-5'>
            <h1 className='display-4 text-center py-5'>CODE Authors Search</h1>
            {/* Author Search Form */}
            <Form onSubmit={submitHandler}>
                <Form.Group className='mb-3'>
                    <InputGroup>
                        <InputGroup.Text>
                            <img src='/assets/icons/name.svg' alt='' />
                        </InputGroup.Text>
                        <Form.Control type='text' name='fname' placeholder={`Enter the author's first name`} value={fname} onChange={changeHandler} />
                        <Form.Control type='text' name='lname' placeholder={`Enter the author's last name`} value={lname} onChange={changeHandler} />
                        <Button variant='warning' type='submit' onClick={submitHandler}>
                            <img src='/assets/icons/search.svg' alt='' />
                        </Button>
                    </InputGroup>
                </Form.Group>
            </Form>
            {author.length > 0 && (
                <Card border='light' bg='light'>
                    <Card.Header as='h3'>Author Information</Card.Header>
                    <Card.Body>
                        <Table responsive hover className='card-text' size='sm'>
                            <thead>
                                <tr>
                                    <th>Profile Pic</th>
                                    <th>Name</th>
                                    <th>Company</th>
                                    <th>Email</th>
                                    <th>Is Author</th>
                                </tr>
                            </thead>
                            <tbody>
                                {author.map((author, index) => (
                                    <tr key={index}>
                                        <td>
                                            <img
                                                src={`https://epsmagazineproduction.azurewebsites.net/AuthorPhoto.aspx?id=${author.id}`}
                                                alt='Profile Pic'
                                                height='100px'
                                                width='100px'
                                                className='rounded-circle border border-light'
                                                onError={errorHandler}
                                            />
                                        </td>
                                        <td>
                                            <b>{author.searchName}</b>
                                        </td>
                                        <td>
                                            <i>{author.company}</i>
                                        </td>
                                        <td>
                                            <u>{author.emailAddresses.join(', ')}</u>
                                        </td>
                                        <td>
                                            {author.isAuthor === true ? (
                                                <div className='form-check form-switch'>
                                                    <input className='form-check-input' type='checkbox' role='switch' checked />
                                                </div>
                                            ) : (
                                                <div className='form-check form-switch'>
                                                    <input className='form-check-input' type='checkbox' role='switch' />
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            )}
        </div>
    )
}

Author.propTypes = {
    getAuthor: PropTypes.func.isRequired,
    author: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    author: state.author
})

export default connect(mapStateToProps, { getAuthor })(Author)

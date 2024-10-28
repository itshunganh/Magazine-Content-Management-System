import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button, Row, Col } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

// Redux
import { saveArticle } from '../../actions/article'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const ArticleAdd = ({ saveArticle }) => {
    // Default states & variables
    const empty = '00000000-0000-0000-0000-000000000000'
    const nav = useNavigate()
    const { id } = useParams()
    const [show, setShow] = useState(true)
    const [formData, setFormData] = useState({
        IssueId: id.toString(),
        Id: empty,
        Title: 'Sample',
        QuickId: '0',
        XmlBody: '',
        Abstract: '',
        AuthorNameId: empty,
        AuthorNameId2: empty,
        AuthorNameId3: empty,
        AuthorNameId4: empty,
        CoverType: 0,
        Optional: false
    })
    const {
        IssueId,
        Id,
        Title,
        QuickId,
        XmlBody,
        Abstract,
        AuthorNameId,
        AuthorNameId2,
        AuthorNameId3,
        AuthorNameId4,
        CoverType,
        Optional,
        Categories
    } = formData

    const formDataHandler = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleClose = () => {
        setShow(false)
        nav(`/issue/${IssueId}`)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        saveArticle(
            IssueId,
            Id,
            Title,
            QuickId,
            XmlBody,
            Abstract,
            AuthorNameId,
            AuthorNameId2,
            AuthorNameId3,
            AuthorNameId4,
            CoverType,
            Optional,
            Categories
        )
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose} size='lg' centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h1 className='display-4'>CODE Add</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className='py-4' onSubmit={submitHandler}>
                    <Form.Label>
                        <h3>New Article's Quick ID Rules:</h3>
                        <div className='lead'>
                            <ul>
                                <li>First two digits are the year (22 for 2022, etc.). </li>
                                <li>Next two digits are the issue (05 for May, etc.). </li>
                                <li>
                                    The next 2 digits are the sequential number of the article (01 = editorial, 02 = first article, 03 = second
                                    article, etc.).
                                </li>
                                <li>Last digit is the magazine (1 = CODE, 2 = CODE Focus, etc.).</li>
                            </ul>
                        </div>
                    </Form.Label>

                    {/* Quick ID */}
                    <Form.Group className='mb-3'>
                        <Form.Control type='number' name='QuickId' value={QuickId} onChange={formDataHandler} />
                    </Form.Group>

                    {/* Form Buttons */}
                    <Row>
                        <Col>
                            <div className='d-grid gap-2 pt-4'>
                                <Button variant='dark' type='submit' size='lg'>
                                    <b>Confirm</b>
                                </Button>
                            </div>
                        </Col>
                        <Col>
                            <div className='d-grid gap-2 pt-4'>
                                <Link to={`/issue/${IssueId}`} className='btn btn-light btn-lg'>
                                    <b>Cancel</b>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

ArticleAdd.propTypes = {
    saveArticle: PropTypes.func.isRequired
}

export default connect(null, { saveArticle })(ArticleAdd)

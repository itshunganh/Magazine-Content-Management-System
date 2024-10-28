import { useState, useEffect, useCallback, useTransition, Fragment } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button, Col, Row, Table } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tab from 'react-bootstrap/Tab'
import Tooltip from 'react-bootstrap/Tooltip'
import axios from 'axios'

// Custom React Components
import ArticleAuthor from './ArticleAuthor'
import ArticleCategory from './ArticleCategory'
import Upload from '../upload/Upload'
import Error from '../layout/Error'
import Loading from '../layout/Loading'

// Redux
import { saveArticle } from '../../actions/article'
import { deleteUpload } from '../../actions/upload'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Access service strings
const ARTICLE = 'https://epsservices-magazine.azurewebsites.net/ArticleDetails/'
const ATTACHMENTS = 'https://epsservices-file.azurewebsites.net/FilesByAttachedId/'

const ArticleEdit = ({ saveArticle, deleteUpload }) => {
    // Default states & variables
    const empty = '00000000-0000-0000-0000-000000000000'
    const nav = useNavigate()
    const { id } = useParams()
    const selectedAuthors = []
    const selectedCategories = []
    const formattedCategories = []
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isPending, startTransition] = useTransition()
    const [article, setArticle] = useState([])
    const [authorOption, setAuthorOption] = useState(null)
    const [categoryOption, setCategoryOption] = useState(null)
    const [formData, setFormData] = useState({
        IssueId: '',
        Id: '',
        Title: '',
        QuickId: '',
        XmlBody: '',
        Abstract: '',
        AuthorNameId: empty,
        AuthorNameId2: empty,
        AuthorNameId3: empty,
        AuthorNameId4: empty,
        CoverType: 0,
        Optional: false,
        DateModified: '',
        ReleaseDate: '',
        Categories: {
            Id: '',
            Category: '',
            CategoryGroup: '',
            Archived: false
        }
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

    const fetchArticle = useCallback(async () => {
        // Fetching article details
        await axios.get(`${ARTICLE}?ArticleId=${id}`).then((res) => {
            res.data.articles.forEach((article) => {
                article.files = []
                axios.get(`${ATTACHMENTS}?AttachedId=${article.id}`).then((res) => {
                    res.data.files.forEach((file) =>
                        article.files.push({
                            id: file.id,
                            url: file.azureFileUrl,
                            title: file.fileName,
                            category: file.category,
                            sub: file.subCategory,
                            type: file.fileType
                        })
                    )
                })

                selectedAuthors.push(
                    article.authorName !== null && {
                        value: article.authorNameId,
                        label: article.authorName
                    },
                    article.authorName2 !== null && {
                        value: article.authorNameId2,
                        label: article.authorName2
                    },
                    article.authorName3 !== null && {
                        value: article.authorNameId3,
                        label: article.authorName3
                    },
                    article.authorName4 !== null && {
                        value: article.authorNameId4,
                        label: article.authorName4
                    }
                )

                article.categories.map((category) =>
                    selectedCategories.push({
                        value: category.id,
                        label: category.category,
                        group: category.categoryGroup,
                        archived: category.archived
                    })
                )

                setFormData({
                    IssueId: article.issueId,
                    Id: article.id,
                    Title: article.title,
                    QuickId: article.quickId,
                    XmlBody: article.xmlBody,
                    Abstract: article.abstract,
                    AuthorNameId: article.authorNameId,
                    AuthorNameId2: article.authorNameId2,
                    AuthorNameId3: article.authorNameId3,
                    AuthorNameId4: article.authorNameId4,
                    CoverType: article.coverType,
                    Optional: article.optional,
                    Categories: article.categories.map((category) => ({
                        Id: category.id,
                        Category: category.category,
                        CategoryGroup: category.categoryGroup,
                        Archived: category.archived
                    }))
                })
                setAuthorOption(selectedAuthors)
                setCategoryOption(selectedCategories)
            })

            setArticle(res.data.articles)

            // Conclude loading once article data is fully fetched
            startTransition(() => setTimeout(() => setLoading(false), 1000))
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const formDataHandler = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const authorOptionHandler = (selection) => {
        setAuthorOption(selection)
        setFormData({
            ...formData,
            AuthorNameId: selection[0] && selection[0].value,
            AuthorNameId2: selection[1] && selection[1].value,
            AuthorNameId3: selection[2] && selection[2].value,
            AuthorNameId4: selection[3] && selection[3].value
        })
    }

    const categoryOptionHandler = (selection) => {
        setCategoryOption(selection)
        selection.map((category) =>
            formattedCategories.push({
                Id: category.value,
                Category: category.label,
                CategoryGroup: category.group,
                Archived: category.archived
            })
        )
        setFormData({
            ...formData,
            Categories: formattedCategories
        })
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
            parseInt(CoverType),
            JSON.parse(Optional),
            Categories
        )
        nav(`/issue/${IssueId}`)
    }

    useEffect(() => {
        fetchArticle()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) return Loading()
    if (error) {
        setError(error)
        return Error()
    } else {
        return (
            <Fragment>
                {isPending ? (
                    <div className='container text-center py-5 my-5'>
                        <img src='/assets/img/loading.gif' alt='' height='500px' width='500px' />
                    </div>
                ) : (
                    <div className='py-5 px-5'>
                        <h1 className='display-4 text-center pt-5'>CODE Edit</h1>
                        <Form className='py-4' onSubmit={submitHandler}>
                            <Tab.Container defaultActiveKey='editorial'>
                                <Nav variant='tabs' className='mb-3'>
                                    <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-top'>Article Details</Tooltip>}>
                                        <Nav.Item>
                                            <Nav.Link eventKey='editorial'>
                                                <img src='/assets/icons/editorial.svg' alt='' />
                                            </Nav.Link>
                                        </Nav.Item>
                                    </OverlayTrigger>

                                    <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-top'>Upload Files</Tooltip>}>
                                        <Nav.Item>
                                            <Nav.Link eventKey='upload'>
                                                <img src='/assets/icons/upload-article.svg' alt='' />
                                            </Nav.Link>
                                        </Nav.Item>
                                    </OverlayTrigger>

                                    <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-top'>XML Content</Tooltip>}>
                                        <Nav.Item>
                                            <Nav.Link eventKey='xml'>
                                                <img src='/assets/icons/xml.svg' alt='' />
                                            </Nav.Link>
                                        </Nav.Item>
                                    </OverlayTrigger>
                                </Nav>

                                <Tab.Content>
                                    <Tab.Pane eventKey='editorial'>
                                        {/* Quick ID */}
                                        <Form.Group className='mb-3'>
                                            <Form.Label>
                                                <b>Quick ID</b>
                                            </Form.Label>
                                            <Form.Control type='text' name='QuickId' value={QuickId} onChange={formDataHandler} />
                                        </Form.Group>

                                        {/* Title */}
                                        <Form.Group className='mb-3'>
                                            <Form.Label>
                                                <b>Title</b>
                                            </Form.Label>
                                            <Form.Control type='text' name='Title' value={Title} onChange={formDataHandler} />
                                        </Form.Group>

                                        {/* Abstract */}
                                        <Form.Group className='mb-3'>
                                            <Form.Label>
                                                <b>Abstract</b>
                                            </Form.Label>
                                            <Form.Control as='textarea' rows={5} name='Abstract' value={Abstract} onChange={formDataHandler} />
                                        </Form.Group>

                                        {/* Cover & Optional */}
                                        <Row>
                                            <Col sm={10}>
                                                <Form.Group className='mb-3'>
                                                    <Form.Label>
                                                        <b>Cover</b>
                                                    </Form.Label>
                                                    <Form.Select name='CoverType' defaultValue={CoverType} onChange={formDataHandler}>
                                                        <option value={0} label='No Cover'></option>
                                                        <option value={1} label='Major Cover'></option>
                                                        <option value={2} label='Minor Cover'></option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            <Col sm={2}>
                                                <Form.Group className='mb-3'>
                                                    <Form.Label>
                                                        <b>Optional</b>
                                                    </Form.Label>
                                                    <Form.Check
                                                        name='Optional'
                                                        type='switch'
                                                        id='custom-switch'
                                                        label='Optional Filler'
                                                        value={!Optional}
                                                        defaultChecked={(Optional === true && true) || (Optional === false && false)}
                                                        onChange={formDataHandler}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        {/* Categories/Technologies */}
                                        <ArticleCategory option={categoryOption} onChange={categoryOptionHandler} reload={formData} />

                                        {/* Author Information */}
                                        <ArticleAuthor option={authorOption} onChange={authorOptionHandler} />
                                    </Tab.Pane>

                                    <Tab.Pane eventKey='upload'>
                                        {/* File Uploads */}
                                        <Card border='light' bg='light'>
                                            <Card.Header>
                                                <Upload attachId={id} />
                                            </Card.Header>
                                            <Card.Body>
                                                {article[0].files.length > 0 && (
                                                    <Table responsive hover className='card-text' size='sm'>
                                                        <thead>
                                                            <tr>
                                                                <th>Category</th>
                                                                <th>Sub-Category</th>
                                                                <th>Type</th>
                                                                <th>Attachments</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {article[0].files.map((file, index) => (
                                                                <tr key={index}>
                                                                    <td>
                                                                        <b>{file.category.toUpperCase()}</b>
                                                                    </td>
                                                                    <td>{file.sub.toUpperCase()}</td>
                                                                    <td>
                                                                        <i>{file.type}</i>
                                                                    </td>
                                                                    <td>
                                                                        <a href={file.url} target='_blank' rel='noreferrer'>
                                                                            <img src='/assets/icons/download.svg' alt='' /> {file.title} <br></br>
                                                                        </a>
                                                                    </td>
                                                                    <td>
                                                                        <div className='d-flex justify-content-end'>
                                                                            <OverlayTrigger
                                                                                placement='top'
                                                                                overlay={<Tooltip id='tooltip-top'>Delete Attachment</Tooltip>}>
                                                                                <Button
                                                                                    variant='danger'
                                                                                    onClick={() => deleteUpload(file.id.toString(), id.toString())}>
                                                                                    <img src='/assets/icons/remove.svg' alt='' />
                                                                                </Button>
                                                                            </OverlayTrigger>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                )}
                                            </Card.Body>
                                        </Card>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey='xml'>
                                        {/* XML Content */}
                                        <Form.Group className='mb-3'>
                                            <Form.Label>
                                                <b>XML Content</b>
                                            </Form.Label>
                                            <Form.Control as='textarea' rows={25} name='XmlBody' value={XmlBody} onChange={formDataHandler} />
                                        </Form.Group>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>

                            {/* Form Buttons */}
                            <Row>
                                <Col>
                                    <div className='d-grid gap-2 pt-4'>
                                        <Button variant='dark' type='submit' size='lg'>
                                            <b>Save</b>
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
                    </div>
                )}
            </Fragment>
        )
    }
}

ArticleEdit.propTypes = {
    saveArticle: PropTypes.func.isRequired,
    deleteUpload: PropTypes.func.isRequired
}

export default connect(null, { saveArticle, deleteUpload })(ArticleEdit)

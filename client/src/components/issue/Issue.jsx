import { useState, useEffect, useCallback, useTransition, Fragment } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Tab from 'react-bootstrap/Tab'
import axios from 'axios'

// Custom React Components
import Error from '../layout/Error'
import Loading from '../layout/Loading'
import IssueCalendar from './IssueCalendar'
import IssueEditorial from './IssueEditorial'
import IssueProofs from './IssueProofs'

// Access service strings
const ISSUE = 'https://epsservices-magazine.azurewebsites.net/SpecificIssueDetailed2/'
const ATTACHMENTS = 'https://epsservices-file.azurewebsites.net/FilesByAttachedId/'

const Issue = () => {
    // Default states & variables
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const [isPending, startTransition] = useTransition()
    const [issue, setIssue] = useState({
        articles: [],
        details: {},
        proofs: []
    })

    const fetchIssue = useCallback(async () => {
        // Issue editorial & calendar
        await axios.get(`${ISSUE}?IssueId=${id}`).then((res) => {
            res.data.articles.forEach((article) => {
                // Article attachments
                article.files = []
                axios.get(`${ATTACHMENTS}?AttachedId=${article.id}`).then((res) => {
                    res.data.files.forEach((file) => article.files.push({ url: file.azureFileUrl, title: file.fileName }))
                })

                let authorNameStr = ''
                let authorIdStr = ''

                // Author name & id manipulation logic
                article.authors.forEach((author) => {
                    authorNameStr += author.searchName + ' & '
                    authorIdStr += author.id
                })
                if (authorNameStr[authorNameStr.length - 2] === '&') {
                    authorNameStr = authorNameStr.substring(0, authorNameStr.length - 2)
                }

                article.authorName = authorNameStr
                article.authorId = authorIdStr
            })

            setIssue((previous) => {
                return { ...previous, articles: res.data.articles, details: res.data.issue }
            })
        })

        // Issue proofs
        await axios.get(`${ATTACHMENTS}?AttachedId=${id}`).then((res) => {
            setIssue((previous) => {
                return { ...previous, proofs: res.data.files }
            })
        })

        // Conclude loading once issue data is fully fetched
        startTransition(() => setTimeout(() => setLoading(false), 1000))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        fetchIssue()
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
                        <h1 className='display-4 text-center pt-5'>{issue.details.title}</h1>
                        {issue && (
                            <Tab.Container defaultActiveKey='editorial'>
                                <Row>
                                    <Col sm={11}>
                                        <Nav variant='tabs' className='mb-3'>
                                            <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-top'>Editorial Content</Tooltip>}>
                                                <Nav.Item>
                                                    <Nav.Link eventKey='editorial'>
                                                        <img src='/assets/icons/editorial.svg' alt='' />
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                placement='top'
                                                overlay={<Tooltip id='tooltip-top'>Proofs &amp; Standard Content</Tooltip>}>
                                                <Nav.Item>
                                                    <Nav.Link eventKey='proofs'>
                                                        <img src='/assets/icons/proofs.svg' alt='' />
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </OverlayTrigger>

                                            <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-top'>Production Calendar</Tooltip>}>
                                                <Nav.Item>
                                                    <Nav.Link eventKey='calendar'>
                                                        <img src='/assets/icons/calendar.svg' alt='' />
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </OverlayTrigger>
                                        </Nav>
                                    </Col>
                                    <Col sm={1}>
                                        <div className='d-grid gap-2'>
                                            <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-top'>Add New Article</Tooltip>}>
                                                <Link to={`/article/add/${issue.details.id}`} className='btn btn-light btn-sm'>
                                                    <img src='/assets/icons/add.svg' alt='' />
                                                </Link>
                                            </OverlayTrigger>
                                        </div>
                                    </Col>
                                </Row>
                                <Tab.Content>
                                    <Tab.Pane eventKey='editorial'>{issue.articles && <IssueEditorial articles={issue.articles} />}</Tab.Pane>
                                    <Tab.Pane eventKey='proofs'>
                                        {issue.proofs && <IssueProofs proofs={issue.proofs} attachId={issue.details.id} />}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey='calendar'>{issue.details && <IssueCalendar details={issue.details} />}</Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        )}
                    </div>
                )}
            </Fragment>
        )
    }
}

export default Issue

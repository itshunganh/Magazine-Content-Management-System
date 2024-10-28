import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import PropTypes from 'prop-types'

const IssueEditorial = ({ articles }) => {
    return (
        <Card border='light' bg='light'>
            <Card.Header as='h3'>Editorial Content</Card.Header>
            <Card.Body>
                <Table responsive hover className='card-text' size='sm'>
                    <thead>
                        <tr className='text-center'>
                            <th>QID</th>
                            <th>QRC </th>
                            <th>Article</th>
                            <th>Link</th>
                            <th>Author(s)</th>
                            <th>Photo/QR</th>
                            <th>Attachments</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article, index) => (
                            <tr key={index}>
                                <td>
                                    <b>{article.quickId}</b>
                                </td>
                                <td>
                                    <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-top'>Article QR Code</Tooltip>}>
                                        <a
                                            className='btn btn-outline-light'
                                            href={`https://epsmagazineproduction.azurewebsites.net/QRCode.aspx?area=article&id=${article.id}`}
                                            target='_blank'
                                            rel='noreferrer'>
                                            <img src='/assets/icons/qr.svg' alt='' />
                                        </a>
                                    </OverlayTrigger>
                                </td>
                                <td>{article.title.toUpperCase()}</td>
                                <td>
                                    <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-top'>Article Link</Tooltip>}>
                                        <a
                                            className='btn btn-outline-light'
                                            href={`https://www.codemag.com/Article/${article.quickId}`}
                                            target='_blank'
                                            rel='noreferrer'>
                                            <img src='/assets/icons/url.svg' alt='' />
                                        </a>
                                    </OverlayTrigger>
                                </td>
                                <td className='text-center'>
                                    <i>{article.authorName}</i>
                                </td>
                                <td>
                                    <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-top'>Author Photo</Tooltip>}>
                                        <a
                                            className='btn btn-outline-light'
                                            href={`https://epsmagazineproduction.azurewebsites.net/AuthorPhoto.aspx?id=${article.authorId.substring(
                                                0,
                                                36
                                            )}`}
                                            target='_blank'
                                            rel='noreferrer'>
                                            <img src='/assets/icons/img.svg' alt='' />
                                        </a>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-top'>Author QR Code</Tooltip>}>
                                        <a
                                            className='btn btn-outline-light'
                                            href={`https://epsmagazineproduction.azurewebsites.net/QRCode.aspx?area=author&id=${article.authorId.substring(
                                                0,
                                                36
                                            )}`}
                                            target='_blank'
                                            rel='noreferrer'>
                                            <img src='/assets/icons/qr.svg' alt='' />
                                        </a>
                                    </OverlayTrigger>
                                    {article.authorId.substring(36, 72) && (
                                        <Fragment>
                                            <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-top'>Author Photo</Tooltip>}>
                                                <a
                                                    className='btn btn-outline-light'
                                                    href={`https://epsmagazineproduction.azurewebsites.net/AuthorPhoto.aspx?id=${article.authorId.substring(
                                                        36,
                                                        72
                                                    )}`}
                                                    target='_blank'
                                                    rel='noreferrer'>
                                                    <img src='/assets/icons/img.svg' alt='' />
                                                </a>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-top'>Author QR Code</Tooltip>}>
                                                <a
                                                    className='btn btn-outline-light'
                                                    href={`https://epsmagazineproduction.azurewebsites.net/QRCode.aspx?area=author&id=${article.authorId.substring(
                                                        36,
                                                        72
                                                    )}`}
                                                    target='_blank'
                                                    rel='noreferrer'>
                                                    <img src='/assets/icons/qr.svg' alt='' />
                                                </a>
                                            </OverlayTrigger>
                                        </Fragment>
                                    )}
                                    {article.authorId.substring(72, 108) && (
                                        <Fragment>
                                            <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-top'>Author Photo</Tooltip>}>
                                                <a
                                                    className='btn btn-outline-light'
                                                    href={`https://epsmagazineproduction.azurewebsites.net/AuthorPhoto.aspx?id=${article.authorId.substring(
                                                        72,
                                                        108
                                                    )}`}
                                                    target='_blank'
                                                    rel='noreferrer'>
                                                    <img src='/assets/icons/img.svg' alt='' />
                                                </a>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-top'>Author QR Code</Tooltip>}>
                                                <a
                                                    className='btn btn-outline-light'
                                                    href={`https://epsmagazineproduction.azurewebsites.net/QRCode.aspx?area=author&id=${article.authorId.substring(
                                                        72,
                                                        108
                                                    )}`}
                                                    target='_blank'
                                                    rel='noreferrer'>
                                                    <img src='/assets/icons/qr.svg' alt='' />
                                                </a>
                                            </OverlayTrigger>
                                        </Fragment>
                                    )}
                                    {article.authorId.substring(108, 144) && (
                                        <Fragment>
                                            <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-top'>Author Photo</Tooltip>}>
                                                <a
                                                    className='btn btn-outline-light'
                                                    href={`https://epsmagazineproduction.azurewebsites.net/AuthorPhoto.aspx?id=${article.authorId.substring(
                                                        108,
                                                        144
                                                    )}`}
                                                    target='_blank'
                                                    rel='noreferrer'>
                                                    <img src='/assets/icons/img.svg' alt='' />
                                                </a>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-top'>Author QR Code</Tooltip>}>
                                                <a
                                                    className='btn btn-outline-light'
                                                    href={`https://epsmagazineproduction.azurewebsites.net/QRCode.aspx?area=author&id=${article.authorId.substring(
                                                        108,
                                                        144
                                                    )}`}
                                                    target='_blank'
                                                    rel='noreferrer'>
                                                    <img src='/assets/icons/qr.svg' alt='' />
                                                </a>
                                            </OverlayTrigger>
                                        </Fragment>
                                    )}
                                </td>
                                <td>
                                    {article.files.map((file, index) => (
                                        <a key={index} href={file.url} target='_blank' rel='noreferrer'>
                                            <img src='/assets/icons/download.svg' alt='' /> {file.title} <br></br>
                                        </a>
                                    ))}
                                </td>
                                <td>
                                    <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-top'>Edit Article</Tooltip>}>
                                        <Link to={`/article/edit/${article.id}`} className='btn btn-outline-light'>
                                            <img src='/assets/icons/edit.svg' alt='' />
                                        </Link>
                                    </OverlayTrigger>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    )
}

IssueEditorial.propTypes = {
    articles: PropTypes.array,
    details: PropTypes.object
}

export default IssueEditorial

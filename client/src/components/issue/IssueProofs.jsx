import { Button, Table } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Upload from '../upload/Upload'

// Redux
import { deleteUpload } from '../../actions/upload'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const IssueProofs = ({ attachId, proofs, deleteUpload }) => {
    return (
        <Card border='light' bg='light'>
            <Card.Header as='h3'>Proofs &amp; Standard Content</Card.Header>
            <Card.Body>
                <Table responsive hover className='card-text' size='sm'>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Sub-Category</th>
                            <th>Type</th>
                            <th>Attachments</th>
                            <th>Date Attached</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {proofs
                            .sort((a, b) => b.attachDate.toLowerCase().localeCompare(a.attachDate.toLowerCase()))
                            .map((article, index) => (
                                <tr key={index}>
                                    <td>
                                        <b>{article.category.toUpperCase()}</b>
                                    </td>
                                    <td>{article.subCategory.toUpperCase()}</td>
                                    <td>
                                        <i>{article.fileType}</i>
                                    </td>
                                    <td>
                                        <img src='/assets/icons/download.svg' alt='' /> &nbsp;
                                        <a href={article.azureFileUrl} target='_blank' rel='noreferrer'>
                                            {article.fileTitle.split('.')[0]}
                                        </a>
                                    </td>
                                    <td>{article.attachDate.slice(0, 10)}</td>
                                    <td>
                                        <div className='d-flex justify-content-end'>
                                            <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-top'>Delete Attachment</Tooltip>}>
                                                <Button variant='danger' onClick={() => deleteUpload(article.id.toString(), attachId.toString())}>
                                                    <img src='/assets/icons/remove.svg' alt='' />
                                                </Button>
                                            </OverlayTrigger>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </Card.Body>
            <Card.Footer>
                <Upload attachId={attachId} />
            </Card.Footer>
        </Card>
    )
}

IssueProofs.propTypes = {
    proofs: PropTypes.array,
    attachId: PropTypes.string,
    deleteUpload: PropTypes.func.isRequired
}

export default connect(null, { deleteUpload })(IssueProofs)

import { Col, Table, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import PropTypes from 'prop-types'

const IssueCalendar = ({ details }) => {
    return (
        <Card border='light' bg='light'>
            <Card.Header as='h3'>Production Calendar</Card.Header>
            <Card.Body>
                <Row>
                    <Col>
                        <Table responsive hover className='card-text' size='sm'>
                            <thead>
                                <tr>
                                    <th>Deadlines</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Ad To Layout</td>
                                    <td>{details.adToLayoutDeadline.slice(0, 10)}</td>
                                </tr>
                                <tr>
                                    <td>Author</td>
                                    <td>{details.authorDeadline.slice(0, 10)}</td>
                                </tr>
                                <tr>
                                    <td>Cover Concept</td>
                                    <td>{details.coverConceptDeadline.slice(0, 10)}</td>
                                </tr>
                                <tr>
                                    <td>Files To Print</td>
                                    <td>{details.filesToPrintDeadline.slice(0, 10)}</td>
                                </tr>
                                <tr>
                                    <td>Final Changes</td>
                                    <td>{details.finalChangesDeadline.slice(0, 10)}</td>
                                </tr>
                                <tr>
                                    <td>First Changes</td>
                                    <td>{details.firstChangesDeadline.slice(0, 10)}</td>
                                </tr>
                                <tr>
                                    <td>First Cover Creative</td>
                                    <td>{details.firstCoverCreativeDeadline.slice(0, 10)}</td>
                                </tr>
                                <tr>
                                    <td>Info To Staff</td>
                                    <td>{details.infoToStaffDeadline.slice(0, 10)}</td>
                                </tr>
                                <tr>
                                    <td>Receive Final Proof</td>
                                    <td>{details.receiveFinalProofDeadline.slice(0, 10)}</td>
                                </tr>
                                <tr>
                                    <td>Receive First Proof</td>
                                    <td>{details.receiveFirstProofDeadline.slice(0, 10)}</td>
                                </tr>
                                <tr>
                                    <td>Receive Second Proof</td>
                                    <td>{details.receiveSecondProofDeadline.slice(0, 10)}</td>
                                </tr>
                                <tr>
                                    <td>Subscription Mailing List</td>
                                    <td>{details.subscriptionMailingListDeadline.slice(0, 10)}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col>
                        <Table responsive hover className='card-text' size='sm'>
                            <thead>
                                <tr>
                                    <th>Event</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Ad Materials Due Final</td>
                                    <td>{details.adMaterialsDueFinal.slice(0, 10)}</td>
                                </tr>
                                <tr>
                                    <td>Ad Materials Due Preferred</td>
                                    <td>{details.adMaterialsDuePreferred.slice(0, 10)}</td>
                                </tr>
                                <tr>
                                    <td>Ad Space Reservation Final</td>
                                    <td>{details.adSpaceReservationFinal.slice(0, 10)}</td>
                                </tr>
                                <tr>
                                    <td>Ad Space Reservation Preferred</td>
                                    <td>{details.adSpaceReservationPreferred.slice(0, 10)}</td>
                                </tr>
                                <tr>
                                    <td>Bind</td>
                                    <td>{details.bindDate.slice(0, 10)}</td>
                                </tr>
                                <tr>
                                    <td>Content To Layout</td>
                                    <td>{details.contentToLayout.slice(0, 10)}</td>
                                </tr>
                                <tr>
                                    <td>Distribution Pickup</td>
                                    <td>{details.distributionPickupDate.slice(0, 10)}</td>
                                </tr>
                                <tr>
                                    <td>Electronic Release</td>
                                    <td>{details.electronicReleaseDate.slice(0, 10)}</td>
                                </tr>
                                <tr>
                                    <td>Print</td>
                                    <td>{details.printDate.slice(0, 10)}</td>
                                </tr>
                                <tr className='table-dark'>
                                    <td>
                                        <b>RELEASE</b>
                                    </td>
                                    <td>
                                        <b>{details.releaseDate.slice(0, 10)}</b>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

IssueCalendar.propTypes = {
    details: PropTypes.object
}

export default IssueCalendar

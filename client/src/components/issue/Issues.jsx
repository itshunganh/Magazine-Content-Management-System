import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Select from 'react-select'

// Custom React Components
import Error from '../layout/Error'
import Loading from '../layout/Loading'

// Redux
import { getIssues } from '../../actions/issues'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Issues = ({ getIssues, issues: { issues } }) => {
    // Default states & variables
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [issueOption, setIssueOption] = useState(null)
    const issueOptions = []

    issues
        .sort((a, b) => b.releaseDate.toLowerCase().localeCompare(a.releaseDate.toLowerCase()))
        .map((issue) =>
            issueOptions.push({
                value: issue.id,
                label: issue.title
            })
        )

    const changeHandler = (selection) => {
        setIssueOption(selection.value)
    }

    useEffect(() => {
        getIssues()
        setTimeout(() => setLoading(false), 1000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [issueOption])

    if (loading) return Loading()
    if (error) {
        setError(error)
        return Error()
    } else {
        return (
            <div className='py-5 px-5'>
                <h1 className='display-4 text-center pt-5'>CODE Magazine Production</h1>
                {/* Issue Selection */}
                <div className='my-3'>
                    <Form>
                        <Form.Label>
                            <h4>
                                Your Query Is My Command <img src='/assets/icons/down.svg' alt='' />
                            </h4>
                        </Form.Label>
                        <Row>
                            <Col sm={11}>
                                <Select
                                    options={issueOptions}
                                    onChange={changeHandler}
                                    isLoading={issueOptions.length === 0 ? true : false}
                                    theme={(theme) => ({
                                        ...theme,
                                        borderRadius: 0,
                                        colors: {
                                            ...theme.colors,
                                            primary50: '#999999',
                                            primary25: '#eeeeee',
                                            primary: '#444444'
                                        }
                                    })}
                                />
                            </Col>
                            <Col sm={1}>
                                {issueOption && (
                                    <div className='d-grid gap-2'>
                                        <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-top'>Open This Issue</Tooltip>}>
                                            <Link to={`/issue/${issueOption}`} className='btn btn-warning'>
                                                <img src='/assets/icons/issue.svg' alt='' />
                                            </Link>
                                        </OverlayTrigger>
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        )
    }
}

Issues.propTypes = {
    getIssues: PropTypes.func.isRequired,
    issues: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    issues: state.issues
})

export default connect(mapStateToProps, { getIssues })(Issues)

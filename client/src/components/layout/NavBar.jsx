import { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

const NavBar = ({ auth: { isAuthenticated }, logout }) => {
    const authLinks = (
        <Nav>
            <OverlayTrigger placement='bottom' overlay={<Tooltip id='tooltip-bottom'>Issue Selection</Tooltip>}>
                <Nav.Item className='mx-2'>
                    <Link to='/issue' className='btn btn-dark'>
                        <img src='/assets/icons/home.svg' alt='' />
                    </Link>
                </Nav.Item>
            </OverlayTrigger>
            <OverlayTrigger placement='bottom' overlay={<Tooltip id='tooltip-bottom'>Author Search</Tooltip>}>
                <Nav.Item className='mx-2'>
                    <Link to='/article/author' className='btn btn-dark'>
                        <img src='/assets/icons/find.svg' alt='' />
                    </Link>
                </Nav.Item>
            </OverlayTrigger>
            <OverlayTrigger placement='bottom' overlay={<Tooltip id='tooltip-bottom'>Log Out</Tooltip>}>
                <Nav.Item className='mx-2' onClick={logout}>
                    <Link to='/' className='btn btn-dark'>
                        <img src='/assets/icons/logout.svg' alt='' />
                    </Link>
                </Nav.Item>
            </OverlayTrigger>
        </Nav>
    )

    return (
        <Fragment>
            <Navbar expand='lg' bg='dark' variant='dark'>
                <Navbar.Brand className='px-3'>
                    <img src='/assets/img/logo.png' alt='' width='50%' />
                </Navbar.Brand>
                <Navbar.Toggle className='mx-3' />
                <Navbar.Collapse className='justify-content-end px-3'>
                    <Navbar.Text>{isAuthenticated && authLinks}</Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        </Fragment>
    )
}

NavBar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(NavBar)

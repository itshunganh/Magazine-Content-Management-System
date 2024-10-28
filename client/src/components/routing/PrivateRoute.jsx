import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import Loading from '../layout/Loading'

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading } }) => {
    if (loading) return <Loading />
    if (isAuthenticated) return <Component />
    if (!isAuthenticated) return <Navigate to='/' />
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)

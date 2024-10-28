import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Alert = ({ alerts }) =>
    alerts.map((alert) => (
        <div key={alert.id} className={`alert alert-${alert.alertType} border border-${alert.alertType}`} role='alert'>
            <div className='d-flex align-items-center justify-content-center'>
                <img src='/assets/icons/alert.svg' alt='' />
                <h2>&nbsp;{alert.msg}</h2>
            </div>
        </div>
    ))

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert)

import { useState } from 'react'
import { Button } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

// Redux
import { getAuthor } from '../../actions/author'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// React-Select Animation
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
const animatedComponents = makeAnimated()

const ArticleAuthor = ({ getAuthor, author: { author }, option, onChange }) => {
    // Default states & variables
    const [formData, setFormData] = useState({
        fname: '',
        lname: ''
    })
    const { fname, lname } = formData

    // Set author input form
    const changeHandler = (event) => setFormData({ ...formData, [event.target.name]: event.target.value })

    // Submit author form
    const submitHandler = (event) => {
        event.preventDefault()
        getAuthor(fname, lname)
        setFormData({
            fname: '',
            lname: ''
        })
    }

    const authorOptions = []
    author.map((author) =>
        authorOptions.push({
            value: author.id,
            label: author.searchName,
            company: author.company,
            status: author.isAuthor
        })
    )

    // Set placeholder image
    const errorHandler = (event) => {
        event.target.src = '/assets/img/blank.png'
        event.onerror = null
    }

    // Customize the option label
    const formatOptionLabel = ({ value, label, company, status }) => (
        <div>
            <img
                src={`https://epsmagazineproduction.azurewebsites.net/AuthorPhoto.aspx?id=${value}`}
                alt='Profile Pic'
                height='50px'
                width='50px'
                className='rounded-circle border border-light'
                onError={errorHandler}
            />
            &nbsp;
            <b>{label}</b>
            &nbsp;
            <i>{company && ` -  ${company} - `}</i>
            <i>{!company && ''}</i>
            <u>{status === true && `Is Author`}</u>
            <u>{status === false && `Is Not Author`}</u>
            <u>{!status && ''}</u>
        </div>
    )

    return (
        <Card border='light' bg='white' className='mb-3'>
            <Card.Header>
                <b>Author Info</b>
                <i> - Search Then Click The Dropdown</i>
            </Card.Header>
            <Card.Body>
                <InputGroup>
                    <InputGroup.Text>
                        <img src='/assets/icons/name.svg' alt='' />
                    </InputGroup.Text>
                    <Form.Control type='text' name='fname' placeholder={`Enter the author's first name`} value={fname} onChange={changeHandler} />
                    <Form.Control type='text' name='lname' placeholder={`Enter the author's last name`} value={lname} onChange={changeHandler} />
                    <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-top'>Author Search</Tooltip>}>
                        <Button variant='warning' type='submit' onClick={submitHandler}>
                            <img src='/assets/icons/search.svg' alt='' />
                        </Button>
                    </OverlayTrigger>
                </InputGroup>
            </Card.Body>
            <Card.Footer>
                <Select
                    defaultValue={option}
                    options={authorOptions}
                    onChange={onChange}
                    components={animatedComponents}
                    formatOptionLabel={formatOptionLabel}
                    escapeClearsValue={true}
                    isLoading={author.length > 0 ? true : false}
                    isSearchable={false}
                    isClearable
                    isMulti
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
            </Card.Footer>
        </Card>
    )
}

ArticleAuthor.propTypes = {
    getAuthor: PropTypes.func.isRequired,
    author: PropTypes.object.isRequired,
    option: PropTypes.array,
    onChange: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    author: state.author
})

export default connect(mapStateToProps, { getAuthor })(ArticleAuthor)

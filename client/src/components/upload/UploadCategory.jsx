import { useEffect, useCallback } from 'react'
import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types'
import axios from 'axios'

// React-Select Animation
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
const animatedComponents = makeAnimated()

// Access environment variables
const USED_CATEGORIES = 'https://epsservices-file.azurewebsites.net/UsedCategories/'

const UploadCategory = ({ categoryOption, categoryOptionHandler, reload }) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const categoryOptions = []
    const fetchCategories = useCallback(async () => {
        await axios.get(`${USED_CATEGORIES}`).then((res) =>
            res.data.categories.map((category) =>
                categoryOptions.push({
                    value: category.name,
                    label: category.name === '' ? 'N/A' : category.name.toUpperCase()
                })
            )
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryOptions])

    useEffect(() => {
        fetchCategories()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload])

    return (
        <Form.Group className='mb-3'>
            <Form.Label>
                <b>Category</b>
            </Form.Label>

            <Select
                defaultValue={categoryOption}
                options={categoryOptions}
                components={animatedComponents}
                onChange={categoryOptionHandler}
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
        </Form.Group>
    )
}

UploadCategory.propTypes = {
    categoryOption: PropTypes.string,
    categoryOptionHandler: PropTypes.func.isRequired,
    reload: PropTypes.object
}

export default UploadCategory

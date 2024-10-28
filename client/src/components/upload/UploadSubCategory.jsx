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

const UploadSubCategory = ({ subCategoryOption, subCategoryOptionHandler, match, reload }) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const subCategoryOptions = []
    const fetchCategories = useCallback(async () => {
        await axios.get(`${USED_CATEGORIES}`).then((res) =>
            res.data.categories.map(
                (category) =>
                    category.name === match &&
                    category.subCategories.map((sub) =>
                        subCategoryOptions.push({
                            value: sub.name,
                            label: sub.name === '' ? 'N/A' : sub.name.toUpperCase()
                        })
                    )
            )
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subCategoryOptions])

    useEffect(() => {
        fetchCategories()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload])

    return (
        <Form.Group className='mb-3'>
            <Form.Label>
                <b>Sub-Category</b>
            </Form.Label>

            <Select
                defaultValue={subCategoryOption}
                options={subCategoryOptions}
                components={animatedComponents}
                onChange={subCategoryOptionHandler}
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

UploadSubCategory.propTypes = {
    subCategoryOption: PropTypes.string,
    subCategoryOptionHandler: PropTypes.func.isRequired,
    match: PropTypes.string,
    reload: PropTypes.object
}

export default UploadSubCategory

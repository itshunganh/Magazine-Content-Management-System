import { useEffect, useCallback } from 'react'
import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types'
import axios from 'axios'

// React-Select Animation
import CreatableSelect from 'react-select/creatable'
import makeAnimated from 'react-select/animated'
const animatedComponents = makeAnimated()

// Access service strings
const ALL_CATEGORIES = 'https://epsservices-magazine.azurewebsites.net/AllCategories/'

const ArticleCategory = ({ option, onChange, reload }) => {
    const categoryOptions = []
    const fetchCategories = useCallback(async () => {
        await axios.get(`${ALL_CATEGORIES}`).then((res) =>
            res.data.categories.map((category) =>
                categoryOptions.push({
                    value: category.id,
                    label: category.name,
                    group: category.groups[0] === null ? '' : category.groups[0],
                    archived: category.archived
                })
            )
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload])

    useEffect(() => {
        fetchCategories()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [option])

    return (
        <Form.Group className='mb-3'>
            <Form.Label>
                <b>Categories/Technologies</b>
            </Form.Label>
            <CreatableSelect
                defaultValue={option}
                options={categoryOptions}
                components={animatedComponents}
                onChange={onChange}
                isLoading={categoryOptions.length === 0 ? true : false}
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
        </Form.Group>
    )
}

ArticleCategory.propTypes = {
    option: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    reload: PropTypes.array
}

export default ArticleCategory

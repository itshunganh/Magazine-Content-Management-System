import { Fragment, useState, useCallback } from 'react'
import { Base64 } from 'js-base64'
import { Button, Row, Col } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

// Custom React Components
import Error from '../layout/Error'
import UploadCategory from './UploadCategory'
import UploadSubCategory from './UploadSubCategory'
import UploadDropzone from './UploadDropzone'

// Redux
import { saveUpload } from '../../actions/upload'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Upload = ({ attachId, saveUpload }) => {
    // Default states & variables
    const [error, setError] = useState(null)
    const [show, setShow] = useState(false)
    const [categoryOption, setCategoryOption] = useState(null)
    const [subCategoryOption, setSubCategoryOption] = useState(null)
    const [formData, setFormData] = useState({
        FileName: '',
        FileDescription: '',
        FileLength: 0,
        FileTitle: '',
        FileType: '',
        FileDate: '',
        AttachId: attachId,
        Category: '',
        SubCategory: '',
        ByteArr: ''
    })
    const { FileName, FileDescription, FileLength, FileTitle, FileType, FileDate, AttachId, Category, SubCategory, ByteArr } = formData

    const closeHandler = () => setShow(false)
    const showHandler = () => setShow(true)
    const formDataHandler = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const uploadHandler = (event) => {
        event.preventDefault()
        saveUpload(FileName, FileDescription, parseInt(FileLength), FileTitle, FileType, FileDate, AttachId, Category, SubCategory, ByteArr)
        closeHandler()
    }

    const categoryOptionHandler = (selection) => {
        setCategoryOption(selection.value)
        setFormData({
            ...formData,
            Category: selection.value
        })
    }

    const subCategoryOptionHandler = (selection) => {
        setSubCategoryOption(selection.value)
        setFormData({
            ...formData,
            SubCategory: selection.value
        })
    }

    const dropHandler = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()

            reader.onload = () => {
                const type = file.path.substring(file.path.indexOf('.') + 1)
                const data = Base64.btoa(reader.result)

                setFormData({
                    ...formData,
                    FileName: file.name,
                    FileLength: file.size,
                    FileTitle: file.path,
                    FileType: type,
                    FileDate: file.lastModifiedDate,
                    ByteArr: data
                })
            }

            reader.readAsBinaryString(file)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (error) {
        setError(error)
        return Error()
    } else {
        return (
            <Fragment>
                <Row>
                    <Col>
                        <Form.Label>
                            <b>File Upload</b>
                        </Form.Label>
                    </Col>
                    <Col>
                        <div className='d-flex justify-content-end'>
                            <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-top'>Upload Attachment</Tooltip>}>
                                <Button variant='warning' onClick={showHandler}>
                                    <img src='/assets/icons/upload.svg' alt='' />
                                </Button>
                            </OverlayTrigger>
                        </div>
                    </Col>
                </Row>
                <Modal show={show} onHide={closeHandler} size='lg' centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h1 className='display-4'>CODE Upload</h1>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            {/* File Category */}
                            <UploadCategory categoryOptionHandler={categoryOptionHandler} categoryOption={categoryOption} reload={formData} />

                            {/* File Sub-Category */}
                            <UploadSubCategory
                                subCategoryOptionHandler={subCategoryOptionHandler}
                                subCategoryOption={subCategoryOption}
                                match={Category}
                                reload={formData}
                            />

                            {/* File Description */}
                            <Form.Group className='mb-3'>
                                <Form.Label>
                                    <b>Description</b>
                                </Form.Label>
                                <Form.Control name='FileDescription' onChange={formDataHandler} />
                            </Form.Group>

                            {/* File Upload */}
                            <Form.Group className='mb-3'>
                                <Form.Label>
                                    <img src='/assets/icons/down.svg' alt='' />
                                    <b>Upload Your Documents Below</b>
                                    <i> - One File Per Upload</i>
                                </Form.Label>
                            </Form.Group>

                            {/* File Dropzone */}
                            <UploadDropzone onDrop={dropHandler} />

                            {/* Form Buttons */}
                            <div className='d-grid gap-2 col-12 mt-5 mx-auto'>
                                <Button variant='warning' type='submit' size='lg' onClick={uploadHandler}>
                                    <img src='/assets/icons/upload.svg' alt='' />
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Fragment>
        )
    }
}

Upload.propTypes = {
    saveUpload: PropTypes.func.isRequired,
    attachId: PropTypes.string
}

export default connect(null, { saveUpload })(Upload)

import { Fragment } from 'react'
import { useDropzone } from 'react-dropzone'
import { Table } from 'react-bootstrap'
import PropTypes from 'prop-types'

const UploadDropzone = ({ onDrop }) => {
    const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1 })

    const acceptedFileItems = acceptedFiles.map((file) => (
        <tr key={file.path}>
            <th>{file.path}</th>
            <th>{file.size} B</th>
        </tr>
    ))

    const fileRejectionItems = fileRejections.map(({ file, errors }) => {
        return (
            <tr key={file.path}>
                <th>{file.path}</th>
                <th>{file.size} B</th>
                <th>{errors[0].message}</th>
            </tr>
        )
    })

    return (
        <Fragment>
            <div {...getRootProps({ className: 'dropzone py-5 my-5 text-center' })}>
                <img src='/assets/img/upload.png' alt='' width='10%' />
                <input {...getInputProps()} />
            </div>
            <aside className='lead'>
                <Table>
                    <thead>
                        <tr>
                            <th>Accepted Files</th>
                        </tr>
                    </thead>
                    <tbody>{acceptedFileItems}</tbody>
                </Table>

                <Table>
                    <thead>
                        <tr>
                            <th>Rejected Files</th>
                        </tr>
                    </thead>
                    <tbody>{fileRejectionItems}</tbody>
                </Table>
            </aside>
        </Fragment>
    )
}

UploadDropzone.propType = {
    onDrop: PropTypes.func.isRequired
}

export default UploadDropzone

import React, { useCallback, useState, Dispatch, SetStateAction } from 'react'
import { useDropzone } from 'react-dropzone'

import { FiUpload } from "react-icons/fi";

import './styles.css';
interface MyDropZoneProps {
    onFileUploaded: Dispatch<SetStateAction<File | undefined>>
}
const MyDropZone:React.FC<MyDropZoneProps> = (props) => {

    const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);

        const file = acceptedFiles[0];
        const fileUrl = URL.createObjectURL(file);

        setSelectedImageUrl(fileUrl);

        props.onFileUploaded(file);

    }, [props]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/*"
    })

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept="image/*" multiple={false}/>

            {
                selectedImageUrl ?
                <img src={selectedImageUrl} alt=""/> :
                (
                    isDragActive ?
                    <p>
                        Drop the file here ...
                    </p> :
                    <p>
                        <FiUpload />
                        Drag 'n' drop the establishment image here
                    </p>
                )
            }

        </div>
    )
}

export default MyDropZone;
import React, { useState } from "react";
import {getAccessToken} from './authUtils';
import axios from "axios";
import { Form , Button} from "react-bootstrap";


const DocumentUpload = ()=>{
    const [documentType, setDocumentType] = useState('');
    const [documentImage, setDocumentImage] = useState('');

    const handleDocumentTypeChange = (e)=>{
        setDocumentType(e.target.value);
    }

    const handleDocumentImageChange=(e)=>{
        setDocumentImage(e.target.files[0]);
    }

    const handleUpload = async()=>{
        const acccessToken = getAccessToken();

        try{
            if (!documentType || !documentImage){
                alert('Please select document type and upload an image');
                return;
            }
            const formData =  new FormData();
            formData.append('document_type', documentType),
            formData.append('document_image', documentImage);
    
            const response = await axios.post('http://localhost:8000/api/v1/myapp/upload-document/',formData,{
                headers:{
                    Authorization:`Bearer ${acccessToken}`,
                    'Content-Type': 'multipart/form-data',
                }
                
            })
        }catch(error){
            console.log("Error in Uploading docuument.", error);
        }
    };

    return(
        <React.Fragment>
            <label htmlFor="documentType">Select Document Type:</label>

            {/* Bathroom Type */}
            <Form.Group  controlId="bathroomType">
            <Form.Label>Select Document Type</Form.Label>
            <Form.Select
              required
              id="documentType" 
              value={documentType} 
              onChange={handleDocumentTypeChange}
            >
              <option value="" disabled>
                Select document type...
              </option>
              <option value="CITIZENSHIP">Citizenship</option>
                <option value="LISCENCE">Liscence</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="documentImage" className="mb-3">
              <Form.Label>Please upload image of document: </Form.Label>
              <Form.Control type="file" onChange={handleDocumentImageChange}/>

    
            </Form.Group> 
    

            <Button variant="outline-primary" onClick={handleUpload}>Upload Document</Button>
        </React.Fragment>

    )
}
export default DocumentUpload;
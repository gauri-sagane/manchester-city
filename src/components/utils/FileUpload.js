import React, { Component } from 'react';
import { FileManager } from 'reactjs-file-uploader';
import { Button } from '@mui/material';
import '../../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { showToastSuccess } from './Tools';

const storage = getStorage();

class FileUpload extends Component {
    // state = { 
    //     name: '',
    //     isUploading: false,
    //     fileURL: '' 
    // }

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            downloadURL: '',
            isUploaded: false,
            fullpath: ''
        };
        this.uploadFiles = this.uploadFiles.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }

    uploadFiles(files) {
        return files.map(this.uploadFile);
    }

    
 
    uploadFile(file) {
        //console.log("Inside uploadfile")
        
        const uploadFileFB = (file) => {
            
            const playerImage = ref(storage, `player/${file.name}`);
            uploadBytes(playerImage, file).then((snapshot) => {
                //console.log(snapshot)
                showToastSuccess('File Uploaded!!');
                this.setState({
                    files: [],
                    isUploaded: true,
                    fullpath: `player/${file.name}`
                })
                getDownloadURL(playerImage)
                .then((url) => {
                    // Insert url into an <img> tag to "download"
                    //this.downloadURL = url
                    //console.log(url.split("token=")[1]+".png")
                    this.props.token(url.split("token=")[1]+".png")
                    this.props.filename(`player/${file.name}`)
                    this.setState({
                        downloadURL: url
                    })
                    //console.log(this.downloadURL)
                })
                .catch((error) => {
                    console.log(error)
                });
            });
           
        }
        // console.log(playerImage.fullPath)
        
        return (
            <Button variant='outlined' onClick={() => uploadFileFB(file)} key={file.key}>Upload</Button>  
        )
      
    }

    render() {
        //console.log(this.state)
        //console.log(this.state.isUploaded)
        //console.log(this.props)
        return (
            <div>
                { !this.state.isUploaded ? 
                
                <div>
                   
                <input
                    type="file"
                    accept="image/*"
                    onChange={event => this.setState({files: this.state.files.concat(Array.from(event.target.files))})}
                    multiple
                />
                    <FileManager files={this.state.files}> 
                        {this.uploadFiles}
                        
                    </FileManager>
                    
                </div> : <div className='image_upload_container'>
                            <img src = {this.state.downloadURL} style={{width: '100%'}} alt="Player"/>
                        </div> }  
            </div>
           
            
        );
    }
}

export default FileUpload;
import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
// import Axios from 'axios';
import './App.css';

const CLOUDINARY_UPLOAD_PRESET = 'en12r15v';
const CLOUDINARY_UPLOAD_URL = "https://cloudinary.com/console/media_library/folders/all/bigbucket";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFile: null,
      uploadedFileCloudinaryUrl: ''
    };
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });
    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file){
    const formData=new FormData();
        formData.append('file',file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        axios({
              url:CLOUDINARY_UPLOAD_URL,
              method:'POST',
              headers:{
                'Content-Type':'application/x-www-form-urlencoded'
              },
              data:formData
            }).then(res=>{
              console.log(res);
            }).then(err=>console.log(err.response.data))

  }

//   handleImageUpload(file) {
//     const formData=new FormData();
//     formData.append('file',file);
//     formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
//     let upload = axios.post(CLOUDINARY_UPLOAD_URL)
//
//     axios({
//       url:CLOUDINARY_UPLOAD_URL,
//       method:'POST',
//       headers:{
//         'Content-Type':'application/x-www-form-urlencoded'
//       },
//       data:formData
//     }).then(res=>{
//       console.log(res);
//     }).then(err=>console.log(err))
//                      .
// }
    // upload.end((err, response) => {
    //   if (err) {
    //     console.error(err);
    //   }
    //
    //   if (response.body.secure_url !== '') {
    //     this.setState({
    //       uploadedFileCloudinaryUrl: response.body.secure_url
    //     });
    //   }
    // });


  render() {
    return (
      <form>
        <div className="FileUpload">
          <Dropzone
            onDrop={this.onImageDrop.bind(this)}
            multiple={false}
            accept="image/*">
            <div>Drop an image or click to select a file to upload.</div>
          </Dropzone>
        </div>

        <div>
          {this.state.uploadedFileCloudinaryUrl === '' ? null :
          <div>
            <p>{this.state.uploadedFile.name}</p>
            <img src={this.state.uploadedFileCloudinaryUrl} />
          </div>}
        </div>
      </form>
    )
  }
}

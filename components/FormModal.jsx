import React from 'react'
import { useRef, useState } from 'react';
import texts from '../public/data/texts.json';

const FormModal = ({ onClose, isPictureUpladed, setIsPictureUpladed, formData, setFormData, handleSubmit }) => {

  const [isImageLoading, setIsImageLoading] = useState(false);
  const fileInputRef = useRef(null);
  const DEFUALT_PICTURE_URL = "https://uxproject-file-upload-s3-bucket.s3.eu-north-1.amazonaws.com/nobody.png"

  const handleFileChange = async (e) => {
    setIsImageLoading(true);
    const file = e.target.files[0];
    const imagrUrl = await uploadFileToS3(file);
    setFormData({
      ...formData,
      picture: imagrUrl,
    });
    setIsPictureUpladed(true);
    setIsImageLoading(false);
  };

  const uploadFileToS3 = async (file) => {
    if (file) {
      try {
        const response = await fetch('/api/uploadImage', {
          method: 'GET',
        });

        const imageUrl = await response.json();

        try {
          await fetch(imageUrl, {
            method: 'PUT', 
            headers: {
              "Content-type": "multipart/form-data"
            }, 
             body: file
          })

          const imageUrlShort = imageUrl.split('?')[0];
          return imageUrlShort;
        } catch(error) {
          console.error('Error uploading file to S3:', error);
        }
      } catch (error) {
        console.error('Error uploading file to S3:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const triggerFileUpload = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const setNobodyPicture = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      picture: DEFUALT_PICTURE_URL,
    });
    setIsPictureUpladed(false);
  }

  return (
    <>
    <form 
    onSubmit={(e) => { e.preventDefault(); handleSubmit(); onClose(); }}
    className="contactForm">
      <div className="modalAddPicture">
        <div>
          {formData.picture ? ( // Check if a picture file has been uploaded
            <img className="modalPhoto" src={formData.picture} alt="Uploaded" />
            ) : (
            <img className="modalPhoto" src={DEFUALT_PICTURE_URL} alt="Nobody" />
          )}
        </div>
        <div className="addNewButtonModal">
          {!isPictureUpladed ? (
            <>
              <button className="addChangeButton" onClick={triggerFileUpload}>
                <img className="addChangeImage" src="Add.svg" alt="Add"></img>{texts.addPicture}
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </>) : (
            <>
              <button className="addChangeButton" onClick={triggerFileUpload}>
                <img className="addChangeImage" src="Change.svg" alt="Change"></img>{texts.changePicture}
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <button className="deleteButton" onClick={setNobodyPicture}>
                <img src="Delete.svg" alt="Delete"></img>
              </button>
            </>)}
          </div>
      </div>
      <div className="formInputDivs">
            <label className="formLabel">{texts.name}</label>
        <input 
          className="formInput" 
          type="text" 
          name="name"
          required 
          value={formData.name}
          onChange={handleChange}
          placeholder={texts.jamieWright}></input>
      </div>

      <div className="formInputDivs">
            <label className="formLabel">{texts.phoneNumber}</label>
        <input 
          className="formInput" 
          type="text" 
          name="phoneNumber"
          required 
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder={texts.phoneNumberPlaceholder}></input>
      </div>

      <div className="formInputDivs">
        <label className="formLabel">{texts.emailAdress}</label>
        <input 
          className="formInput" 
          type="text" 
          name="email"
          required 
          value={formData.email}
          onChange={handleChange}
          placeholder={texts.emailAdressPlaceholder}></input>
      </div>

      <div className="buttonsForm">
        <button className="cancelButton" onClick={onClose}>{texts.cancel}</button>
        <button type="submit" className="submitButton">{texts.done}</button>
      </div>
    </form>
    {isImageLoading && (
      <div className="spinnerOverlay">
        <div className="spinnerCenter">
          <span className="loader"></span>
        </div>
    <div className="uploadingImageLoader">{texts.uploadingImage}</div>
      </div>
    )}
    </>
  )
}

export default FormModal

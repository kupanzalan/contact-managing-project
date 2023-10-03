'use client'

import React from 'react';
import ReactDOM from 'react-dom';
import FormModal from './FormModal';
import { useEffect, useState } from "react";
import texts from '../public/data/texts.json';
import {v4 as uuidv4} from 'uuid';

const Modal = ({ open, contacts, setContacts, newContact, currentContactId, onClose }) => {

  const DEFUALT_PICTURE_URL = "https://uxproject-file-upload-s3-bucket.s3.eu-north-1.amazonaws.com/nobody.png"
  if (!open) return null;
  
  const [isPictureUpladed, setIsPictureUpladed] = useState(false);
  const [formData, setFormData] = useState({
    contactId: '', 
    name: '', 
    phoneNumber: '', 
    email: '', 
    picture: DEFUALT_PICTURE_URL
  });

  useEffect(() => {
    if (open) {
      if (newContact) {
        setFormData({
          contactId: '',
          name: '',
          phoneNumber: '',
          email: '',
          picture: DEFUALT_PICTURE_URL
        });
      } else {
        const currentContact = contacts.find(contact => contact.contactId === currentContactId);
        if (currentContact.picture === DEFUALT_PICTURE_URL) {
          setIsPictureUpladed(false);
        } else {
          setIsPictureUpladed(true);
        }
        setFormData({
          contactId: currentContact.contactId,
          name: currentContact.name,
          phoneNumber: currentContact.phoneNumber,
          email: currentContact.email,
          picture: currentContact.picture
        });
      }
    }
  }, [open]);

  const addContact = async () => {
    const newUserId = uuidv4();
    if (newContact) {
      setContacts([
        ...contacts, 
        { contactId: newUserId, name: formData.name, phoneNumber: formData.phoneNumber, email: formData.email, picture: formData.picture ? formData.picture : DEFUALT_PICTURE_URL  }
      ]);
      try {
        const response = await fetch('/api/contacts', {
          method: 'POST', 
          body: JSON.stringify({ contactId: newUserId, name: formData.name, phoneNumber: formData.phoneNumber, email: formData.email, picture: formData.picture ? formData.picture : DEFUALT_PICTURE_URL })
        })
  
      } catch(error) {
        console.log(`There was an error in POST: ${error}`);
      }
    } else {
      // Modifying existing contact
      setContacts((previousContacts) => {
        return previousContacts.map((contact) => {
          if (contact.contactId === currentContactId) {
            return { contactId: formData.contactId, name: formData.name, phoneNumber: formData.phoneNumber, email: formData.email, picture: formData.picture ? formData.picture : DEFUALT_PICTURE_URL }
          }
          return contact;
        });
      });
      try {
        const response = await fetch('/api/contacts', {
          method: 'PUT', 
          body: JSON.stringify({ contactId: formData.contactId, name: formData.name, phoneNumber: formData.phoneNumber, email: formData.email, picture: formData.picture ? formData.picture : DEFUALT_PICTURE_URL })
        })

      } catch(error) {
        console.log(`There was an error in PUT: ${error}`);
      }
    }
  }

  return ReactDOM.createPortal(
    <>
      <div className="modalOverlay"/>
      <div className="modalComponent">
        <div>
          <h1>{texts.addContact}</h1>
        </div>
        
        <div>
          <FormModal 
            type="Create"
            isPictureUpladed={isPictureUpladed}
            setIsPictureUpladed={setIsPictureUpladed}
            onClose={onClose} 
            formData={formData}
            setFormData={setFormData}
            handleSubmit={addContact} />
        </div>
      </div>
    </>, 
    document.getElementById('modal-root')
  )
}

export default Modal

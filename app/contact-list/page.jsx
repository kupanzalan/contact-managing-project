'use client'

import React, { Fragment } from 'react'
import Contact from '@components/Contact'
import ContactHeader from '@components/ContactHeader'
import { useEffect, useState } from "react"
import Modal from '@components/Modal'
import Left from '@components/Left'
import Right from '@components/Right'
import { motion } from 'framer-motion';

const ContactList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const isNewContact = true;

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async (e) => {
    try {
      const response = await fetch('/api/contacts', {
        method: 'GET'
      });
      const contacts = await response.json();
      // console.log('Received contacts: ', contacts);
      setContacts(contacts);
      setIsDataLoaded(true);
    } catch(error) {
      console.log(`There was an error in GET: ${error}`);
    } 
  }

   // Function to toggle the dropdown for a contact
   const toggleDropdown = (id) => {
    if (openDropdownId === id) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(id);
    }
  };

  const closeDropdown = () => {
    setOpenDropdownId(null);
  };

  const removeContact = async (idToRemove) => {
    const updatedContacts = contacts.filter(contact => contact.contactId !== idToRemove);
    setContacts(updatedContacts);

    try {
      await fetch(`/api/${idToRemove}`, {
        method: 'DELETE'
      });
      
    } catch(error) {
      console.log(`There was an error in DELETE: ${error}`);
    }
  }

  return (
    <Fragment>
      <div className="mainLayout">
        <div className="left-section">
          <Left />
        </div>

        <div className="contact-list">
          <ContactHeader openAddContact={() => setIsOpen(true)}/>

          {isDataLoaded ? (
            <ul className="contact-list-items">
            {contacts.map((contact, index) => (
              <motion.li 
                className="contactItem" 
                initial={{ y: '100vh' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
                key={index}>
                <Contact 
                  contact={contact}
                  isDropdownOpen={openDropdownId === contact.contactId}
                  toggleDropdown={() => toggleDropdown(contact.contactId)}
                  closeDropdown={closeDropdown}
                  removeContact={removeContact}
                  contacts={contacts}
                  setContacts={setContacts}
                />
              </motion.li>
            ))}
          </ul>
          ) : (
            <div className="spinnerCenter"><span className="loaderData"></span></div>
          )}
          
        </div>

        <div className="right-section">
          <Right />
        </div>
        <Modal 
          open={isOpen} 
          contacts={contacts}
          setContacts={setContacts}
          newContact={isNewContact}
          onClose={() => setIsOpen(false)}/>
      </div>
    </Fragment>
  )
}

export default ContactList

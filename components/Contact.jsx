import { React, useState, useRef } from 'react'
import Dropdown from './Dropdown'
import Modal from './Modal'
import { motion } from 'framer-motion';

const Contact = ({ contact, isDropdownOpen, toggleDropdown, closeDropdown, removeContact, contacts, setContacts }) => {
  const dropdownRef = useRef(null);
  const isNewContact = false;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onItemClick = (item) => {
    closeDropdown();
    if (item === 'Remove') {
      removeContact(contact.contactId);
    }

    if (item === 'Edit') {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="contact">
        <div>
          <img className="lisItemPhoto" src={contact.picture} alt={contact.name}></img>
        </div>
          <div className="contactDetails">
            <div>
              <div className="contactName">{contact.name}</div>
              <div className="contactPhone">{contact.phoneNumber}</div>
            </div>
          </div>
      </div>
      <div className={`actionButtons ${isDropdownOpen ? 'dropdown-open' : ''}`}>
        <div className="contactActionIcons">
          <img src="Mute.svg" alt="Mute"></img>
        </div>
        <div className="contactActionIcons">
          <img src="Call.svg" alt="Call"></img>
        </div>
        <div className="contactActionIcons">
          <img src="More.svg" alt="More" onClick={toggleDropdown} className={isDropdownOpen ? 'moreIconDropdown' : ''}></img>
          {isDropdownOpen && (
            <motion.div 
              className="dropdownContainer" 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
              ref={dropdownRef}>
              <Dropdown onItemClick={onItemClick}/>
            </motion.div>
          )}
        </div>
      </div>
      <Modal 
        open={isModalOpen} 
        contacts={contacts}
        setContacts={setContacts}
        newContact={isNewContact}
        currentContactId={contact.contactId}
        onClose={() => setIsModalOpen(false)}/>
    </>
  )
}

export default Contact

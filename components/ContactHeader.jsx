import React from 'react';
import { motion } from 'framer-motion';
import texts from '../public/data/texts.json';

const ContactHeader = ({ openAddContact }) => {
  return (
    <div className="contactsHeader">
      <div>
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}>
          {texts.contacts}
        </motion.h1>
      </div>

      <motion.div 
        className="rightPart"
        initial={{ x: '100vw' }}
        animate={{ x: 0}}
        transition={{ delay: 0.3, type: 'spring', stiffness: 80 }}>
        <div className="settingsIcon">
          <img src="Settings.svg" alt="Settings"></img>
        </div>
        <div className="photoIcon">
          <img src="Photo.svg" alt="Photo"></img>
        </div>
        <div className="addNewButton">
          <button className="contactButton" onClick={openAddContact}>
            <img src="Add.svg" alt="Add"></img><div className="addNewButtonText">{texts.addNew}</div>
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default ContactHeader

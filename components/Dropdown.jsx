import React from 'react'
import texts from '../public/data/texts.json';

const Dropdown = ({ onItemClick }) => {

  const handleItemClick = (item) => {
    onItemClick(item);
  };

  return (
    <>
      <ul>
        <li className="dropdownListItem" onClick={() => handleItemClick('Edit')}>
          <img className="dropdownIcons" src="SettingsDropdown.svg" alt="Settings"></img>{texts.edit}
        </li>
        <li className="dropdownListItem" onClick={() => handleItemClick('Favourite')}>
          <img className="dropdownIcons" src="Favourite.svg" alt="Favourite"></img>{texts.favourite}
        </li>
        <li className="dropdownListItem" onClick={() => handleItemClick('Remove')}>
          <img className="dropdownIcons" src="DeleteDropdown.svg" alt="Delete"></img>{texts.remove}
        </li>
      </ul>
    </>
  )
}

export default Dropdown

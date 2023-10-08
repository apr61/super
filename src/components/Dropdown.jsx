import React, { useEffect, useRef, useState } from 'react'

const Dropdown = ({ children, dropDownlistStyles, dropdownName, Icon, dropDownButtonStyles}) => {
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const closeDropdown = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        function handleClickOutside(event) {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            closeDropdown();
          }
        }
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, [dropdownRef, closeDropdown]);

    return (
        <div ref={dropdownRef}>
            <button className={`relative px-4 py-2 rounded-md ${dropDownButtonStyles}`}
                onClick={() => setIsOpen(!isOpen)}>
                {dropdownName}
                <Icon />
            </button>
            <ul className={isOpen ? `absolute p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md bg-white ${dropDownlistStyles}` : 'hidden'}>
                {children}
            </ul>
        </div>
    )
}

export default Dropdown
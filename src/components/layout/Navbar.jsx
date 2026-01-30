import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Notice: "export const" is used here so MainLayout can import it nicely
export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <StyledWrapper>
      <div className="button-container">
        
        {/* Home Button */}
        <button className="button" onClick={() => navigate('/')} title="Dashboard">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
             <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/> 
             <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </button>

        {/* Calendar Button */}
        <button className="button" onClick={() => navigate('/calendar')} title="Academic Calendar">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
            <line x1="16" x2="16" y1="2" y2="6"/>
            <line x1="8" x2="8" y1="2" y2="6"/>
            <line x1="3" x2="21" y1="10" y2="10"/>
          </svg>
        </button>

        {/* Approvals Button */}
        <button className="button" onClick={() => navigate('/approvals')} title="Approvals">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
        </button>

        {/* Alerts Button */}
        <button className="button" onClick={() => navigate('/alerts')} title="System Alerts">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
             <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
             <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
          </svg>
        </button>

      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* Floating Dock Position */
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999; /* Super high so it stays on top */

  .button-container {
    display: flex;
    background-color: rgba(15, 15, 14, 0.95); /* Pink color */
    backdrop-filter: blur(8px); /* Glass effect */
    width: 260px;
    height: 54px;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 30px; /* Pill shape */
    box-shadow: 0px 8px 20px rgba(131, 72, 205, 0.4);
    padding: 0 10px;
    transition: all 0.3s ease;
  }

  .button-container:hover {
    transform: translateY(-2px);
    box-shadow: 0px 12px 25px rgba(228, 157, 236, 0.5);
  }

  .button {
    outline: 0 !important;
    border: 0 !important;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  .button:hover {
    transform: translateY(-3px) scale(1.1);
    background-color: rgba(255, 255, 255, 0.2);
  }

  .button:active {
    transform: scale(0.95);
  }

  .icon {
    font-size: 22px;
  }
`;
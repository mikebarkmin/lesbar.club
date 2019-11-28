import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ButtonSecondary } from './Button';

const NotifyContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 16px;
  background-color: ${props => props.theme.primary.main};
  color: white;
`;

function TextNotify({ onClick }) {
  return (
    <NotifyContainer>
      <span style={{ flex: 1 }}>
        Wir haben eine andere Sprache erkannt, als ausgewählt wurde. Drücke
        Wechseln um die Ergebnisse neu zu berechnen.
      </span>
      <ButtonSecondary onClick={onClick}>Wechseln</ButtonSecondary>
    </NotifyContainer>
  );
}

TextNotify.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default TextNotify;

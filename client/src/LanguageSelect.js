import React from 'react';
import PropTypes from 'prop-types';
import { DropDownContainer, DropDown, DropDownContent } from './DropDown';
import { ButtonPrimary, ButtonFlat } from './Button';

function LanguageSelect({ value, languages, onChange }) {
  return (
    <DropDownContainer>
      <ButtonPrimary>{value}</ButtonPrimary>
      <DropDown>
        <DropDownContent>
          {languages.map(l => (
            <ButtonFlat
              key={l}
              style={{ width: '100%' }}
              onClick={() => onChange(l)}
            >
              {l}
            </ButtonFlat>
          ))}
        </DropDownContent>
      </DropDown>
    </DropDownContainer>
  );
}

LanguageSelect.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  value: PropTypes.string
};

LanguageSelect.defaultProps = {
  onChange: () => {}
};

export default LanguageSelect;

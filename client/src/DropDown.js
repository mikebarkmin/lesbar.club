import styled from 'styled-components';

export const DropDownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropDown = styled.div`
  display: none;
  position: absolute;
  z-index: 1;

  ${DropDownContainer}:hover & {
    display: block;
  }
`;

export const DropDownContent = styled.div`
  margin-top: 8px;
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
  background: white;
  border-radius: 8px;
  padding: 8px;
  width: ${props => props.width || '150px'};
`;

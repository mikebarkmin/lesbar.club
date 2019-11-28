import styled from 'styled-components';

export const Button = styled.button`
  cursor: pointer;
  position: relative;
  border-radius: 8px;
  color: ${props => props.theme.text.dark};
  padding: 0 8px;
  height: 30px;
  line-height: 30px;
  font-weight: bold;
  font-size: 12px;
  border: none;
  text-transform: uppercase;
  transition: all 0.5s;
  overflow: hidden;

  &:hover:enabled {
    transform: scale(1.05);
  }

  &:active:enabled {
    transform: none;
  }
`;

export const ButtonPrimary = styled(Button)`
  background-color: ${props => props.theme.primary.main};
  color: ${props => props.theme.text.light};

  &:hover:enabled {
    color: ${props => props.theme.text.dark};
    background-color: ${props => props.theme.primary.light};
  }

  &:active:enabled {
    background-color: ${props => props.theme.primary.dark};
  }
`;

export const ButtonSecondary = styled(Button)`
  background-color: ${props => props.theme.secondary.main};
  color: ${props => props.theme.text.dark};

  &:hover:enabled {
    background-color: ${props => props.theme.secondary.light};
  }

  &:active:enabled {
    background-color: ${props => props.theme.secondary.dark};
  }
`;

export const ButtonFlat = styled(Button)`
  background: none;
  color: ${props => props.theme.primary.main};
`;

export default Button;

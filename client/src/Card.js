import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
  background: white;
  border-radius: 8px;
  overflow: hidden;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  font-size: 20px;
  background-color: ${props => props.theme.primary.main};
  color: white;
  text-transform: uppercase;
  font-weight: bold;

  & > h2 {
    flex: 1;
    font-size: 1.2rem;
    padding: 0;
    margin: 0;
  }
`;

export const CardContent = styled.div`
  flex: 1;
`;

export const CardFooter = styled.div`
  overflow-y: auto;
  background-color: ${props => props.theme.secondary.light};
`;

export default Card;

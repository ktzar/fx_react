import styled from "styled-components";

export const CTAButton = styled.button`
  background: ${(props) => (props.disabled ? "#999" : "#F54997")};
  border: 0;
  color: white;
  padding: 8px 40px;
  border-radius: 20px;
  font-size: 20px;
  box-shadow: 0 10px 15px rgba(245, 73, 151, 0.3);
  transition: background, box-shadow 0.5s;
  cursor: ${(props) => (props.disabled ? "" : "pointer")};

  &:hover,
  &:active,
  &:focus {
    background: ${(props) => (props.disabled ? "#999" : "#e53987")};
    box-shadow: 0 0 25px rgba(245, 73, 151, 0.3);
    border: none;
    outline: none;
  }
`;

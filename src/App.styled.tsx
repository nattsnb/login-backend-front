import { styled } from "@mui/material";

export const StyledDiv = styled("div")`
  display: flex;
  flex-direction: row;
`;

export const BoxDiv = styled("div")`
  display: flex;
  flex-direction: column;
  min-width: 300px;
`;

export const CustomSnackbar = styled("div")`
  position: fixed;
  z-index: 5500;
  display: flex;
  right: 16px;
  bottom: 16px;
  left: auto;
  justify-content: start;
  max-width: 560px;
  min-width: 300px;
  background-color: lawngreen;
`;

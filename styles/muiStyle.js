import { TextField } from "@mui/material";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";

// Style to make the textfields not be black on black
export const StyledTextField = styled(TextField)({
  [`& .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: "lightBlue",
  },
  [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]:
    {
      borderColor: "lightBlue",
    },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
    {
      borderColor: "lightBlue",
    },
  [`& .${outlinedInputClasses.input}`]: {
    color: "white",
  },
  [`&:hover .${outlinedInputClasses.input}`]: {
    color: "white",
  },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.input}`]:
    {
      color: "lightBlue",
    },
  [`& .${inputLabelClasses.outlined}`]: {
    color: "white",
  },
  [`&:hover .${inputLabelClasses.outlined}`]: {
    color: "white",
  },
  [`& .${inputLabelClasses.outlined}.${inputLabelClasses.focused}`]: {
    color: "lightBlue",
  },
});

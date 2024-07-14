import React, { ReactNode } from "react";
import { TextField as MuiTextField, TextFieldProps, Box, Typography, BaseTextFieldProps } from "@mui/material";

interface CustomTextFieldProps extends BaseTextFieldProps {
  tooltip?: ReactNode;
}

const TextField: React.FC<CustomTextFieldProps> = ({ label, tooltip, ...props }) => {
  return (
    <Box>
      <Box display="flex" alignItems="baseline">
        <Typography marginLeft={1} variant="subtitle2" gutterBottom>
          {label}
        </Typography>
        {tooltip}
      </Box>
      <MuiTextField {...props} />
    </Box>
  );
};

export default TextField;

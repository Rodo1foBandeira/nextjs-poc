import { Box, BoxProps, Typography, TypographyOwnProps } from "@mui/material";
import { ReactNode } from 'react';

interface IBox4Label extends BoxProps {
    label: string;
    typographyProps?: TypographyOwnProps;
}

export default function Box4Label({ label, typographyProps, children, ...props }: IBox4Label) {
  return (
    <Box {...props}>
      <Typography paddingLeft={1} variant="subtitle2" gutterBottom {...typographyProps}>
        {label}
      </Typography>
      {children}
    </Box>
  );
}

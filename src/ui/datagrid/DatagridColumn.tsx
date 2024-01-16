import { Grid } from "@mui/material";
import { ReactNode } from 'react';

export default function DatagridColumn({ label, children }: {label: string, children: ReactNode}) {
  
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>{label}</Grid>
      <Grid item>
        {children}
      </Grid>
    </Grid>
  );
}

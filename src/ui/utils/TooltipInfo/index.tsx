import { IconButton, Tooltip } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

interface CustomTooltipProps {
    title: string;
}

export default function TooltipInfo({ title } : CustomTooltipProps){
    return (
        <Tooltip {...{title}}>
            <IconButton size="small" style={{ marginLeft: 4 }}>
              <InfoIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
    )
}
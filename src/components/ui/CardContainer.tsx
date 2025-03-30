import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Box,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

interface CardContainerProps {
  title: string;
  subtitle?: string;
  tooltip?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const CardContainer: React.FC<CardContainerProps> = ({
  title,
  subtitle,
  tooltip,
  children,
  actions,
}) => {
  return (
    <Card sx={{ mb: 3, overflow: "visible" }}>
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" component="div">
              {title}
            </Typography>
            {tooltip && (
              <Tooltip title={tooltip} arrow placement="top">
                <IconButton size="small" sx={{ ml: 1 }}>
                  <HelpOutlineIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        }
        subheader={subtitle}
        action={actions}
      />
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardContainer;

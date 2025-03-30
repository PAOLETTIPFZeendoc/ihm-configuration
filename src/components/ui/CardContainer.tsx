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
    <Card
      sx={{
        mb: 3,
        overflow: "visible",
        boxShadow: "0px 1px 3px rgba(0,0,0,0.1), 0px 1px 2px rgba(0,0,0,0.06)",
        borderRadius: "12px",
      }}
    >
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontSize: "1.125rem",
                fontWeight: 600,
                color: "text.primary",
              }}
            >
              {title}
            </Typography>
            {tooltip && (
              <Tooltip title={tooltip} arrow placement="top">
                <IconButton size="small" sx={{ ml: 1, color: "primary.main" }}>
                  <HelpOutlineIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        }
        subheader={
          subtitle && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {subtitle}
            </Typography>
          )
        }
        action={actions}
        sx={{
          padding: "16px 20px 8px",
          borderBottom: subtitle ? "1px solid" : "none",
          borderColor: "rgba(0, 0, 0, 0.08)",
        }}
      />
      <CardContent
        sx={{
          padding: "12px 20px 20px",
          "&:last-child": {
            paddingBottom: 20,
          },
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
};

export default CardContainer;

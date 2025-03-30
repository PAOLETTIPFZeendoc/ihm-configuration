import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Box,
  Typography,
} from "@mui/material";

interface ListItemWithBadgeProps {
  primary: string;
  secondaryItems?: { label: string; value: string; color?: string }[];
  actions?: React.ReactNode;
}

const ListItemWithBadge: React.FC<ListItemWithBadgeProps> = ({
  primary,
  secondaryItems = [],
  actions,
}) => {
  return (
    <ListItem
      sx={{
        mb: 1,
        borderRadius: 2,
        bgcolor: "background.paper",
        boxShadow: "0px 1px 3px rgba(0,0,0,0.1), 0px 1px 2px rgba(0,0,0,0.06)",
        p: 2,
        "&:hover": {
          backgroundColor: "rgba(0, 163, 224, 0.04)",
        },
      }}
    >
      <ListItemText
        primary={
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              fontWeight: 500,
              color: "text.primary",
              mb: 0.5,
            }}
          >
            {primary}
          </Typography>
        }
        secondary={
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 0.5 }}>
            {secondaryItems.map((item, index) => {
              // Déterminer les couleurs basées sur le style Zeendoc
              let chipProps = {};

              if (item.color) {
                const colorMap: Record<string, any> = {
                  primary: {
                    bgcolor: "rgba(0, 163, 224, 0.1)",
                    color: "primary.main",
                    borderColor: "primary.light",
                  },
                  secondary: {
                    bgcolor: "rgba(245, 130, 32, 0.1)",
                    color: "secondary.main",
                    borderColor: "secondary.light",
                  },
                  success: {
                    bgcolor: "rgba(16, 185, 129, 0.1)",
                    color: "success.main",
                    borderColor: "success.light",
                  },
                  error: {
                    bgcolor: "rgba(239, 68, 68, 0.1)",
                    color: "error.main",
                    borderColor: "error.light",
                  },
                  warning: {
                    bgcolor: "rgba(245, 158, 11, 0.1)",
                    color: "warning.main",
                    borderColor: "warning.light",
                  },
                  info: {
                    bgcolor: "rgba(0, 163, 224, 0.1)",
                    color: "info.main",
                    borderColor: "info.light",
                  },
                  default: {
                    bgcolor: "rgba(75, 85, 99, 0.1)",
                    color: "text.secondary",
                    borderColor: "divider",
                  },
                };

                chipProps = colorMap[item.color] || colorMap.default;
              }

              return (
                <Chip
                  key={index}
                  size="small"
                  label={
                    <Typography variant="caption" sx={{ whiteSpace: "nowrap" }}>
                      <Box component="span" sx={{ fontWeight: 600 }}>
                        {item.label}:
                      </Box>{" "}
                      {item.value}
                    </Typography>
                  }
                  variant="outlined"
                  sx={{
                    borderRadius: "16px",
                    height: "auto",
                    py: 0.25,
                    ...chipProps,
                  }}
                />
              );
            })}
          </Box>
        }
        disableTypography
      />
      {actions && (
        <ListItemSecondaryAction sx={{ right: 16 }}>
          {actions}
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

export default ListItemWithBadge;

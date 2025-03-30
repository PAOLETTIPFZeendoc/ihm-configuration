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
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <ListItemText
        primary={primary}
        secondary={
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 0.5 }}>
            {secondaryItems.map((item, index) => (
              <Chip
                key={index}
                size="small"
                label={
                  <Typography variant="caption">
                    <b>{item.label}:</b> {item.value}
                  </Typography>
                }
                color={(item.color as any) || "default"}
                variant="outlined"
              />
            ))}
          </Box>
        }
      />
      {actions && <ListItemSecondaryAction>{actions}</ListItemSecondaryAction>}
    </ListItem>
  );
};

export default ListItemWithBadge;

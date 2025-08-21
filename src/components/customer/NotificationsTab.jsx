import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { getNotifications, markNotificationSeen } from '../../api/client';

const USER_ID = 1;

export default function NotificationsTab() {
  const [notes, setNotes] = useState([]);

  const load = async () => {
    try {
      const list = await getNotifications(USER_ID);
      setNotes(list);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { load(); }, []);

  const markSeen = async (id) => {
    await markNotificationSeen(id);
    load();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">Notifications</Typography>
      <List>
        {notes.map(n => (
          <ListItem key={n.id} secondaryAction={!n.seen && (
            <IconButton edge="end" onClick={() => markSeen(n.id)}><DoneIcon /></IconButton>
          )}>
            <ListItemText primary={n.message} secondary={n.seen ? 'Seen' : 'New'} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

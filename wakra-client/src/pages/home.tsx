import {
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
} from '@mui/material';
import { MenuRounded } from '@mui/icons-material/';
import { useState } from 'react';

const drawerWidth = 240;
export const Home = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((currentState) => !currentState);
  };

  const container = document.body;

  return (
    <Container maxWidth="xl" disableGutters>
      <Box sx={{ flexGrow: 1, minHeight: '90vh' }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit">
              <MenuRounded fontSize="medium" />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Typography variant="h3" align="left" padding={1}>
          Home page mate
        </Typography>
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
          <Drawer
            container={container}
            variant="temporary"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            <List>
              <ListItem>List Item 1</ListItem>
              <ListItem>List Item 2</ListItem>
              <ListItem>List Item 3</ListItem>
            </List>
          </Drawer>
          <Drawer
            variant="persistent"
            anchor="left"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            <List>
              <ListItem>List Item 1</ListItem>
              <ListItem>List Item 2</ListItem>
              <ListItem>List Item 3</ListItem>
            </List>
          </Drawer>
        </Box>
      </Box>
    </Container>
  );
};

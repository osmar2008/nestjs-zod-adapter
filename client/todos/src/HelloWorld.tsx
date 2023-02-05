import { Link } from 'react-router-dom'
import { Container, List, ListItem, ListItemText } from '@mui/material'

export const HelloWorld = () => (
  <Container maxWidth="sm">
    <List>
      <ListItem component={Link} to="/">
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem component={Link} to="/todos">
        <ListItemText primary="Todo List" />
      </ListItem>
    </List>
  </Container>
)

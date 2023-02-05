import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'

type Todo = {
  id: number
  title: string
}

type FormData = {
  title: string
}

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const { handleSubmit, reset, control } = useForm<FormData>()

  const handleAddTodo = ({ title }: FormData) => {
    const newTodo = {
      id: Date.now(),
      title,
    }
    setTodos((prevTodos) => [...prevTodos, newTodo])
    reset()
  }

  const handleDeleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Todo List
      </Typography>
      <form onSubmit={handleSubmit(handleAddTodo)}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Controller
              name={'title'}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField fullWidth label="Add a todo" onChange={onChange} value={value} />
              )}
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary" startIcon={<AddIcon />}>
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box mt={2}>
        {todos.map((todo) => (
          <Grid key={todo.id} container spacing={2} alignItems="center">
            <Grid item xs>
              <Typography>{todo.title}</Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" onClick={() => handleDeleteTodo(todo.id)}>
                Delete
              </Button>
            </Grid>
          </Grid>
        ))}
      </Box>
    </Box>
  )
}

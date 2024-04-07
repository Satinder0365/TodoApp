import { useState } from "react";
import "./App.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  List,
  Checkbox,
  ListItem,
  TextField,
  ListItemText,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
function App() {
  const [input, setInput] = useState("");
  const [todos, settodos] = useState([]);
  const [editText, setEditText] = useState('');
  const [editingTodoId, setEditingTodoId]= useState(null);

  function addtodo(){
    settodos((prevtodos)=>[...prevtodos, input])
    settodos([...todos, input])
    setInput("")
  }

  function deletetodo(textindex) {
    const filtertodo = todos.filter((element) => element !== todos[textindex]);
    settodos(filtertodo);
  }

  function RemoveAlltodo() {
    settodos([]);
  }
  function updateTodo() {
    if (editText !== "") {
      const updatedTodos = todos.map((todo, id) =>
        id === editingTodoId ? editText : todo
      );
      settodos(updatedTodos);
      //setEditText("");
      setEditingTodoId(null);  //No todo  item is currenty editing
    }
  }

  function handleEdit(todo, index) {
    setEditText(todo); //For Previous data
    setEditingTodoId(index);
  }
  return (
    <div style={{ backgroundColor: blueGrey[100] }}>
      <TextField
        label="Add Todo"
        variant="outlined"
        color="secondary"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ marginBottom: "10px" }}
      />

      <Button
        style={{ backgroundColor: "Highlight" }}
        variant="contained"
        size="large"
        color="primary"
        onClick={addtodo}
      >
        Add
      </Button>
      <List>
        {todos.map((todo, index) => (
          <ListItem key={index}>
            {editingTodoId === index ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)} //For enter The new Value In the text Box
                />
                <Button onClick={updateTodo}>Update</Button>
              </>
            ) : (
              <>
                <ListItemText
                  primary={todo}
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                />
                <Button onClick={() => handleEdit(todo, index)}>
                  <EditIcon />
                </Button>
                <Button onClick={() => deletetodo(index)}>
                  <DeleteIcon />
                </Button>
              </>
            )}
          </ListItem>
        ))}
      </List>
      <Button
        style={{ backgroundColor: "ButtonFace" }}
        variant="contained"
        color="secondary"
        onClick={RemoveAlltodo}
      >
        Remove All
      </Button>
    </div>
  );
}

export default App;

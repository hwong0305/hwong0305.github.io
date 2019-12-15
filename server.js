const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('_site'));

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '_site', 'index.html'));
});

app.get('/minesweeper', (_, res) => {
  res.sendFile(path.join(__dirname, '_site', 'minesweeper.html'));
});

app.get('/select', (_, res) => {
  res.sendFile(path.join(__dirname, '_site', 'select.html'));
});

app.get('/kanban', (_, res) => {
  res.sendFile(path.join(__dirname, '_site', 'kanban.html'));
});

app.listen(process.env.PORT || 15742, () => {
  console.log(`Now listening on Port ${process.env.PORT || 15742}`);
});

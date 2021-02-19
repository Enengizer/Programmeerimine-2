const express = require('express');
const app = express();

const port = 3000;

const rooms = [
  {
    id: 1,
    name: '215'
  },
  {
    id: 2,
    name: '115'
  },
  {
    id: 3,
    name: '220'
  },
  {
    id: 4,
    name: '230'
  },
];

app.use(express.json());

app.get('/hello', (req, res) => {
  res.status(200).json({message: 'Hello world!'});
});

app.get('/rooms', (req, res) => {
  res.status(200).json({
    rooms: rooms
  });
});

app.get('/rooms/:id', (req, res) => {
  const key = req.query.key;
  const id = req.params.id;
  const room = rooms[id - 1];
  res.status(200).json({
    room: room
  });
});

app.post('/rooms', (req, res) => {
  const name = req.body.name;
  if (name) {
    const room = {
      id: rooms.length + 1,
      name: name
    };
    rooms.push(room);
    res.status(201).json({
      id: room.id
    });
  } else {
    res.status(400).json({
      error: 'Description is missing'
    });
  }
});

app.delete('/rooms/:id', (req, res) => {
  const id = req.params.id;
  rooms.splice(id - 1, 1);
  res.status(200).end();
});

app.patch('/rooms/:id', (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  rooms[id - 1].name = name;
  res.status(200).json({
    success: true
  });
});

app.listen(port, () => {
  console.log('Server is running on port:', port);
});
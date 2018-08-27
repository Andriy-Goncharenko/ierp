const {Specification} = require('./db');
const app = require('express')();
const express = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');


app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

io.on('connection', function (socket) {
  socket.on('get', data => {
    Specification.findById({_id: data.id}).then(data => {
      io.emit('state', data);
    });
  });
  socket.on('state', data => {
    let {_id, tables, files, flag} = data;
    if (flag) {
      let s = new Specification({_id, tables, files});
      s.save((error, data) => {
        io.emit('state', data);
      });
    } else {
      Specification.updateOne({_id}, {tables, files, date: Date.now()}).then(data => {
        if (data.ok) {
          Specification.findById({_id}).then(data => {
            io.emit('state', data);
          });
        }
      });
    }

  });
  socket.on('procurement', _id => {
    Specification.updateOne({_id}, {saveFlag: true, date: Date.now()}).then(d => {
      if (d.ok)
        Specification.find({saveFlag: true}).then(data => {
          console.log('1', data.length);
          socket.emit('getProcurement', data);
        });
    });
  });
  socket.on('getProcurement', () => {
    Specification.find({saveFlag: true}).then(data => {
      socket.emit('getProcurement', data);
    })
  })
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});
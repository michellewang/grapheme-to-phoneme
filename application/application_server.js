// const express = require('express');
const express = require('express');
const app = express();
const server = app.listen(3000, function() {
  console.log('listening on port 3000');
});
const io = require('socket.io').listen(server);
const axios = require('axios');

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {
  console.log('a user connected');

  // socket.on('disconnect', function() {
  //   console.log('user disconnected');
  // });

  socket.on('wordsUpdated', function(words) {

    // console.log(words);

    var data = [];

    var options = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    words.forEach(function(word, index) {
      data.push(
        {
          'src': word,
          'id': 0
        }
      )
    })

    // console.log(data);

    // translate
    axios.post("http://127.0.0.1:5000/translator/translate", data, options)
      .then(function(response) {
        // console.log(response.data);

        var predictions = [];

        response.data[0].forEach(function(prediction, index) {
          predictions.push(prediction['tgt']);
        })

        console.log(predictions);
        socket.emit('translationUpdated', predictions);
        
      })
      .catch(function(error) {
        console.log(error);
      })

    // translate
    // axios.post("http://127.0.0.1:5000/translator/translate",
    //   [{
    //     "src": text,
    //     "id": 0
    //   }], {
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   })
    //   .then(function(response) {
    //     // console.log(response.data[0][0]['tgt']);
    //     socket.emit('translationUpdated', response.data[0][0]['tgt']);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   })

    // console.log(text);
  });

});

axios.get("http://127.0.0.1:5000/translator/models")
  .then(function(response) {
    console.log('Available models:')
    console.log(response.data);
  })
  .catch(function(error) {
    console.log(error);
  });

// axios.post("http://127.0.0.1:5000/translator/translate",
//   [{
//     "src": "T E S T",
//     "id": 0
//   }], {
//     headers: {
//       "Content-Type": "application/json"
//     }
//   })
//   .then(function(response) {
//     console.log(response.data);
//   })
//   .catch(function(error) {
//     console.log(error);
//   })

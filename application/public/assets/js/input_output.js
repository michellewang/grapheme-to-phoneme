$(document).ready(function() {

  // console.log('JavaScript loaded');

  // on text input change
  $('#userInput').on('input', function(){

    var input = $(this);

    // get sentence
    var text = input.val();

    if (!validInput(text)) {

      // display error message if input is invalid
      input.addClass('is-invalid');
      clearPhonemes();

    } else {

      // remove error message if input is valid
      input.removeClass('is-invalid');

      // process input
      words = processIntput(text);
      // console.log(words);

      // send input to server (unless input is empty)
      if (words.length == 0) {
        clearPhonemes();
      } else {
        socket.emit('wordsUpdated', words);
      }
    }

  });

  // on receiving new translation from server
  socket.on('translationUpdated', function(pronounciations) {

    // console.log(pronounciations);

    clearPhonemes();

    // for each pronounciation string (phonemes separated by a space)
    pronounciations.forEach(function(pronounciation, index) {

      // make new line of buttons
      var buttonToolbar = $('<div class="button-toolbar my-3"></div>');
      buttonToolbar.appendTo('#phonemeContainer');

      // split string into array of phonemes
      pronounciation = processTranslation(pronounciation);

      // add a button for each phoneme
      pronounciation.forEach(function(phoneme, index) {
        addPhoneme(phoneme, buttonToolbar);
      });

    })

    // phonemes = processTranslation(translation);
    //
    // // update phonemes
    // clearPhonemes();
    // phonemes.forEach(addPhoneme)

    // console.log(translation);
  })

  // input validation
  function validInput(str) {

    // only allow single word
    // if (/\s/.test(str)) {
    //   return false;
    // }

    // only allow sentences without special characters
    if (!/^[a-zA-Z() ]*$/.test(str)) {
      return false;
    }

    return true;
  }

  // converts input string to uppercase and adds spaces between characters
  function processIntput(sentence) {
    sentence = sentence.toUpperCase();

    words = sentence.split(' ');
    words = words.filter(element => element);

    for (var i = 0; i < words.length; i++) {
      words[i] = words[i].split('').join(' ');
    }

    return words;
  }

  // splits translation string into array of phonemes
  function processTranslation(str) {
    str = str.split(' ');
    return str;
  }

  function clearPhonemes() {
    $('#phonemeContainer').empty();
  }

  function addPhoneme(phoneme, location) {
    $('<button type="button"' +
      'data-phoneme="' + phoneme + '" ' +
      'class="btn btn-light border border-dark mx-1 phoneme">' +
      phoneme + '</button>').appendTo(location);
  }

});

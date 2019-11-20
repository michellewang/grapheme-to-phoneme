$(document).ready(function() {

  $('#phonemeContainer').on('mouseover', '.phoneme', function(){

    var phoneme = $(this).data('phoneme');
    phoneme = phoneme.replace(/\d+/g, ''); // remove trailing number (that marks stress)

    var audio = new Audio('assets/audio/' + phoneme + '.mp3');
    audio.play();

  });

});

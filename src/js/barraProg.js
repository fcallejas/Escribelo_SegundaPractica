var $ = require('jquery');

module.exports = {
  //var tProgress = null;

  animProgres: function (idProgr){
    $('#' + idProgr +'Cont').toggleClass("oculto");
      $('#' + idProgr).val(1);

      tProgress = setInterval(function(){
          var v = parseInt($('#' + idProgr).val());
          $('#' + idProgr).val(v+1);

          if(v >= 100)
            $('#' + idProgr).val(1);
      },10);
  },

  limpiarAnimProgres: function (idProgr){
    $('#' + idProgr +'Cont').toggleClass("oculto");
    //clearInterval(tProgress);
  }
}
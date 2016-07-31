var $ = require('jquery');

module.exports = {
	guardarComentarioApi: function (comentario, cbOk, cbError, cbCompleto){
		$.ajax({
				url:'/api/articulos/',
				method:'post',
				data: comentario,
				success:cbOk,
				error:cbError,
				complete:cbCompleto
			});	
	},

	cargarComentariosApi:function(cbOk, cbError,cbCompleto){
		$.ajax({
			url:'/api/articulos/',
			success:cbOk,
			error:cbError,
			complete:cbCompleto
		});
	}
}



var $ = require('jquery');
var apiCom = require("./apiComentarios");
var prog = require("./barraProg");
numComentarios = 0;

cargarNumComentarios();

$('#frmArt').submit(function(event) {

	if(contarPalabras() > 120){
		alert('El comentario no debe tener más de 120 palabras');
	}else{
		guardarComentario();	
	}
	
	event.preventDefault();
});

$('.iCom,.cabArticulo,.imgArticulo,.txtArticulo').on('click',function () {
	cargarComentarios();
});

$('#comentario').on('keydown',function () {
	var nPalabras = contarPalabras();
	$('#numPalabras').html(nPalabras);

	if(nPalabras >= 120)
		return false;
});

function guardarComentario(){
	var comentario = {
		nombre:$('#nombre').val(),
		apellido:$('#apellido').val(),
		email:$('#correo').val(),
		comentario:$('#comentario').val()
	};

	prog.animProgres('pBar');
	$('#btnEnviar').val('Enviando...');
	$('#btnEnviar').attr('disabled','disabled');

	apiCom.guardarComentarioApi(comentario, function(resp) {
		if(resp != null && resp.nombre != ''){
			if(numComentarios == 0)
				$('#contComentarios').html('');

			numComentarios++
			addComentarioHtml(resp);
			addNumComentarioHtml(numComentarios);
			$('#aComentarios').trigger('click');
		}else{
			alert('No fué posible guardar el comentario, por favor intentalo de nuevo');
		}
	}
	, function(resp){
		alert('Ocurrió un error al guardar el comentario, por favor intentalo de nuevo');
	}
	, function(resp){
		if(resp != null && resp.nombre != ''){
			resetComentario();
		}
	});
}

function resetComentario(){
	$('#btnEnviar').val('Enviar Comentario');
	$('#btnEnviar').removeAttr('disabled');

	$('.form').trigger("reset");
	prog.limpiarAnimProgres('pBar');
	$('#numPalabras').html('0');
}

function contarPalabras(){
	var comentario = $('#comentario').val();
	var arrPalabras = comentario.split(' ');

	var numPalabras = 0;

	for(var i = 0; i < arrPalabras.length; i++){
		if(arrPalabras[i].length > 1)
			numPalabras++;
	}

	return numPalabras;
}

function cargarComentarios(){
	$('#contComentarios').html('<div class="comentario" >No existen comentarios para este artículo</div>');
	prog.animProgres('pBar2');

	apiCom.cargarComentariosApi(function(resp){
		if(resp.length > 0){
			$('#contComentarios').html('');

			for(var i = 0; i < resp.length; i++){
				addComentarioHtml(resp[i]);
			}
		}else{
			$('#contComentarios').html('<div class="comentario" >No existen comentarios para este artículo</div>');
		}
	}
	,function(resp){
		alert('Ocurrió un error al cargar los comentarios, por favor intentalo más tarde');
	}
	,function(resp){
		prog.limpiarAnimProgres('pBar2');
	});
}

function cargarNumComentarios(){
	apiCom.cargarComentariosApi(function(resp){
		if(resp.length > 0){
			addNumComentarioHtml(resp.length);
			numComentarios = resp.length;
		}
	},null,null);
}

function addNumComentarioHtml(num){
	var spArt = $('.todosArticulos').find('.iCom');

	for(var i = 0; i < spArt.length; i++)
		$($(spArt[i]).children()[1]).html(num);
}

function addComentarioHtml(com){
	var htmlDv = getDVComentarios(com);
	$('#contComentarios').append(htmlDv);
}

function getDVComentarios(com){
	var htmlDv = '<div class="comentario"><div class="imgComentario"></div>';
	htmlDv += '<div class="conTxtCom"><h3>' + com.nombre + ' ' + com.apellido +'</h3>';
	htmlDv += '<p>' + com.comentario + '</p>';
	htmlDv += '<span class="comDatos cursiva">' + com.email + '</span></div></div>';

	return htmlDv;
}
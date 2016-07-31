var $ = require('jquery');
var artActual = '';
var apiCom = require("./apiComentarios");

cargarFavoritos();

$('.cabArticulo,.imgArticulo,.txtArticulo').on('click',function () {
	verArticuloCompleto(this);
	$('#aArriba').trigger('click');
});

$('.bIzqV').on('click',function () {
	verArticuloCompleto();

	$('#aArticulo').attr('href','#' + artActual);
	$('#aArticulo').trigger('click');
});

$('.iMgusta').on('click',function () {
	var padre = $(this).parents('.contArticulo')[0];
	var idArt = padre.dataset.idart;

	guardarFavorito(idArt, this);
});

$('.iCom').on('click',function () {
	verArticuloCompleto(this);

	$('#aComentarios').trigger('click');
});

function verArticuloCompleto(c) {
	if(c != null){
		var padre = $(c).parents('.contArticulo')[0];
		artActual = padre.id;
	}

	$('#articuloCompleto').toggleClass("oculto");
	$('#lstArticulos').toggleClass("oculto");
	
	$('#btnMenu').toggleClass("oculto");
	$('#btnVolver').toggleClass("oculto");

	$('.cabecera').toggleClass("vArt");
}

function guardarFavorito(idArt, sp){
	if(localStorage){
		if(localStorage['artFab_' + idArt] == null)
			localStorage['artFab_' + idArt] = idArt;
		else
			localStorage.removeItem('artFab_' + idArt);

		ponerFavorito(sp);
	}
}

function esFavorito(idArt){
	if(localStorage && localStorage['artFab_' + idArt] != null){
		return true;
	}

	return false;
}

function cargarFavoritos() {
	var lstArticulos = $('.todosArticulos').children();
	var nArt = lstArticulos.length;

	for(var i = 0; i < nArt; i++){
		var idArt = lstArticulos[i].dataset.idart;

		if(esFavorito(idArt)){
			var iGusta = $(lstArticulos[i]).find('.iMgusta')[0];
			ponerFavorito(iGusta);
		}
	}
}

function ponerFavorito(sp) {
	$(sp).toggleClass("favorito");
}
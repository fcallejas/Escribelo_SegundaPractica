//Importar Gulp
var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var browserify = require('browserify');
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var postcss = require('gulp-postcss');
var imagemin = require('gulp-imagemin');

// Variabes de patrones de archivos JS
var archivosJS = ['src/js/*.js', 'src/js/**/*.js'];

var dirImgUsu = ['uploads/*.png','uploads/*.jpg','uploads/*.svg','uploads/*.gif'];
var dirImg = ['img/*.png','img/*.jpg','img/*.svg','img/*.gif'];

//Definir la tarea por defecto
gulp.task('default',['concatenar-js','compilar-sass'],function(){
	//Inicar BrwserSync
	browserSync.init({
		//server: "./" //Crea un servidor en la carpeta local
		proxy:'127.0.0.1:8000' //Actua como proxy para enviar peticiones a SparREST
	});

	//Observa el archivo sass para que cambia
	gulp.watch('./src/scss/*.scss',['compilar-sass']);

	//Observar cuando cambia el html para recargar
	gulp.watch('./*.html').on('change', browserSync.reload);

	//Observar los archivos js
	gulp.watch('src/js/*.js', ['concatenar-js']);

	//Observar cambios en las imágenes subidas por los uaurios
	gulp.watch(dirImgUsu, ['optimizar-img-usu']);

	//Observar cambios en las imágenes para optimizar
	gulp.watch(dirImg, ['optimizar-img-sys']);
});

//Definir la tarea sass para compilar SASS
gulp.task('compilar-sass',function(){
	gulp.src('./src/scss/estilo.scss') //Cargando archivo
	.pipe(sass().on('error',sass.logError)) //Compilar el archivo sass
	.pipe(sourcemaps.init())// Caputara los sourceMaps
	.pipe(postcss([
			autoprefixer(),//Autoprefijar el css con lo de webkit y eso
			cssnano()//minifica el css
		]))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('./dist/css/')) // guardamos el archivo en dist/css
	//.pipe(notify('SASS compilado :)'));
	.pipe(browserSync.stream());
});

//Definir tarea para concatenar JS
gulp.task('concatenar-js',function(){
	gulp.src('src/app.js')
	.pipe(sourcemaps.init())// Caputara los sourceMaps
	.pipe(tap(function(file){
		file.contents = browserify(file.path).bundle(); // Pasar el archivo por browserify para importar los require
	})) // Permite ejecutar código por cada fichero seleccionado en el paso anterior
	.pipe(buffer()) // Convertir cada archivo en un stream
	.pipe(uglify()) //Minifica el código Javascript
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('dist/js'))
	.pipe(browserSync.stream());
});

//Optimizar imágenes Usuario
gulp.task('optimizar-img-usu',function(){
	gulp.src(dirImg)
	.pipe(imagemin())
	.pipe(gulp.dest('./uploads/'))
});

//Optimizar imágenes Sistema
gulp.task('optimizar-img-sys',function(){
	gulp.src(dirImg)
	.pipe(imagemin())
	.pipe(gulp.dest('./dist/img/'))
});

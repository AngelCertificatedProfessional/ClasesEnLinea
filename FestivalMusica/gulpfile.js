const { src,dest,watch,parallel} = require('gulp');

//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

//Imagenes 
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done){    
    //src('src/scss/app.scss')//Identificar el archivo .scss a compilar
    src('src/scss/**/*.scss') //esta sintaxis permite que se escuchen todos los archivos
        .pipe(plumber()) //para que no detenga la ejecucion cuando hay un error;
        .pipe(sass())//Compilarlo
        .pipe(dest('build/css'));  //Almacenarlo
    console.log('compilando sass')
    done();
}

function imagenes(done){
    const opciones = {
        optimizationLevel:3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
    done();
}


function versionWebp(done){

    const opciones = {
        quality:50
    }

    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'));
    done();
}

function versionAvif(done){

    const opciones = {
        quality:50
    }

    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'));
    done();
}

function javascript(done){
    src('src/js/**/*.js')
        .pipe(dest('build/js'))
    done();
}

function dev(done){
    //watch('src/scss/app.scss',css);//que archivo va a estar escuchando los cambios y que tarea le voy a dar
    watch('src/scss/**/*.scss',css); // que permita escuchar todos los archivos
    watch('src/js/**/*.js',javascript); // que permita escuchar todos los archivos
    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes,versionWebp,versionAvif,javascript,dev);
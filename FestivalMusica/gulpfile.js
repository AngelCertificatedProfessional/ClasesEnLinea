const { src,dest,watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'))
const plumber = require('gulp-plumber');

function css(done){    
    //src('src/scss/app.scss')//Identificar el archivo .scss a compilar
    src('src/scss/**/*.scss') //esta sintaxis permite que se escuchen todos los archivos
        .pipe(plumber()) //para que no detenga la ejecucion cuando hay un error;
        .pipe(sass())//Compilarlo
        .pipe(dest('build/css'));  //Almacenarlo
    console.log('compilando sass')
    done();
}

function dev(done){
    //watch('src/scss/app.scss',css);//que archivo va a estar escuchando los cambios y que tarea le voy a dar
    watch('src/scss/**/*.scss',css); // que permita escuchar todos los archivos
    done();
}

exports.css = css;
exports.dev = dev;
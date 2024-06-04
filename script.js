

//Función de acceso a la API para las películas
const accesoAPIPeliculas = async () => {
    try {
        const respuesta = await fetch('https://swapi.dev/api/films/', {
            method: 'GET',
        });
        if (!respuesta.ok) {
            return Promise.reject(new Error(`¡Error HTTP! Estado: ${respuesta.status}`));
        } else {

            let respuestaOK = await respuesta.json();
            console.log(respuestaOK);

            return respuestaOK.results;
        }
    } catch (error) {
        throw `Este es el error: ${error}`;
    }
};

//Función para pintar la gráfica con los datos de la API
const datosPintar = async () => {
    const datos = await accesoAPIPeliculas();
    const arrayTitulos = [];
    const arrayEstreno = [];


    datos.forEach((pelicula) => {
        let filmName = pelicula.title;
        let filmYear = pelicula.release_date.split('-')[0];
        arrayTitulos.push(filmName);
        arrayEstreno.push(filmYear);
    });

   

    const data = {
        labels: arrayTitulos,
        series: [
            arrayEstreno
        ]
    };

    const options = {
       
         // Options for Y-Axis
  axisY: {
    // The offset of the labels to the chart area
    offset: 30,
    // This value specifies the minimum height in pixel of the scale steps
    scaleMinSpace: 40,
    // Use only integer values (whole numbers) for the scale steps
    onlyInteger: true
  },
    };

    new Chartist.Line('.ct-chart', data, options);
};

datosPintar();

//Función de acceso a la API para los personajes
const accesoAPIPersonajes = async() => {
    try {
        const respuesta2 = await fetch(' https://swapi.dev/api/people/', {
            method: 'GET',
        });
        if (!respuesta2.ok) {
            return Promise.reject(new Error(`¡Error HTTP! Estado: ${respuesta2.status}`));
        } else {
            let respuesta2OK = await respuesta2.json();
            return respuesta2OK.results; 
        }
    } catch (error) {
        
    }

};

//Función para pintar la 2ª gráfica de personajes con los datos de la API
const pintarPersonajes = async() => {
    const datosPersonajes = await accesoAPIPersonajes();
    const arrayNombres = [];
    const arrayFilms = [];

    datosPersonajes.forEach((personaje) => {
        let nombrePersonaje = personaje.name;
        let numeroPeliculas = personaje.films.length;
        arrayNombres.push(nombrePersonaje);
        arrayFilms.push(numeroPeliculas);
    });

    new Chartist.Bar('.ct-chart2', {
        labels: arrayNombres,
        series: [
            arrayFilms
        ]
      }, {
        // Default mobile configuration
        stackBars: true,
        axisX: {
            onlyInteger: true,
          labelInterpolationFnc: function(value) {
            return value.split(/\s+/).map(function(word) {
              return word[0];
            }).join('');
          }

        },
        axisY: {
            onlyInteger: true,
          offset: 20,
        }
      }, [
        // Options override for media > 400px
        ['screen and (min-width: 400px)', {
          reverseData: true,
          horizontalBars: true,
          axisX: {
            labelInterpolationFnc: Chartist.noop
          },
          axisY: {
            offset: 60
          }
        }],
        // Options override for media > 800px
        ['screen and (min-width: 800px)', {
          stackBars: false,
          seriesBarDistance: 40
        }],
        // Options override for media > 1000px
        ['screen and (min-width: 1000px)', {
          reverseData: false,
          horizontalBars: false,
          seriesBarDistance: 50
        }]
      ]);


};

pintarPersonajes();
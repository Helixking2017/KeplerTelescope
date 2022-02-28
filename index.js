const { error } = require('console')
const {parse} = require('csv-parse')  //for parse to be in the form of a function it needs to be deconstructed
const  fs = require('fs')
const results = []

function isHabitable (planet){
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 
        && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6
}

fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: '#',
        columns: true
    }))
    .on('data', (data) => {
        if (isHabitable(data))
        {
           results.push(data) 
        }
    })
    //.throw(error)
    .on('error', (err) => {
        console.log(err)
    })
    .on('end', () => {
        console.log(results.map((result) => {return result['kepler_name']}))
        console.log(`There are ${results.length} habitable planets`)
        console.log('done')
    })
// data and the table handle
var tableData = data;
var table = d3.select('#ufo-table').select('tbody');


// five filters.  initially set to '' which implies all...
var date = ''
var city = ''
var state = ''
var country = ''
var shape = ''

// make things look nicer
function titleCase(str) {
    return str.toLowerCase().split(' ').map(function(word) {
        return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
}

// function to fill the data table
function fillTable() {
    // blow away what was already there 
    table.html('')

    // filter and add rows...
    tableData.forEach(element => {
        var date_ok    = (date === '')    || (date === element.datetime);
        var city_ok    = (city === '')    || (titleCase(city) === titleCase(element.city));
        var state_ok   = (state === '')   || (state.toUpperCase() === element.state.toUpperCase());
        var country_ok = (country === '') || (country.toUpperCase() === element.country.toUpperCase());
        var shape_ok   = (shape === '')   || (titleCase(shape) === titleCase(element.shape));
 
        if (date_ok && city_ok && state_ok && country_ok && shape_ok)  {
            var row = table.append("tr");
            var col = row.append("td");
            col.text(element.datetime);
            var col = row.append("td");
            col.text(titleCase(element.city));
            var col = row.append("td");
            col.text(element.state.toUpperCase());
            var col = row.append("td");
            col.text(element.country.toUpperCase());
            var col = row.append("td");
            col.text(titleCase(element.shape));
            var col = row.append("td");
            col.text(element.durationMinutes);
            var col = row.append("td");
            col.text(element.comments);
         }
    })
}
 
d3.select(window).on('load', fillTable);
d3.select('#datetime').on('change', function() { date = d3.event.target.value; console.log(date); fillTable(); } );
d3.select('#city').on('change', function() { city = d3.event.target.value; fillTable(); } );
d3.select('#state').on('change', function() { state = d3.event.target.value; fillTable(); } );
d3.select('#country').on('change', function() { country = d3.event.target.value; fillTable(); } );
d3.select('#shape').on('change', function() { shape = d3.event.target.value; fillTable(); } );
d3.select('#filter-btn').on('click', fillTable)
                                    
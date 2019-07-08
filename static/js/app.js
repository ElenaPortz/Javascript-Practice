// from data.js
var tableData = data;
var cleaned = "false";
console.log(tableData.length);
console.log (Object.entries(tableData)[0]);

function cleanData (data) {
    data.forEach((row) => {
        Object.entries(row).forEach(([key, value]) => {
            if (key === "city"){
                row[key] = value.charAt(0).toUpperCase() + value.slice(1);
            } else if (key === "state"|| key === "country"){
                row[key] =value.toUpperCase()
            } else if (key === "comments") {
                // excises substring starting with "&#" followed by any length of numerical characters from main string
                //regular expression "/g" flags global match so all instances are replaced
                row[key] = value.replace(/&#[1-9]*/g, "");
            };
        });  
    });
    cleaned = "true";

};

function initTable(data) {
    if (cleaned === "false"){ cleanData (data)};

    var tbody = d3.select("tbody");
    //clears out any existing table data
    tbody.html("");
    //case: filter returns zero rows
    if (data.length === 0) {
        tbody.text("Sorry, the date you filtered for was either incorrectly formatted, or did not correspond to extraterrestrial activity in our database. please refresh page to try again.");
    }
    else{
        //loops through passed in data
        data.forEach((ETReport) => {
            var row = tbody.append("tr");
            Object.entries(ETReport).forEach(([key, value]) => {
                var cell = tbody.append("td");
                cell.text(value);
            });
        });
    };
};

function handleChange(event) {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    // Get current event info
    console.log(d3.event)
    
    newText = d3.event.target.value;
    console.log(d3.event.target);

    // Select the input element and get the raw HTML node
    var userInput = d3.select(".form-control");

    // Get the value property of the input element
    var date = userInput.property("value");
    console.log(date);
    
    if (date) {
        var filteredData = tableData.filter(encounter => encounter.datetime === date);
        initTable(filteredData);
        console.log(filteredData);
    }

};
//--------
//--MAIN--
//--------
initTable(tableData);
var submit = d3.select("#filter-btn");
submit.on("click", handleChange);


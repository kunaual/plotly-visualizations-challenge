console.log("app.js loaded")


// will need to add something for optionChanged  which is already in html
//create function for event handler listed in html
function optionChanged(selectedVal) {
    console.log(selectedVal);
    barGraph(selectedVal);
}
//need to make a bar graph

function barGraph(sample) {

    d3.json("data/samples.json").then(function (data) {
        console.log(data);
        var samples = data.samples;
        var filteredArr = samples.filter(x => x.id == sample);
        console.log(filteredArr);
        console.log(filteredArr[0])//[0] is the part of the array that has data we want

        
    });


}
//make bubble chart

//update demographis info

//import data
//generate initial charts ...b asically initialize page w/a set of data (bar, bubble, demo)

// respond to change events

//went to office hours where dom went over an init function
function init() {
    var dropDown = d3.select('#selDataset');


    d3.json("data/samples.json").then(function (data) {
        console.log(data);

        var sampleNames = data.names;
        // console.log(sampleNames);
        //populate the dropdown with each of the sample names
        sampleNames.forEach(sampleID => {
            // console.log(sampleID);
            dropDown.append("option")
                .text(sampleID)
                .property("value", sampleID);

        })
    });


}


init();
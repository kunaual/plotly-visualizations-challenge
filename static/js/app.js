console.log("app.js loaded")


// will need to add something for optionChanged  which is already in html
//create function for event handler listed in html
function optionChanged(selectedVal) {
    console.log("selected value:" + selectedVal);
    barGraph(selectedVal);
    demographics(selectedVal);
}

function demographics(sample) {

    d3.json("data/samples.json").then(function (data) {
        var filteredMeta = data.metadata.filter(x => x.id == sample)[0];
        console.log(filteredMeta);
        console.log(Object.keys(filteredMeta));
        console.log(Object.values(filteredMeta));

        var selection = d3.select("#sample-metadata").selectAll("div")
        .data(Object.keys(filteredMeta));
        
        selection.enter()
        .append("div")
        .merge(selection)
        .text(function (d) {
            return d + " : " + filteredMeta[d];
        });

    });

};
function barGraph(sample) {
    //make horizontal bar graph of top 10 sample_values.  otu_ids as labels and otu_labels for hovertext.
    console.log("in barGraph");
    d3.json("data/samples.json").then(function (data) {
        //console.log(data);
        var samples = data.samples;
        var filteredArr = samples.filter(x => x.id == sample);
        console.log(filteredArr);
        console.log(filteredArr[0].otu_ids.slice(0, 10).reverse());//[0] is the part of the array that has data we want

        //top10 otu_ids store for labels
        otuIds_labels = filteredArr[0].otu_ids.slice(0, 10).reverse();
        //turn it into a label, by adding "OTU" to the #Id
        otuIds_labels = otuIds_labels.map(id => "OTU " + id);
        console.log(otuIds_labels);
        otuLabels_hover = filteredArr[0].otu_labels.slice(0, 10).reverse();
        data = filteredArr[0].sample_values.slice(0, 10).reverse();
        console.log(data);
        var barTrace = {
            x: data,
            y: otuIds_labels,
            text: otuLabels_hover,
            type: "bar",
            orientation: "h"
        };

        var barGraphData = [barTrace];

        var layout = {
            title: "Top " + otuIds_labels.length + " OTUs Found on Subject: " + sample,
            margin: {
                t: 30, l: 150
            }
        };

        // Render the plot to the div tag with id "bar"
        Plotly.newPlot("bar", barGraphData, layout);


    });




}
//make bubble chart

//update demographis info

//import data
//generate initial charts ...b asically initialize page w/a set of data (bar, bubble, demo)

// respond to change events

//went to office hours where Dom went over parts of this init function
//he also went over writing functions for everything, I would've done anyway (as I did with javascript UFO 2 work)
function init() {
    var dropDown = d3.select('#selDataset');


    d3.json("data/samples.json").then(function (data) {
        console.log(data.names[0]);

        var sampleNames = data.names;
        // console.log(sampleNames);
        //populate the dropdown with each of the sample names
        sampleNames.forEach((sampleID, index) => {
            if (index === 0) {
                console.log("First one!");
            }
            dropDown.append("option")
                .text(sampleID)
                .property("value", sampleID);

        });

        //initialize the graphics for the data from the first sample id
        //  barGraph(data.names[0]);
        demographics(data.names[0]);

    });
    // console.log(d3.select("selDataset").property("value"));


}


init();
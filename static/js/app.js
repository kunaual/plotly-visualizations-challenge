console.log("app.js loaded")

var currentTestSubject;


//create function for event handler listed in html
function optionChanged(selectedVal) {
    console.log("selected value:" + selectedVal);
    currentTestSubject = selectedVal;
    console.log("currentTestSubject " + currentTestSubject);
    barGraph(selectedVal);
    demographics(selectedVal);
    bubbles(selectedVal, d3.select("#selBubscale").property("value"));
    console.log(d3.select("#selBubscale").property("value"));
    gauge(selectedVal);
}

function bubOptionChanged(selectedScale) {
    console.log("BubScale value:" + selectedScale);
    console.log("currentTestSubject " + currentTestSubject);
    bubbles(currentTestSubject, selectedScale);
}

function demographics(sample) {

    d3.json("data/samples.json").then(function (data) {
        var filteredMeta = data.metadata.filter(x => x.id == sample)[0];
        //console.log(filteredMeta);  //testing messages
        //console.log(Object.keys(filteredMeta));
        //console.log(Object.values(filteredMeta));

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

function bubbles(sample, scale) {
    console.log("in bubbles");
    console.log(sample);


    d3.json("data/samples.json").then(function (data) {

        var samples = data.samples;
        console.log(samples);
        var filteredData = samples.filter(x => x.id == sample)[0];
        console.log(filteredData);

        var bubTrace = {
            x: filteredData.otu_ids,
            y: filteredData.sample_values,
            text: filteredData.otu_labels,
            mode: 'markers',
            marker: {
                color: filteredData.otu_ids,
                size: filteredData.sample_values.map(d => d / scale)
            }
        };

        var data = [bubTrace];

        var layout = {
            // title: 'Bubble Chart Hover Text',
            showlegend: false,
            height: 400,
            width: 800
        };

        Plotly.newPlot('bubble', data, layout);

    })
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
function gauge(sample) {

    d3.json("data/samples.json").then(function (data) {
       console.log(data.metadata[0].wfreq) 


        var filteredwFreq = data.metadata.filter(x => x.id == sample)[0].wfreq;
        console.log("filtered washfreq "+filteredwFreq);

        var data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: filteredwFreq,
              title: { text: "Wash frequency: Scrubs per week" },
              type: "indicator",
             mode: "gauge+number",
             name: "speed",
              gauge: {
                axis: { range: [0,9] },
                bar: { color: "darkred" },
                steps: [
                  { range: [0, 1], color: "orange" },
                  { range: [1, 3], color: "yellow" },
                  { range: [3, 6], color: "greenyellow" },
                  { range: [6, 8], color: "lightgreen" },
                  { range: [8, 9], color: "green" }
                ],
              }
            }
          ];
          
          var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
          Plotly.newPlot('gauge', data, layout);

    });

 }

//I went to dom's office hours where he talked about init function and putting everything in functions. which I would've done anyway
//as I've done with Javascript and other previous work.
function init() {
    var dropDown = d3.select('#selDataset');

    var bubbleScale = d3.select('#selBubscale')
        .selectAll('option')
        .data([1, 2, 3, 5, 10])
        .enter()
        .append('option')
        .attr('value', d => d)
        .text(d => d);


    d3.json("data/samples.json").then(function (data) {
        console.log(data.names[0]);

        var sampleNames = data.names;
        // console.log(sampleNames);
        //populate the dropdown with each of the sample names
        sampleNames.forEach((sampleID, index) => {
            if (index === 0) {
                console.log("First one!");
                currentTestSubject = sampleID;
            }
            dropDown.append("option")
                .text(sampleID)
                .property("value", sampleID);

        });

        //initialize the graphics for the data from the first sample id
        barGraph(data.names[0]);
        demographics(data.names[0]);
        bubbles(data.names[0], 1);
        gauge(data.names[0]);

    });
    // console.log(d3.select("selDataset").property("value")); //testing msg


}


init();
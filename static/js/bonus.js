console.log("bonus.js loaded");


// function optionChanged(selectedVal) {
//      gauge(selectedVal);
// }
function gauge(sample) {

    d3.json("data/samples.json").then(function (data) {
       console.log(data.metadata[0].wfreq) 
        //console.log(filteredMeta);  //testing messages
        //console.log(Object.keys(filteredMeta));
        //console.log(Object.values(filteredMeta));

        // var selection = d3.select("#sample-metadata").selectAll("div")
        //     .data(Object.keys(filteredMeta));

        var filteredwFreq = data.metadata.filter(x => x.id == sample)[0].wfreq;
        console.log("filtered washfreq "+filteredwFreq);//filteredMeta.wfreq);
        // selection.enter()
        //     .append("div")
        //     .merge(selection)
        //     .text(function (d) {
        //         return d + " : " + filteredMeta[d];
        //     });

        var data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: filteredwFreq,
              title: { text: "Scrubs per week" },
              type: "indicator",
              mode: "gauge+number",
              //delta: { reference: 380 },
              gauge: {
                axis: { range: [0, 9] },
                bar: { color: "darkred" },
                steps: [
                  { range: [0, 1], color: "yellow" },
                  { range: [1, 2], color: "greenyellow" },
                  { range: [2, 3], color: "greenyellow" },
                  { range: [3, 4], color: "greenyellow" },
                  { range: [4, 5], color: "greenyellow" },
                  { range: [5, 6], color: "greenyellow" },
                  { range: [6, 7], color: "lightgreen" },
                  { range: [7, 8], color: "lightgreen" },
                  { range: [8, 9], color: "green" }
                ],
                // threshold: {
                //   line: { color: "red", width: 4 },
                //   thickness: 0.75,
                //   value: 490
                // }
              }
            }
          ];
          
          var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
          Plotly.newPlot('gauge', data, layout);

    });

 }

 gauge(940);
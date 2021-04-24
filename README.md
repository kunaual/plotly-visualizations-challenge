# plotly-visualizations-challenge
Interactive-Visualizations-and-Dashboards

Given  [Navel Biology dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), created a number of plotly visualizations.  The data contains demographic information for each study participant (ethnicity, age, gender, belly button type (bbtype):'I'nnie or 'O'uttie, and wash frequency), and a census of OTUs living in their navels,  

Repository contains the following:
* data/samples.json - study's dataset
* statis/js/app.js - Contains a function of each of the visulization sections (demographics, bar chart, bubble chart, gauge).  Contains an event handler for each of the dropdown lists and an init function to initalize the page with the 1st test subject's data.  Because the bubble chart data bubbles can go off the chart for some test subjects, a scaling factor was added to allow the user to scale the bubbles down by a chosen factor (1,2,3,5,10).
* index.html - bootstrap page to display the visualizations from app.js
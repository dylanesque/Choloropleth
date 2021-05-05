async function drawChloropleth() {
  // 1. Access data and create accessors
  const eduDataset = await d3.json(
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json'
  );
  const countyDataset = await d3.json(
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'
  );

  const countyData = topojson.feature(countyDataset, countyDataset.objects.counties).features;

  console.log(countyData);

  // 2. Draw Chart
  let dimensions = {
    width: window.innerWidth * 0.9,
    margin: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    }
  }
  dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right

  // d3.geoAlbers();

  // 3. Create Canvas

  // 4. Create Scales

  // 5. Create Axes
}

drawChloropleth();

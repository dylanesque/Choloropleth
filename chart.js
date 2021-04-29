async function drawChloropleth() {
  const eduDataset = await d3.json(
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json'
  );
  const countyDataset = await d3.json(
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'
  );
}

drawChloropleth();

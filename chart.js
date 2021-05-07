async function drawChloropleth() {
  // 1. Access data and create accessors
  const eduDataset = await d3.json(
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json'
  );
  const countyDataset = await d3.json(
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'
  );

  console.log(eduDataset);

  // The topojson data needs to be converted to GeoJSON for D3 to be able to work with it
  const countyData = topojson.feature(
    countyDataset,
    countyDataset.objects.counties
  ).features;

  const colors = [
    '#CBCAF6',
    '#9D9AE6',
    '#7572D3',
    '#524DCE',
    '#352FB8',
    '#120D87',
    '#06034E',
  ];

  // 2. Draw Chart
  let dimensions = {
    width: window.innerWidth,
    height: 600,
    margin: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 40,
    },
  };
  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;

  // d3.geoAlbers();

  // 3. Create Canvas
  const canvas = d3
    .select('#canvas')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height)
    .attr('test-align', 'center')
    .selectAll('path')
    .data(countyData)
    .enter()
    .append('path')
    // generates a map given the coordinates from the dataset
    .attr('d', d3.geoPath())
    .attr('class', 'county')
    .attr('fill', (datum) => {
      return mapEducationToColor(getEducation(datum));
    })
    .attr('data-fips', (datum) => {
      let county = getCounty(datum);
      return county.fips;
    })
    .attr('data-education', (datum) => {
      let county = getCounty(datum);
      return county.bachelorsOrHigher;
    })
    .on('mouseover', onMouseOver)
    .on('mouseleave', onMouseLeave);

  function mapEducationToColor(percent) {
    if (percent > 57) {
      return colors[6];
    } else if (percent <= 57 && percent > 48) {
      return colors[5];
    } else if (percent <= 48 && percent > 39) {
      return colors[4];
    } else if (percent <= 39 && percent > 30) {
      return colors[3];
    } else if (percent <= 30 && percent > 21) {
      return colors[2];
    } else if (percent <= 21 && percent > 12) {
      return colors[1];
    } else {
      return colors[0];
    }
  }

  function getCounty(datum) {
    let countyId = datum.id;
    return eduDataset.find((c) => c.fips === countyId);
  }

  function getEducation(datum) {
    let county = getCounty(datum);
    return county.bachelorsOrHigher;
  }
  // 4. Create Scales

  // 5. Create Axes

  // 6. Interactions

  const tooltip = d3
    .select('body')
    .append('div')
    .attr('id', 'tooltip')
    .style('visibility', 'hidden');

  function onMouseOver(d) {
    let datum = d;
    tooltip.transition().duration(200).style('visibility', 'visible');
    // Show state, county, and education
    tooltip
      .style('left', d3.event.pageX + 'px')
      .style('top', d3.event.pageY - 28 + 'px')
      .attr('data-education', () => {
        let county = getCounty(datum);
        return county.bachelorsOrHigher;
      });
  }

  function onMouseLeave() {
    tooltip.transition().duration(200).style('visibility', 'hidden');
  }
}

drawChloropleth();

/**
 * @Author: Dastan Alam
 * @Date:   2024-07-03 12:13:16 AM   00:07
 * @Last Modified by:   Dastan Alam
 * @Last Modified time: 2024-07-03 03:01:24 AM   03:07
 */
// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';  // Import all D3.js modules
import { Container, Row, Col, Form } from 'react-bootstrap';
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    endYear: '',
    topics: '',
    sector: '',
    region: '',
    pest: '',
    source: '',
    swot: '',
    country: '',
    city: ''
  });

  const [filterOptions, setFilterOptions] = useState({
    endYears: [],
    topics: [],
    sectors: [],
    regions: [],
    pests: [],
    sources: [],
    swots: [],
    countries: [],
    cities: []
  });

  useEffect(() => {
    axios.get('http://localhost:5001/api/data')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
        setFilterOptions(generateFilterOptions(response.data));
        createCharts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const generateFilterOptions = (data) => {
    const unique = (key) => [...new Set(data.map(item => item[key]))];

    return {
      endYears: unique('end_year'),
      topics: unique('topics'),
      sectors: unique('sector'),
      regions: unique('region'),
      pests: unique('pest'),
      sources: unique('source'),
      swots: unique('swot'),
      countries: unique('country'),
      cities: unique('city')
    };
  };

  const applyFilters = () => {
    let filtered = data;
    if (filters.endYear) {
      filtered = filtered.filter(d => d.end_year === filters.endYear);
    }
    if (filters.topics) {
      filtered = filtered.filter(d => d.topics.includes(filters.topics));
    }
    if (filters.sector) {
      filtered = filtered.filter(d => d.sector.includes(filters.sector));
    }
    if (filters.region) {
      filtered = filtered.filter(d => d.region.includes(filters.region));
    }
    if (filters.pest) {
      filtered = filtered.filter(d => d.pest.includes(filters.pest));
    }
    if (filters.source) {
      filtered = filtered.filter(d => d.source.includes(filters.source));
    }
    if (filters.swot) {
      filtered = filtered.filter(d => d.swot.includes(filters.swot));
    }
    if (filters.country) {
      filtered = filtered.filter(d => d.country.includes(filters.country));
    }
    if (filters.city) {
      filtered = filtered.filter(d => d.city.includes(filters.city));
    }
    setFilteredData(filtered);
    createCharts(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const createCharts = (data) => {
    createBarChart(data);
    createScatterPlot(data);
  };

  const createBarChart = (chartData) => {
    const svg = d3.select('#bar-chart')
      .attr('width', 800)
      .attr('height', 400);

    svg.selectAll('*').remove();  // Clear previous contents

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(chartData.map(d => d.year))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(chartData, d => d.intensity)])
      .nice()
      .range([height, 0]);

    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y));

    g.selectAll('.bar')
      .data(chartData)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.year))
      .attr('y', d => y(d.intensity))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.intensity))
      .attr('fill', 'steelblue')
      .append('title')
      .text(d => `Intensity: ${d.intensity}\nLikelihood: ${d.likelihood}\nRelevance: ${d.relevance}`);
  };

  const createScatterPlot = (chartData) => {
    const svg = d3.select('#scatter-plot')
      .attr('width', 400)
      .attr('height', 400);

    svg.selectAll('*').remove();  // Clear previous contents

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain(d3.extent(chartData, d => d.likelihood)).nice()
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain(d3.extent(chartData, d => d.relevance)).nice()
      .range([height, 0]);

    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y));

    g.selectAll('.dot')
      .data(chartData)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('cx', d => x(d.likelihood))
      .attr('cy', d => y(d.relevance))
      .attr('r', 5)
      .style('fill', 'steelblue')
      .append('title')
      .text(d => `Intensity: ${d.intensity}\nLikelihood: ${d.likelihood}\nRelevance: ${d.relevance}`);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Form>
            <Row>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>End Year</Form.Label>
                  <Form.Control as="select" name="endYear" value={filters.endYear} onChange={handleFilterChange}>
                    <option value="">All</option>
                    {filterOptions.endYears.map((year, index) => (
                      <option key={index} value={year}>{year}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Topics</Form.Label>
                  <Form.Control as="select" name="topics" value={filters.topics} onChange={handleFilterChange}>
                    <option value="">All</option>
                    {filterOptions.topics.map((topic, index) => (
                      <option key={index} value={topic}>{topic}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Sector</Form.Label>
                  <Form.Control as="select" name="sector" value={filters.sector} onChange={handleFilterChange}>
                    <option value="">All</option>
                    {filterOptions.sectors.map((sector, index) => (
                      <option key={index} value={sector}>{sector}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Region</Form.Label>
                  <Form.Control as="select" name="region" value={filters.region} onChange={handleFilterChange}>
                    <option value="">All</option>
                    {filterOptions.regions.map((region, index) => (
                      <option key={index} value={region}>{region}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>PEST</Form.Label>
                  <Form.Control as="select" name="pest" value={filters.pest} onChange={handleFilterChange}>
                    <option value="">All</option>
                    {filterOptions.pests.map((pest, index) => (
                      <option key={index} value={pest}>{pest}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Source</Form.Label>
                  <Form.Control as="select" name="source" value={filters.source} onChange={handleFilterChange}>
                    <option value="">All</option>
                    {filterOptions.sources.map((source, index) => (
                      <option key={index} value={source}>{source}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>SWOT</Form.Label>
                  <Form.Control as="select" name="swot" value={filters.swot} onChange={handleFilterChange}>
                    <option value="">All</option>
                    {filterOptions.swots.map((swot, index) => (
                      <option key={index} value={swot}>{swot}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Country</Form.Label>
                  <Form.Control as="select" name="country" value={filters.country} onChange={handleFilterChange}>
                    <option value="">All</option>
                    {filterOptions.countries.map((country, index) => (
                      <option key={index} value={country}>{country}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control as="select" name="city" value={filters.city} onChange={handleFilterChange}>
                    <option value="">All</option>
                    {filterOptions.cities.map((city, index) => (
                      <option key={index} value={city}>{city}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={6}>
          <h3>Intensity by Year</h3>
          <svg id="bar-chart"></svg>
        </Col>
        <Col md={6}>
          <h3>Likelihood vs Relevance</h3>
          <svg id="scatter-plot"></svg>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
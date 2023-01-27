import React from 'react';
import { DataList } from 'rc-easyui';
import axios from "axios";
import { Link } from 'react-router-dom';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
//import IconButton from '@mui/material/IconButton';
//import Input from '@mui/material/Input';
//import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//import SearchIcon from '@mui/icons-material/Search';

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
 
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      pageNumber: 1,
      pageSize: 20,
      data: [],
      loading: false,
      selection: null,
      //yelp parameter
      sort: 'best_match',
      order: '',
      location: 'NYC',
      term: '',
      categories: '',
      distance: ''
    }
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    const { pageNumber, sort, order, location, term, categories, distance } = this.state;
    const config = {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            'Authorization': process.env.REACT_APP_YELP_KEY
        },
        params:{
            location: location===''?'NYC':location,
            offset:pageNumber,
            limit:10,
            sort_by:sort,
            order:order,
            term:term,
            categories:categories,
            radius:distance
        }
    };
    const url = 'https://corsanywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search';
    this.setState({ loading: true })
    axios.get(url, config).then((response) => {
        console.log(response);
        this.setState({
            total: parseInt(response.data.total, 10),
            data: response.data.businesses,
            loading: false
        })
    });
  }
  handleSelectionChange(selection) {
    this.setState({ selection: selection })
  }
  handlePageChange(event) {
    if (event.refresh) {
      this.fetchData();
    } else {
      this.setState({ pageNumber: event.pageNumber }, () => {
        this.fetchData();
      })
    }
    //this.loadPage(event.pageNumber, event.pageSize);
  }
  handleLocationChange(event) {
    this.setState({location: event.target.value});
  }
  handleTermChange(event) {
    this.setState({term: event.target.value});
  }
  handleCategoriesChange(event) {
    this.setState({categories: event.target.value});
  }
  handleDistanceChange(event) {
    this.setState({distance: event.target.value});
  }
  handleSortByChange(event) {
    this.setState({sort: event.target.value}, () => {
      this.fetchData();
    });
  }
  handleButtonFilter(){
    this.fetchData();
  }
  renderItem({ row, rowIndex }) {
    return (
      <Card sx={{ display: 'flex', maxWidth: 'auto', margin: 1 }}>
        <CardMedia sx={{ width:200, textAlign: 'right' }}
          component="img"
          height="200"
          image={row.image_url}
          alt="Paella dish"
        />
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {row.name}
          </Typography>
          <Rating name="read-only" value={row.rating} readOnly />
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {row.location.display_address} ({parseInt(row.distance)} m.)
          </Typography>
          <Link to={"/business/"+row.id}>
            <Button variant="contained">Details</Button>
          </Link>
        </CardContent>
        
      </Card>
      
    )
  }
  render() {
    return (
      <Container maxWidth="md">
        <h2>DataList Pagination</h2>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField value={this.state.categories} onChange={this.handleCategoriesChange.bind(this)} id="standard-basic" label="Categories" variant="standard" />
            <TextField value={this.state.location} onChange={this.handleLocationChange.bind(this)} id="standard-basic" label="Location" variant="standard" />
          </Grid>
          <Grid item xs={3}>
            <TextField value={this.state.term} onChange={this.handleTermChange.bind(this)} id="standard-basic" label="Term" variant="standard" />
            <TextField value={this.state.distance} onChange={this.handleDistanceChange.bind(this)} id="standard-basic" label="Distance(m.)" variant="standard" />
          </Grid>
          <Grid item xs={2}>
              <Button fullWidth={true} size="small" onClick={this.handleButtonFilter.bind(this)} variant="contained">Filter</Button>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.sort}
                label="Sort By"
                onChange={this.handleSortByChange.bind(this)}
              >
                <MenuItem value="best_match">Best Match</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
                <MenuItem value="review_count">Reviews</MenuItem>
                <MenuItem value="discount">Discount</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <br/>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DataList
              style={{ width: '100%', height: '100hv' }}
              {...this.state}
              pagination
              lazy
              idField="id"
              selectionMode="single"
              renderItem={this.renderItem.bind(this)}
              onSelectionChange={this.handleSelectionChange.bind(this)}
              onPageChange={this.handlePageChange.bind(this)}
            />
            <p>You selected: {JSON.stringify(this.state.selection)}</p>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
 
export default App;
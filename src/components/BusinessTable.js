import React from 'react';
import { DataGrid, GridColumn } from 'rc-easyui';
import axios from "axios";

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';

 
class BusinessTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      data: [],
      pageNumber: 1,
      loading: false,
      sort: 'best_match',
      order: '',
      location: '',
      term: ''
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    const { pageNumber, sort, order, location, term } = this.state;
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
            term:term
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
  handlePageChange({ pageNumber, refresh }) {
    if (refresh) {
      this.fetchData();
    } else {
      this.setState({ pageNumber: pageNumber }, () => {
        this.fetchData();
      })
    }
  }
  handleSortChange(sorts) {
    if (sorts && sorts.length) {
    this.setState({ sort: sorts[0].field, order: sorts[0].order }, () => {
        this.fetchData()
    })
    }
  }
  handleLocationChange(event) {
    this.setState({location: event.target.value});
  }
  handleTermChange(event) {
    this.setState({term: event.target.value});
  }
  handleSortByChange() {
    this.fetchData();
  }
  handleButtonFilter(){
    this.fetchData();
  }
  render() {
    return (
        <Container maxWidth="lg">
            <h2>Remote Sorting</h2>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <TextField value={this.state.location} onChange={this.handleLocationChange.bind(this)} id="standard-basic" label="Location" variant="standard" />
                    <TextField value={this.state.term} onChange={this.handleTermChange.bind(this)} id="standard-basic" label="Term" variant="standard" />
                </Grid>
                <Grid item xs={3}>
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
                <Grid item xs={1}>
                    <Button onClick={this.handleButtonFilter.bind(this)} variant="contained">Filter</Button>
                </Grid>
            </Grid>
            
            
            
            <DataGrid
                style={{ height: 400 }}
                total={this.state.total}
                data={this.state.data}
                pageSize={10}
                pageNumber={this.state.pageNumber}
                loading={this.state.loading}
                pagination
                lazy
                onPageChange={this.handlePageChange.bind(this)}
                onSortChange={this.handleSortChange.bind(this)}
            >
            <GridColumn field="id" title="ID" sortable></GridColumn>
            <GridColumn field="name" title="Name" sortable></GridColumn>
            <GridColumn field="price" title="Price" align="right" sortable></GridColumn>
            <GridColumn field="review_count" title="Reviews" align="right" sortable></GridColumn>
            <GridColumn field="rating" title="Rating" width="30%"></GridColumn>
            </DataGrid>
        </Container>
    );
  }
}
 
export default BusinessTable;
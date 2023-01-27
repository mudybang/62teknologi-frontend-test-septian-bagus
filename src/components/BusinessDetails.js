import React from 'react';
import {useParams} from 'react-router-dom';
import axios from "axios";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

import SlideShow from "./SlideShow";
import ReviewsList from "./ReviewsList";
import GmapMarker from "./GmapMarker";

function withRouter(Component) {
    function ComponentWithRouter(props) {
      let params = useParams()
      return <Component {...props} params={params} />
    }
    return ComponentWithRouter
}
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

class BusinessDetails extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id: "",
        detail:[],
        loading1:false,
        loaded1:false,
        loaded2:false
      };
    }
    
    componentDidMount() {
        this.setState({
            id : this.props.params.id
        }, () => {
                this.fetchDetails(this.state.id);
            }
        )
    }
    async fetchDetails(id) {
        const config = {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                'Authorization': process.env.REACT_APP_YELP_KEY
            }
        };
        const url = 'https://corsanywhere.herokuapp.com/https://api.yelp.com/v3/businesses/'+id;
        this.setState({ loading1: true })
        await axios.get(url, config).then((response) => {
            this.setState({
                detail: response.data,
                loading1: false,
                loaded1:true
            })
        });
    }
    render() {
        if(!this.state.loaded1){
            return (
                <Stack alignItems="center">
                    <CircularProgress/>
                </Stack>
            )
        }else{
            return (
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card sx={{ maxWidth: 'auto', margin: 1 }}>
                                <CardMedia
                                    component="img"
                                    height="350"
                                    image={this.state.detail.image_url??''}
                                    alt={this.state.detail.name??''}
                                />
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Stack spacing={2}>
                                    <Typography component="div" variant="h5">
                                        {this.state.detail.name}
                                    </Typography>
                                    <Typography component="div" variant="p">
                                        {this.state.detail.location.display_address[0]}, {this.state.detail.location.display_address[1]}
                                    </Typography>
                                    <Rating name="read-only" value={this.state.detail.rating??0} readOnly />
                                    <Typography component="div" variant="h5">
                                    {this.state.detail.categories?.map((row, index) => {
                                        return (
                                            <Chip mr={2} key={row.alias} label={row.title??''} />
                                        );
                                    })}
                                    </Typography>
                                    </Stack>
                                    
                                    
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={8}>
                            <Item>
                                <Typography component="div" variant="h5">
                                    Reviews
                                </Typography>
                                <ReviewsList id={this.state.detail.id}/>
                            </Item>
                        </Grid>
                        <Grid item xs={4}>
                            <Stack spacing={2}>
                                <Item><SlideShow photos={this.state.detail.photos}/></Item>
                                <Item><GmapMarker coordinates={this.state.detail.coordinates}/></Item>
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider/>
                        </Grid>
                    </Grid>
                    <br/><br/>
                </Container>
            );
        }
    }
}
export default withRouter(BusinessDetails);
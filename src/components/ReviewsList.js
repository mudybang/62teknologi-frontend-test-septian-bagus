import React from 'react';
import axios from "axios";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

class ReviewsList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data:[],
        loading:false,
        loaded:false,
      };
    }
    componentDidMount() {
        this.fetchReviews(this.props.id)
    }
    async fetchReviews(id) {
        const config = {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                'Authorization': process.env.REACT_APP_YELP_KEY
            }
        };
        const url = "https://corsanywhere.herokuapp.com/https://api.yelp.com/v3/businesses/"+id+"/reviews?limit=20&sort_by=yelp_sort";
        this.setState({ loading: true })
        await axios.get(url, config).then((response) => {
            console.log(response)
            this.setState({
                data: response.data.reviews,
                loading: false,
                loaded:true
            })
        });
    }
    render() {
        return (
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {this.state.data?.map((row, index) => {
                    return (
                        <ListItem key={index} alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt={row.user.name} src={row.user.profile_url} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={row.user.name}
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                    </Typography>
                                    {row.text}
                                    </React.Fragment>
                                }
                                />
                            
                        </ListItem>
                    );
                })}
            </List>
        );
    }
}

export default ReviewsList;
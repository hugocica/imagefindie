import React, { Component } from 'react';
import {requestAllPhotos} from '../../../actions/list';
import {requestSearch} from '../../../actions/search';
import {connect} from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import {Container, Row} from 'react-bootstrap';
import Masonry from 'react-masonry-component';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LoadingRequisition from '../../loading';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            orderby: 'latest',
            query: '',
            photos: []
        }
    }

    componentDidMount() {
        const { photos } = this.props;

        if ( photos.length === 0 ) {

            this.props.requestAllPhotos();

        }
    }

    componentDidUpdate() {

        if ( this.state.query !== '' && typeof this.props.searchReturn.results !== 'undefined' && this.state.photos !== this.props.searchReturn.results ) {
            this.setState({ photos: this.props.searchReturn.results })
        } else if ( this.state.query === '' && this.props.photos !== this.state.photos ) {
            this.setState({ photos: this.props.photos })
        }

    }

    renderList = () => {
        const { photos, searchReturn, fetchingPhotos } = this.props;

        if ( fetchingPhotos ) {
            return <LoadingRequisition />
        }

        const masonryOptions = {
            transitionDuration: 0
        };

        const imagesLoadedOptions = { background: '.photo-item' }

        let photosToRender = photos;

        if ( typeof searchReturn.lenght !== typeof undefined ) {
            photosToRender = searchReturn.results;
        }

        let items = this.state.photos.map((item, key) => {
            return <ListItem className="photo-item" key={`repo-${key}`}>
                <img src={item.urls['regular']} alt={item.alt_description}/>
                <div className="item-meta"></div>
            </ListItem>
        });

        return (
            <Masonry
                className={'photos-wrapper my-gallery-class'}
                elementType={'ul'}
                options={masonryOptions}
                disableImagesLoaded={false}
                updateOnEachImageLoad={false}
                imagesLoadedOptions={imagesLoadedOptions} // default {}
                >
                {items}
            </Masonry>
        )
    }

    handleSearch = event => {
        const { query, page } = this.state;

        if ( event.key === 'Enter' ) {

            this.props.requestSearch(event.target.value, page);
            this.setState({ query: event.target.value });

        }
    }

    handlePagination = () => {
        const { query, page, orderby } = this.state;

        if ( query === '' ) {

            this.props.requestAllPhotos(page, orderby);

        } else {

            this.props.requestSearch(query, page);

        }
    }

    handleOrderBy = event => {
        this.setState({ orderby: event.target.value });

        this.props.requestAllPhotos(this.state.page, event.target.value);
    }

    render() {
        const { photos, searchReturn, fetchingPhotos } = this.props;

        return(
            <div className="App">
                <Container>
                    <Row>
                        <div className="filter-wrapper">
                            <TextField
                              id="standard-search"
                              label="Search"
                              type="search"
                              className="input-text"
                              margin="normal"
                              onKeyPress={this.handleSearch}
                              onBlur={this.handleSearch}
                              variant="outlined"
                            />
                        </div>
                    </Row>
                    <Row>
                        <div className="orderby-wrapper">
                            <p className="group-label">Order by</p>
                            <RadioGroup
                                aria-label="Gender"
                                name="gender1"
                                value={this.state.orderby}
                                onChange={this.handleOrderBy}
                                className="input-radio-group"
                              >
                                <FormControlLabel value="latest" control={<Radio color="primary" />} label="Latest" />
                                <FormControlLabel value="oldest" control={<Radio color="primary" />} label="Oldest" />
                                <FormControlLabel value="popular" control={<Radio color="primary" />} label="Popular" />
                              </RadioGroup>
                        </div>
                    </Row>
                    <Row>

                        {this.renderList()}

                    </Row>
                </Container>
            </div>
        );

    }
}

const mapStateProps = (state) => {
    return {
        photos: state.photos.listPhotos,
        fetchingPhotos: state.photos.fetching,
        searchReturn: state.search.listPhotos
    }
}

export default connect(mapStateProps, {requestAllPhotos, requestSearch})(HomePage);

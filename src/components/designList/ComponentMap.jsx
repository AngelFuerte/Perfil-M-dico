import React, { Component } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

class ComponentMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      address: '',
      initialCenter: { lat: 19.689688, lng: -101.170398 },
      center: {},
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.setState({ center: this.props.load_location });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      if (typeof nextProps.initialValues !== 'undefined') {
        if (
          typeof nextProps.initialValues.work_place[nextProps.index] !==
          'undefined'
        ) {
          if (
            typeof nextProps.initialValues.work_place[nextProps.index]
              .location !== 'undefined'
          ) {
            this.setState({
              center:
                nextProps.initialValues.work_place[nextProps.index].location,
            });
          }
        }
      }
    }
  }
  onMarkerClick(props, marker) {
    console.log(props);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }
  onMapClick() {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  }

  handleChange(address) {
    this.setState({ address });
  }

  render() {
    const styleMap = {
      width: '50vw',
      height: '75vh',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'block',
      position: 'relative',
    };
    const input = this.props.input;
    // console.log("values workplace")
    // console.log(this.props.index)
    return (
      <div>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={address => {
            geocodeByAddress(address)
              .then(results => getLatLng(results[0]))
              .then(latLng => {
                input.onChange(latLng);
                this.setState({ center: latLng });
              })
              .catch(error => console.error('Error', error));
          }}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Search Place ...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                      <div>{}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <div className="Map" style={styleMap}>
          <Map
            item
            xs={12}
            google={this.props.google}
            zoom={16}
            initialCenter={this.props.load_location}
            center={this.state.center}
            onClick={this.onMapClick}
          >
            <Marker
              onClick={this.onMarkerClick}
              title={this.state.address}
              position={this.state.center}
              // name = { 'Changing Colors Garage' }
            />
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
            >
              <Paper>
                <Typography variant="headline" component="h4">
                  {this.state.selectedPlace.title}
                </Typography>
              </Paper>
            </InfoWindow>
          </Map>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBld1lYALlLVvk0fxug_koFWag0Un-whMI',
})(ComponentMap);

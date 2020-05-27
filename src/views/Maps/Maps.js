import React, { useEffect, useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer
} from "react-google-maps";

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

// @material-ui/core
import { makeStyles, responsiveFontSizes } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import TextField from '@material-ui/core/TextField';

import { API, graphqlOperation } from 'aws-amplify'
import { createTruck, createRequest } from 'graphql/mutations'
import { listTrucks, listRequests } from 'graphql/queries'

import truckIcon from "assets/img/crane-sm.png";
import carIcon from "assets/img/car-sm.png";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { deleteTruck, deleteRequest } from "graphql/mutations";

const useStyles = makeStyles(styles);

const initialState = { plate: '', driver: '' }
const initialSelectedTruck = ({id: '', plate: '', driver: ''})
const initialSelectedRequest = ({id: '', customer: '', address: '', latLng: {}})

const App = () => {
  const [formState, setFormState] = useState(initialState)
  const [trucks, setTrucks] = useState([])
  const [markers, setMarkers] = useState([])
  const [requestMarkers, setRequestMarkers] = useState([])
  const [dialogOpen,setOpen] = useState(false)
  const [newTruckDialogOpen,setNewTruckOpen] = useState(false)
  const [newRequestDialogOpen,setNewRequestOpen] = useState(false)
  const [truckDetailDialogOpen,setTruckDetailDialogOpen] = useState(false)
  const [requestDetailDialogOpen,setRequestDetailDialogOpen] = useState(false)
  const [truckAssignmentDialogOpen,setTruckAssignmentDialogOpen] = useState(false)
  const [latLng,setLatLng] = useState()
  const [newPlate,setNewPlate] = useState()
  const [newDriver,setNewDriver] = useState()
  const [newCustomer,setNewCustomer] = useState()
  const [newAddress,setNewAddress] = useState()
  const [selectedTruck, setSelectedTruck] = useState(initialSelectedTruck)
  const [selectedRequest, setSelectedRequest] = useState(initialSelectedRequest)
  const [nearestTruck, setNearestTruck] = useState(initialSelectedTruck)

  useEffect(() => {
    fetchTrucks()
    fetchRequests()
  }, [])

 
  function openModal() {
    setOpen(true);
  }

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchTrucks() {
    try {
      const truckData = await API.graphql(graphqlOperation(listTrucks))
      const truckList = truckData.data.listTrucks.items
      const trucks = truckList.map((truck) => {
        delete truck.createdAt
        delete truck.updatedAt
        return(Object.values(truck))
      })
      addInitialMarkers(trucks)
    } catch (err) { console.log('error fetching trucks') }
  }

  function addInitialMarkers(trucks){
    let newMarkers = []
    for(let truck of trucks){
      let latLng = {lat: () => {return parseFloat(truck[3])},
                lng:() => {return parseFloat(truck[4])}
              }
      const marker = {location: latLng, id: truck[0], plate: truck[1], driver: truck[2]}
      newMarkers.push(marker)
    }
    setMarkers(newMarkers)
  }

  async function addTruck() {
    try {
      if (!latLng) return
      const truck = {plate: newPlate, 'driver': newDriver, lat: latLng.lat(), lng: latLng.lng() }
      let added = await API.graphql(graphqlOperation(createTruck, {input: truck}))
      addTruckMarker(latLng, added.data.createTruck.id, newPlate, newDriver)
      setNewTruckOpen(false)
    } catch (err) {
      console.log('error creating truck:', err)
    }
  }

  async function removeTruck(e){
    try {
      console.log('remove truck')
      await API.graphql(graphqlOperation(deleteTruck, {input: {id: selectedTruck.id}}))
      await fetchTrucks()
      setTruckDetailDialogOpen(false)
    } catch (err) {
      console.log('error removing truck:', err)
    }
  }

  function addTruckMarker(latLng, id, plate, driver) {
    try {
      if (!latLng) return
      const marker = {location: latLng, id: id, plate: plate, driver: driver}
      setMarkers([...markers, marker])
      setNewTruckOpen(false)
    } catch (err) {
      console.log('error creating marker:', err)
    }
    console.log(markers)
  }

  async function fetchRequests() {
    try {
      const requestData = await API.graphql(graphqlOperation(listRequests))
      const requestList = requestData.data.listRequests.items
      const requests = requestList.map((request) => {
        delete request.createdAt
        delete request.updatedAt
        return(Object.values(request))
      })
      addInitialRequestMarkers(requests)
    } catch (err) { console.log('error fetching requests') }
  }

  function addInitialRequestMarkers(requests){
    let newMarkers = []
    for(let request of requests){
      let latLng = {lat: () => {return parseFloat(request[3])},
                lng:() => {return parseFloat(request[4])}
              }
      const marker = {location: latLng, id: request[0], customer: request[1], address: request[2]}
      newMarkers.push(marker)
    }
    setRequestMarkers(newMarkers)
  }

  async function addRequest() {
    try {
      if (!latLng) return
      const request = {user: newCustomer, address: newAddress, lat: latLng.lat(), lng: latLng.lng() }
      console.log(request)
      let added = await API.graphql(graphqlOperation(createRequest, {input: request}))
      addRequestMarker(latLng, added.data.createRequest.id, newCustomer, newAddress)
    } catch (err) {
      console.log('error creating request:', err)
    }
  }

  async function removeRequest(e){
    try {
      console.log('remove truck')
      await API.graphql(graphqlOperation(deleteRequest, {input: {id: selectedRequest.id}}))
      await fetchRequests()
      setRequestDetailDialogOpen(false)
    } catch (err) {
      console.log('error removing request', err)
    }
  }

  async function assignNearestTruck(e){
    // find nearest truck
    const directionsService = new window.google.maps.DirectionsService()

    let distances = []

    for(var truck of markers)
    {
      distances.push(
        await new Promise((resolve, reject) => {
          directionsService.route(
            {
              origin: {lat: selectedRequest.latLng.lat(), lng: selectedRequest.latLng.lng()} ,
              destination: {lat: truck.location.lat(), lng: truck.location.lng()},
              travelMode: window.google.maps.TravelMode.DRIVING
            },  
            (result, status) => {
              if (status === window.google.maps.DirectionsStatus.OK) {
                resolve({truck: truck, duration: result.routes[0].legs[0].duration})
              } else {
                console.error(`error fetching directions ${result}`);
                reject('error')
              }
            }
          );
       })
      )
    }

    try {
      console.log('Assigning nearest truck')
      let sorted = distances.sort((a,b) => {return (a.duration.value < b.duration.value) ? -1 : 1})
      let selectedTruck = sorted[0]
      console.log(selectedTruck)

      setNearestTruck({id: selectedTruck.truck.id, plate: selectedTruck.truck.plate, driver: selectedTruck.truck.driver})

      let oldMarkers = markers
      let newMarkers = []
      for(var marker of oldMarkers){
        if(marker.id != selectedTruck.truck.id){
          newMarkers.push(marker)
        }
      }
      setMarkers(newMarkers)

      setRequestDetailDialogOpen(false)
      setTruckAssignmentDialogOpen(true)
    } catch (err) {
      console.log('error assigning truck:', err)
    }
  }

  function addRequestMarker(latLng, id, customer, address) {
    try {
      if (!latLng) return
      const marker = {location: latLng, id: id, customer: customer, address:address}
      setRequestMarkers([...requestMarkers, marker])
      setNewRequestOpen(false)
    } catch (err) {
      console.log('error creating marker:', err)
    }
    console.log(markers)
  }

  function mapClick(e){
    setLatLng(e.latLng)
    openModal()
  }

  const CustomMarker = (props) => {
    const {id} = props;
    const {plate} = props;
    const {driver} = props;

    const onMarkerClick = (e, id, plate, driver) => {
      setSelectedTruck({id: id, plate: plate, driver: driver})
      setTruckDetailDialogOpen(true)
    };

    return (
      <Marker
          onClick={(e) => {onMarkerClick(e, id, plate, driver)}}
          title={'plate'}
          name={'driver'}
          {...props}
      >
      </Marker>
    );
  };

  const RequestMarker = (props) => {
    const {id} = props;
    const {customer} = props;
    const {address} = props;

    const onMarkerClick = (e, id, customer, address) => {
      setSelectedRequest({id: id, customer: customer, address: address, latLng: e.latLng})
      setRequestDetailDialogOpen(true)
    };

    return (
      <Marker
          onClick={(e) => {onMarkerClick(e, id, customer, address)}}
          title={'customer'}
          name={'address'}
          {...props}
      >
      </Marker>
    );
  };

  const CustomSkinMap = withScriptjs(
    withGoogleMap(() => (
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: 4.624335, lng: -74.063644 }}
        defaultOptions={{
          scrollwheel: true,
          zoomControl: true
        }}
        onClick={mapClick}
      >
        {markers.map((marker) => {
            return (
              <CustomMarker
                key={marker.id}
                id={marker.id}
                plate={marker.plate}
                driver={marker.driver}
                position={{ lat: marker.location.lat(), lng: marker.location.lng() }}
                icon={truckIcon}
              >

            </CustomMarker>
            );
          })}
          {requestMarkers.map((marker) => {
            return (
              <RequestMarker
                key={marker.id}
                id={marker.id}
                customer={marker.customer}
                address={marker.address}
                position={{ lat: marker.location.lat(), lng: marker.location.lng() }}
                icon={carIcon}
              >

            </RequestMarker>
            );
          })}
      </GoogleMap>
    ))
  );

  const classes = useStyles();

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleNewTruckClose = (value) => {
    setNewTruckOpen(false);
  };

  const handleNewRequestClose = (value) => {
    setNewRequestOpen(false);
  };

  const handleTruckDetailClose = (value) => {
    setTruckDetailDialogOpen(false);
  };

  const handleRequestDetailClose = (value) => {
    setRequestDetailDialogOpen(false);
  };

  const handleAssignmentDialogClose = (value) => {
    setTruckAssignmentDialogOpen(false);
  };

  const handlePlateChange = (evt) =>{
    setNewPlate(evt.target.value)
  };

  const handleDriverChange = (evt) =>{
    setNewDriver(evt.target.value)
  };

  const handleCustomerChange = (evt) =>{
    setNewCustomer(evt.target.value)
  };

  const handleAddressChange = (evt) =>{
    setNewAddress(evt.target.value)
  };

  const addTruckClick = (value) => {
    setOpen(false);
    setNewTruckOpen(true);
  };

  const addRequestClick = (value) => {
    setOpen(false);
    setNewRequestOpen(true)
  };



  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>local_shipping</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Trucks</p>
              <h3 className={classes.cardTitle}>
                49/50 <small>Trucks</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>person_pin_circle</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Requests</p>
              <h3 className={classes.cardTitle}>55</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last Hour
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Open Requests</p>
              <h3 className={classes.cardTitle}>3</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Current
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <CustomSkinMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAfMUg98vVDBASZkDzEf_6EHXO5fd-af90"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={dialogOpen}>
        <DialogTitle id="simple-dialog-title">Add new</DialogTitle>
        <DialogContent>
          <GridContainer justify='center'>
            <GridItem xs={12} sm={12} md={10} lg={8}>
              <Button
                fullWidth
                color="primary"
                onClick={addTruckClick}
              >
              Truck
              </Button>          
            </GridItem>
            <GridItem xs={12} sm={12} md={10} lg={8}>
              <Button
                fullWidth
                color="primary"
                onClick={addRequestClick}
              >
              Request
              </Button>          
            </GridItem>
            <GridItem xs={12} sm={12} md={10} lg={8}>
              <Button
                fullWidth
                color="primary"
                onClick={handleClose}
              >
              Cancel
              </Button>          
            </GridItem>
          </GridContainer>
          </DialogContent>
      </Dialog>
      <Dialog onClose={handleNewTruckClose} aria-labelledby="simple-dialog-title" open={newTruckDialogOpen}>
        <DialogTitle id="simple-dialog-title">Add new truck</DialogTitle>
        <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="plate"
              label="Plate"
              fullWidth
              onChange={handlePlateChange}
            />
            <TextField
              margin="dense"
              id="driver"
              label="Driver"
              fullWidth
              onChange={handleDriverChange}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewTruckClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addTruck} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog onClose={handleNewRequestClose} aria-labelledby="simple-dialog-title" open={newRequestDialogOpen}>
        <DialogTitle id="simple-dialog-title">Add new request</DialogTitle>
        <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="customer"
              label="Customer"
              fullWidth
              onChange={handleCustomerChange}
            />
            <TextField
              margin="dense"
              id="address"
              label="Address"
              fullWidth
              onChange={handleAddressChange}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addRequest} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog onClose={handleTruckDetailClose} aria-labelledby="simple-dialog-title" open={truckDetailDialogOpen}>
        <DialogTitle id="simple-dialog-title">Truck Detail</DialogTitle>
        <DialogContent>
          <p>Plate: {selectedTruck.plate}</p>
          <p>Driver: {selectedTruck.driver}</p>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={removeTruck}>
            Remove Truck
          </Button>
          <Button onClick={handleTruckDetailClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog onClose={handleRequestDetailClose} aria-labelledby="simple-dialog-title" open={requestDetailDialogOpen}>
        <DialogTitle id="simple-dialog-title">Truck Detail</DialogTitle>
        <DialogContent>
          <p>Customer: {selectedRequest.customer}</p>
          <p>Address: {selectedRequest.address}</p>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={assignNearestTruck}>
            Assign Nearest Truck
          </Button>
          <Button color="primary" onClick={removeRequest}>
            Remove Request
          </Button>
          <Button onClick={handleRequestDetailClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog onClose={handleAssignmentDialogClose} aria-labelledby="simple-dialog-title" open={truckAssignmentDialogOpen}>
        <DialogTitle id="simple-dialog-title">Assigned Truck</DialogTitle>
        <DialogContent>
          <p>Plate: {nearestTruck.plate}</p>
          <p>Driver: {nearestTruck.driver}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAssignmentDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default App

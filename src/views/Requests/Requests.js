import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import { API, graphqlOperation } from 'aws-amplify'
import { createTruck } from 'graphql/mutations'
import { listTrucks } from 'graphql/queries'
import { listRequests } from "graphql/queries";


const initialState = { plate: '', driver: '' }  

const App = () => {
  const [formState, setFormState] = useState(initialState)
  const [requests, setRequests] = useState([])

  useEffect(() => {
    fetchRequests()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchRequests() {
    try {
      const requestData = await API.graphql(graphqlOperation(listRequests))
      const requestList = requestData.data.listRequests.items
      const requests = requestList.map((request) => {
        delete request.id
        delete request.createdAt
        delete request.updatedAt
        delete request.lat
        delete request.lng
        return(Object.values(request))
      })
      setRequests(requests)
    } catch (err) { console.log('error fetching requests') }
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={styles.cardTitleWhite}>Requests</h4> 
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Customer", "Address", "Truck"]}
              tableData={requests}
              tableCols={['user','address','truck']}
              />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  )
}

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  container: { width: 400, margin: '0 auto', display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', padding: 20 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
};

export default App
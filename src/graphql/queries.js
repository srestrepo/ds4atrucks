/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTruck = /* GraphQL */ `
  query GetTruck($id: ID!) {
    getTruck(id: $id) {
      id
      plate
      driver
      lat
      lng
      available
      createdAt
      updatedAt
    }
  }
`;
export const listTrucks = /* GraphQL */ `
  query ListTrucks(
    $filter: ModelTruckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrucks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        plate
        driver
        lat
        lng
        available
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRequest = /* GraphQL */ `
  query GetRequest($id: ID!) {
    getRequest(id: $id) {
      id
      user
      address
      lat
      lng
      truck {
        id
        plate
        driver
        lat
        lng
        available
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listRequests = /* GraphQL */ `
  query ListRequests(
    $filter: ModelRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user
        address
        lat
        lng
        truck {
          id
          plate
          driver
          lat
          lng
          available
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

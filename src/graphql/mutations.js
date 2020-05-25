/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTruck = /* GraphQL */ `
  mutation CreateTruck(
    $input: CreateTruckInput!
    $condition: ModelTruckConditionInput
  ) {
    createTruck(input: $input, condition: $condition) {
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
export const updateTruck = /* GraphQL */ `
  mutation UpdateTruck(
    $input: UpdateTruckInput!
    $condition: ModelTruckConditionInput
  ) {
    updateTruck(input: $input, condition: $condition) {
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
export const deleteTruck = /* GraphQL */ `
  mutation DeleteTruck(
    $input: DeleteTruckInput!
    $condition: ModelTruckConditionInput
  ) {
    deleteTruck(input: $input, condition: $condition) {
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
export const createRequest = /* GraphQL */ `
  mutation CreateRequest(
    $input: CreateRequestInput!
    $condition: ModelRequestConditionInput
  ) {
    createRequest(input: $input, condition: $condition) {
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
export const updateRequest = /* GraphQL */ `
  mutation UpdateRequest(
    $input: UpdateRequestInput!
    $condition: ModelRequestConditionInput
  ) {
    updateRequest(input: $input, condition: $condition) {
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
export const deleteRequest = /* GraphQL */ `
  mutation DeleteRequest(
    $input: DeleteRequestInput!
    $condition: ModelRequestConditionInput
  ) {
    deleteRequest(input: $input, condition: $condition) {
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

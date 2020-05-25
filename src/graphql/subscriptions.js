/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTruck = /* GraphQL */ `
  subscription OnCreateTruck {
    onCreateTruck {
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
export const onUpdateTruck = /* GraphQL */ `
  subscription OnUpdateTruck {
    onUpdateTruck {
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
export const onDeleteTruck = /* GraphQL */ `
  subscription OnDeleteTruck {
    onDeleteTruck {
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
export const onCreateRequest = /* GraphQL */ `
  subscription OnCreateRequest {
    onCreateRequest {
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
export const onUpdateRequest = /* GraphQL */ `
  subscription OnUpdateRequest {
    onUpdateRequest {
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
export const onDeleteRequest = /* GraphQL */ `
  subscription OnDeleteRequest {
    onDeleteRequest {
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

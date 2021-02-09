/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const hello = /* GraphQL */ `
  query Hello {
    hello
  }
`;
export const getDetail = /* GraphQL */ `
  query GetDetail($symbol: String) {
    getDetail(symbol: $symbol)
  }
`;
export const getStock = /* GraphQL */ `
  query GetStock($id: ID!) {
    getStock(id: $id) {
      id
      symbol
      description
      createdAt
      updatedAt
    }
  }
`;
export const listStocks = /* GraphQL */ `
  query ListStocks(
    $filter: ModelStockFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStocks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        symbol
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

/* Amplify Params - DO NOT EDIT
	API_OBSIDOAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_OBSIDOAPP_GRAPHQLAPIIDOUTPUT
	API_OBSIDOAPP_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const axios = require("axios");
const gql = require("graphql-tag");
const graphql = require("graphql");
const { print } = graphql;

const createStock = gql`
  mutation createStock($input: CreateStockInput!) {
    createStock(input: $input) {
      id
      symbol
      description
      createdAt
      updatedAt
    }
  }
`;

const listStocks = gql`
  query listStocks {
    listStocks {
      items {
        id
        symbol
      }
    }
  }
`;

exports.handler = async (event) => {

  try {
    const current = await axios({
      url: process.env.API_OBSIDOAPP_GRAPHQLAPIENDPOINTOUTPUT,
      method: "post",
      headers: {
        "x-api-key": process.env.API_OBSIDOAPP_GRAPHQLAPIKEYOUTPUT,
      },
      data: {
        query: print(listStocks),
      },
    });

    if (
      current.data.data.listStocks.items.findIndex(
        (i) => i.symbol === event.arguments.symbol
      ) === -1
    ) {
      // Then we need to add this stock
      const create = await axios({
        url: process.env.API_OBSIDOAPP_GRAPHQLAPIENDPOINTOUTPUT,
        method: "post",
        headers: {
          "x-api-key": process.env.API_OBSIDOAPP_GRAPHQLAPIKEYOUTPUT,
        },
        data: {
          query: print(createStock),
          variables: {
            input: {
              symbol: event.arguments.symbol,
            },
          },
        },
      });

      return create.data.data.createStock;
    } else {
      // We say we already have this stock
      return "Stock already exists..."
    }
  } catch (err) {
    console.log("Error adding stock: ", err);
    return "Error adding stock ...";
  }
  return "Hello";
};

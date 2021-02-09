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

const listStocks = gql`
  query listStocks {
    listStocks {
      items {
        id
        symbol
        description
      }
    }
  }
`;

const updateStock = gql`
    mutation updateStock($input: UpdateStockInput!) {
        updateStock(input: $input) {
            id
            symbol
            description
            updatedAt
        }
    }
`

exports.handler = async (event, context) => {

  try {
    const graphqlData = await axios({
      url: process.env.API_OBSIDOAPP_GRAPHQLAPIENDPOINTOUTPUT,
      method: "post",
      headers: {
        "x-api-key": process.env.API_OBSIDOAPP_GRAPHQLAPIKEYOUTPUT,
      },
      data: {
        query: print(updateStock),
        variables: {
            input: {
                id: "c0c25e8e-4a3c-46d1-a0d0-ba84ca18936c",
                description: "Updated from lambda function :) !"
            }
        }
      },
    });

    console.log("Data is: ", graphqlData.data)
    return "Successfully updated!";
  } catch (err) {
    console.log("Error: ", err);
    return "Error getting data...";
  }
};

import { useState, useEffect } from "react";
import Head from "next/head";

import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import Amplify, { Auth, API, graphqlOperation } from "aws-amplify";

import awsconfig from "../src/aws-exports";
import { listStocks } from "../src/graphql/queries";
// import { createStock as CreateStock } from "../src/graphql/mutations";
import {
  addStock as AddStock,
  deleteStock as DeleteStock,
} from "../src/graphql/mutations";

import Overview from "../components/overview";
import Income from "../components/income";
import Balance from "../components/balance";
import Earnings from "../components/earnings";
import Cashflow from "../components/cashflow";

Amplify.configure(awsconfig);

// left off here: https://docs.amplify.aws/start/getting-started/data-model/q/integration/next#create-a-graphql-api-and-database

export default function Home() {
  const [symbol, setSymbol] = useState("CERN");
  const [search, setSearch] = useState("");
  const [stocks, setStocks] = useState([]);

  // async function getStocks() {
  //   const data = await API.graphql({ query: listStocks })
  //   console.log('Got stocks: ', data)
  // }
  useEffect(() => {
    getStocks();
  }, []);

  async function getStocks() {
    try {
      const data = await API.graphql(graphqlOperation(listStocks));
      setStocks(data.data.listStocks.items);
    } catch (err) {
      console.log("error fetching stocks ...", err);
    }
  }

  async function createStock() {
    try {
      console.log("Trying ...", search);
      const temp = await API.graphql(
        graphqlOperation(AddStock, {
          symbol: search,
        })
      );
      console.log("Temp is: ", temp);
      setStocks([...stocks, temp.data.addStock]);
    } catch (err) {
      console.log("error creating stock", err);
    }
  }

  async function deleteStock(id) {
    try {
      console.log("Deleting ...");
      const deleteItem = await API.graphql(
        graphqlOperation(DeleteStock, {
          input: {
            id: id,
          },
        })
      );
      setStocks(stocks.filter((stock) => stock.id !== id));
    } catch (err) {
      console.log("error deleting stock: ", err);
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Obsido</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <AmplifyAuthenticator>
          <AmplifySignOut />
          <form
            onSubmit={(e) => {
              createStock(search);
              setSearch("");
              e.preventDefault();
            }}
          >
            <label>
              Add stock:
              <input
                type="text"
                name="symbol"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <input type="submit" value="Add" />
          </form>
          <div>
            {stocks.map((stock) => (
              <div>
                <div>
                  <pre>{JSON.stringify(stock, null, 2)}</pre>
                </div>
                <button onClick={() => setSymbol(stock.symbol)}>
                  Get Details
                </button>
                <button onClick={() => deleteStock(stock.id)}>
                  Delete: {stock.symbol}
                </button>
              </div>
            ))}
          </div>
          <br />
          Looking @ {symbol}
          <div style={{ width: "900px" }}>
            <Overview symbol={symbol} />
            <Balance symbol={symbol} dev />
            <Income symbol={symbol} dev />
            {/* <Cashflow symbol={symbol} dev /> */}
            <Earnings symbol={symbol} dev />
          </div>
          {/* <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>

        <div className="grid">
          <a href="https://nextjs.org/docs" className="card">
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className="card">
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className="card"
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="card"
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */}
        </AmplifyAuthenticator>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

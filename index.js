const cors = require("cors");
const express = require("express");
const router = require("./router");
const errors = require('./helpers/error');
const Web3 = require('web3');

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", router);

//  Handle the sign process
app.get('/api/sign', async (req, res) => {
  try {
    // Check if MetaMask is installed and enabled
    if (typeof window.ethereum === 'undefined' || !window.ethereum.isMetaMask) {
      throw new Error('MetaMask not detected');
    }

    // Create a new Web3 instance using the MetaMask provider
    const web3 = new Web3(window.ethereum);

    // Request user account access
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const selectedAddress = accounts[0];

    // Sign a message
    const message = 'Example message to sign';
    const signature = await web3.eth.personal.sign(message, selectedAddress);

    // Handle the signature as needed
    console.log('Signature:', signature);

    res.send('Sign endpoint');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('An error occurred');
});

app.listen(8000, () => {
  console.log("Server started at port 8000");
});

app.use(errors);

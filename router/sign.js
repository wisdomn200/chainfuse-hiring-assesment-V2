const express = require('express');
const router = express.Router();
const detectProvider = require('@metamask/detect-provider');

router.get('/', async (req, res) => {
  try {
    const provider = await detectProvider.detect();
    if (!provider) {
      throw new Error('MetaMask not detected');
    }

    // Handle user account selection and signing here

    res.send('Sign endpoint');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

module.exports = router;

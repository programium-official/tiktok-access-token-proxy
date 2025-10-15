import express from 'express'
import fetch from 'node-fetch'

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const TIKTOK_ACCESS_TOKEN_ENDPOINT = 'https://open.tiktokapis.com/v2/oauth/token/';
const PORT = 3333; // Assuming 'app' is your initialized express app

/**
 * This endpoint proxies a request to the TikTok OAuth token endpoint.
 * It takes the client_id, client_secret, and code from the incoming request's body,
 * and securely forwards them in the body of a POST request to TikTok.
 */
app.post('/proxy/token', async (req, res) => {
  // Use URLSearchParams to properly format the body for 'application/x-www-form-urlencoded'.
  const bodyParams = new URLSearchParams({
    client_key: req.body.client_id,
    client_secret: req.body.client_secret,
    code: req.body.code,
    grant_type: 'authorization_code',
    redirect_uri: req.body.redirect_uri, // Added redirect_uri from the curl command
  });

  try {
    console.log("Sending POST request to TikTok with body:", bodyParams.toString());


    const response = await fetch(TIKTOK_ACCESS_TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache',
      },
      body: bodyParams,
    });

    const data = await response.json();

    // Check for a successful response from TikTok before sending data to the client.
    if (response.ok && data) {
      res.json(data);
    } else {
      // Forward the error details from TikTok's API to the client.
      res.status(data.error?.code || 500).json({
        message: data.error?.message || 'An unknown error occurred while fetching the token.',
        log_id: data.error?.log_id,
      });
    }
  } catch (error) {
    console.error('Error proxying token request:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

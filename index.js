const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { GoogleAuth } = require('google-auth-library');
const app = express();

dotenv.config();
app.use(cors());

const serviceAccount = {
  type: "service_account",
  project_id: process.env.PROJECT_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'), // Replace escaped newlines
  client_email: process.env.CLIENT_EMAIL,
};

const serviceAccount2 = {
  type: "service_account",
  project_id: process.env.PROJECT_ID2,
  private_key: process.env.PRIVATE_KEY2.replace(/\\n/g, '\n'), // Replace escaped newlines
  client_email: process.env.CLIENT_EMAIL2,
};

app.get('/generate-token', async (req, res) => {
  try {
    const auth = new GoogleAuth({
      credentials: serviceAccount,
      scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
    });

    const client = await auth.getClient();
    const token = await client.getAccessToken();

    res.json({ token: token.token });
  } catch (error) {
    console.error('Error generating Bearer Token:', error.message);
    res.status(500).json({ error: 'Failed to generate Bearer Token' });
  }
});

app.get('/generate-token-agent', async (req, res) => {
  try {
    const auth = new GoogleAuth({
      credentials: serviceAccount2,
      scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
    });

    const client = await auth.getClient();
    const token = await client.getAccessToken();

    res.json({ token: token.token });
  } catch (error) {
    console.error('Error generating Bearer Token:', error.message);
    res.status(500).json({ error: 'Failed to generate Bearer Token' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

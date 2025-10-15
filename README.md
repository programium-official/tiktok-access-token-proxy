# TikTok Access Token Proxy

This is an example code snippet for proxying the access token endpoints for TikTok.
## Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0
- TikTok Developer Account with registered app

## Installation

1. Clone the repository:

```bash
git clone https://github.com/programium-official/tiktok-access-token-proxy.git
cd tiktok-access-token-proxy
```

2. Install dependencies:

```bash
npm install
```

## Usage

### Development

Start the development server with auto-reload:

```bash
npm run dev
```
The server will start on port `3333` by default.

## API Endpoint

### POST `/proxy/token`

Proxies a request to TikTok's OAuth token endpoint to exchange an authorization code for an access token.

**Request Body:**

```json
{
  "client_id": "your_tiktok_app_client_id",
  "client_secret": "your_tiktok_app_client_secret",
  "code": "authorization_code_from_tiktok",
  "redirect_uri": "your_registered_redirect_uri"
}
```

**Response:**
Returns the response from TikTok's OAuth API, which typically includes:

```json
{
  "access_token": "user_access_token",
  "token_type": "Bearer",
  "expires_in": 86400,
  "refresh_token": "refresh_token",
  "scope": "user.info.basic" //You can ask for more scopes here
}
```

## Documentation

For more information about TikTok's OAuth implementation, refer to the official documentation:

- [TikTok OAuth User Access Token Management](https://developers.tiktok.com/doc/oauth-user-access-token-management)
- [TikTok for Developers](https://developers.tiktok.com/)

## About

Developed by [Programium P.C.](https://github.com/programium-official)

---

⚠️ **Note**: This is a proxy server designed for development and testing purposes. Ensure proper security measures are implemented before using in production environments.

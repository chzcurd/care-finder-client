# Care Finder Client

Created by Josh Osmanski

## How to install

First, install node.js 16 or newer, then:

```bash
npm install
```

## Getting Started

Running server in production or for demo:

```bash
npm run build
npm run start
```

Run the development server using:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Routes

Key

- /api/key/get Generate key from server
- /api/key/create/var/5/5 Tell server to use key (Really should be done in /api/key/get)

Get Hospitals

'x-api-key' header needed for these requests

- /api/hospitals Get all hospitals
- /api/hospitals/id/var Get a hospital based on its unique identifier
- /api/hospitals/city/var Get a hospital based on city name
- /api/hospitals/state/var Get a hospital based on state name
- /api/hospitals/county/var Get a hospital based on county name
- /api/hospitals/citystate/var/var Get a hospital based on city/state name combination
- /api/hospitals/name/var Get a hospital based on the hospital's name

```

```

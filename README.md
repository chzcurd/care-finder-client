# Care Finder Client

Made by Josh Osmanski

## How to install

1. Have node.js installed
2. Run 'npm install'

## Getting Started

First, run the development server:

```bash
npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

```

## Routes

Key

- /api/key/get Generate key from server
- /api/key/create/var/5/5 Tell server to use key (Really should be done in /api/key/get)

Get Hospitals

- /api/hospitals Get all hospitals
- /api/hospitals/id/var Get a hospital based on its unique identifier
- /api/hospitals/city/var Get a hospital based on city name
- /api/hospitals/state/var Get a hospital based on state name
- /api/hospitals/county/var Get a hospital based on county name
- /api/hospitals/citystate/var/var Get a hospital based on city/state name combination
- /api/hospitals/name/var Get a hospital based on the hospital's name

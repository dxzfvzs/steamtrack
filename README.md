# Next.js SteamTrack

This is a Next.js application that tracks and counts only Steam achievements that contribute to global stats on a Steam
profile, excluding non-valuable achievements.

## Requirements

- [Node.js](https://nodejs.org/) (>= v16.x.x)
- [npm](https://www.npmjs.com/) (>= v8.x.x)

## Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/dxzfvzs/steamtrack.git
   cd steamtrack
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your Steam API key:
    - Go to the [Steam API key page](https://steamcommunity.com/dev/apikey) to generate your API key.
    - Create a `.env` file in the root of your project, and add your Steam API key:
      ```env
      STEAM_API_KEY=your_steam_api_key_here
      ```

## Running the Project

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and visit [http://localhost:3000](http://localhost:3000) to start using the app.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.

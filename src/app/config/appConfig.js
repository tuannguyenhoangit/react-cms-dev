// @flow weak

export const appConfig = {
  // dev mode to mock async data for instance
  DEV_MODE: true,
  // When you need some kind "console spam" to debug
  DEBUG_ENABLED: true,
  // fake delay to mock async
  FAKE_ASYNC_DELAY: 1000,


  APP_NAME: 'reactDirector',

  // connection status text references
  CONNECTION_STATUS: {
    online: 'online',
    disconnected: 'disconnected'
  },
  // eaningGraph config
  earningGraph: {
    data: {
      API: 'api/earnigGraphData'
    }
  },
  teamMates: {
    data: {
      API: 'api/teamMates'
    }
  },
  events: {
    data: {
      API: 'Event'
    },
    update: {
      API: 'Event/'
    },
    insert: {
      API: 'Event'
    }
  },

  // userInfos config
  userInfos: {
    data: {
      API: 'api/userInfos'
    }
  },

  HELLO_WORD: 'Hello',

  // SERVER_API: 'http://localhost:3000/api'
  SERVER_API: '103.1.237.204:3000/api'

};

import {
  Bot,
  BotConfig,
  getAuthTokenWithPrivateKey,
} from '@momentum-xyz/bot-sdk';

// const worldId = '00000000-0000-8000-8000-000000000023';
// const objectName = 'twijgen stoel';
const [worldId, objectName] = process.argv.slice(2);

// Set private key from environment variable if you want to connect as User, otherwise connect as Guest
const privateKey = process.env['BOT_SDK_PRIVATE_KEY'];

let onTheMove = false;
let userId = '';

const config: BotConfig = {
  worldId,
  backendUrl: 'https://play.odyssey.org',

  onObjectAdded: (object) => {
    if (!onTheMove && object.name.toLowerCase().includes(objectName)) {
      console.log('!!!!Object found!!!!', object);
      onTheMove = true;

      bot.moveUser({
        position: {
          x: object.transform.position.x + 1,
          y: object.transform.position.y,
          z: object.transform.position.z,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
      });
      setTimeout(() => {
        if (userId) {
          bot.sendHighFive(userId, `Found ${object.name}!}`);
        }
        onTheMove = false;
      }, 10000);
    }
  },

  onUserAdded: (user) => {
    console.log('User added!', user);
    userId = user.id;
  },

  onHighFive: (userId, message) => {
    console.log('Received High five!', userId, message);
  },

  // uncomment these if needed, check the docs for more
  // onConnected: (userId) => {
  //   console.log('Connected, my user ID:', userId);
  // },
  // onDisconnected: () => {
  //   console.log('Disconnected!');
  // },
  // onJoinedWorld: (data) => {
  //   console.log('Joined world!', data);
  // },
};

const bot = new Bot(config);

if (privateKey) {
  console.log('Private key passed. Get the auth token...');
  getAuthTokenWithPrivateKey(privateKey)
    .then((token) => {
      console.log('Connect with auth token...', token);
      bot.connect(token);
    })
    .catch((err) => {
      console.error('Failed to get auth token', err);
      process.exit(1);
    });
} else {
  console.log('No private key passed. Connect as guest...');
  bot.connect();
}

// Read the docs on https://github.com/momentum-xyz/bot-sdk-nodejs/tree/main/example
// Get more examples on https://github.com/momentum-xyz/bot-sdk-nodejs

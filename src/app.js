const app = require('./routes');
require('dotenv').config();

app.listen(process.env.PORT_APP, () => console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊"));

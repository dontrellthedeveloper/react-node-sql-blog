const express = require("express");
const app = express();
const cors = require('cors')
const mysql = require('mysql');
require("dotenv").config();


app.use(cors());

// app.use(cors({
//     origin: '*'
// }))
app.use(express.json());

// const whitelist = ["https://react-node-sql-blog.dontrelldev.com"]
// const corsOptions = {
//     origin: function (origin, callback) {
//         if (!origin || whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error("Not allowed by CORS"))
//         }
//     },
//     credentials: true,
// }
// app.use(cors(corsOptions))

// app.use((req,res,next)=>{
//     res.setHeader('Access-Control-Allow-Origin','*');
//     res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
//     res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
//     next();
// })

// const db = require("./models");

// Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter)


const db = mysql.createPool({
    user: 'b4ce6239d76248',
    host: 'us-cdbr-east-06.cleardb.net',
    password: 'e0aab952',
    // password: process.env.SQL_SERVER_DB_PASSWORD,
    database: 'heroku_f19f4b01fcda7ac'
})




let connection;

function handleDisconnect() {
    connection = mysql.createConnection(db); // Recreate the connection, since
    // the old one cannot be reused.

    connection.connect(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();


//static Images Folder

app.use('/Images', express.static('./Images'))



// db.sequelize
//     .sync()
//     .then(() => {
//         // const PORT = process.env.PORT || 3005;
//         // app.listen(PORT);
//         app.listen(process.env.PORT || 3001, () => {
//             console.log("Server running on port 3001");
//         });
//     })
//     .catch((e) => {
//         console.log(e)
//     });


const PORT = process.env.PORT || 3001;
app.listen(PORT);

const express = require('express'); //Line 1
const app = express(); //Line 2
var cors = require('cors')
app.use(cors())
const port = process.env.PORT || 5000; //Line 3


var sqlite3 = require('sqlite3').verbose()
const DBSOURCE = "database.sqlite"



// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/api', (req, res) => { //Line 9
  let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message)
    throw err
  }else{
      console.log('Connected to the SQLite database.')
      var sql = "select * from university"
      var params = []
      db.all(sql, params, (err, rows) => {
          if (err) {
            res.status(400).json({"error":err.message});
            return;
          }
          res.json(
              rows
          )
        });
  }
});
}); //Line 11
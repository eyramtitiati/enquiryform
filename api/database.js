var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

const CREATE_LEADS = `
    CREATE TABLE inbound_leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, 
        email TEXT,
        phone TEXT,
        address TEXT,
        city TEXT,
        state TEXT,
        zip_code TEXT,
        equipment_type TEXT,
        description TEXT,
        estimated_value INTEGER
    )
`

const CREATE_DEPARTMENTS = `
    CREATE TABLE departments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, 
        email TEXT
    );
`

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(CREATE_LEADS,
            (err) => {
                if (err) {
                    // Table already created
                    console.log(`Using previously created leads table (in ${DBSOURCE})`)
                } else {
                    db.run(CREATE_DEPARTMENTS, 
                        (err) => {
                            if (err) {
                                // Table already created
                            } else {
                                // Table just created, creating some rows
                                var insert = 'INSERT INTO departments (name, email) VALUES (?,?)'
                                db.run(insert, ["Customer Service","support@example.com"])
                                db.run(insert, ["Sales","sales@example.com"])
                                db.run(insert, ["Listing Operations","listing@example.com"])
                                db.run(insert, ["Tech Support","tech@example.com"])
                            }
                        });
                }
            });
    }  
});


module.exports = db

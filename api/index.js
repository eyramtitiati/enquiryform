const path = require('path');
const express = require("express");

const db = require("./database.js");

const PORT = process.env.PORT || 3001;

const app = express();

//app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.json());


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get("/api/info", (req, res) => {
    res.json({ service: "Test API", version: "1.0.0" });
});

const EQUIPMENT_TYPES = [
    "Heavy/Construction Equipment", 
    "AG Equipment",
    "Vehicle",
    "Other"
];

app.get("/api/equipment_types", (req, res) => {
    res.json(EQUIPMENT_TYPES);
});

app.get("/api/departments", (req, res) => {
    db.all("SELECT * from departments", [], function(err, rows) {
        if (err) {
            res.status(400).json({"error": err.message})
        } else {
            res.json(rows)
        }
    })
});

// saving inquiry details
app.get('/api/inquiries', (req, res) => {
  db.all('SELECT * FROM inbound_leads', [], (err, rows) => {
    if (err) {
      console.error('Error fetching inquiries:', err.message);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(rows);
    }
  });
});

// Get a single inquiry by ID
app.get('/api/inquiries/:id', (req, res) => {
  const id = req.params.id;

  db.get('SELECT * FROM inbound_leads WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Error fetching inquiry:', err.message);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (row) {
        res.json(row);
      } else {
        res.status(404).json({ error: 'Inquiry not found' });
      }
    }
  });
});


app.post('/api/inquiries', (req, res) => {
  const newInquiry = req.body;
  const { name, email, phone, address, city, state, zipCode, equipmentType, description, estimatedValue } = newInquiry;

  const query = `INSERT INTO inbound_leads (name, email, phone, address, city, state, zip_code, equipment_type, description, estimated_value) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [name, email, phone, address, city, state, zipCode, equipmentType, description, estimatedValue];

  db.run(query, values, function(err) {
    if (err) {
      console.error('Error saving inquiry:', err.message);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ message: 'Inquiry saved successfully!' });
    }
  });
});


app.put('/api/inquiries/:id', (req, res) => {
  const id = req.params.id;
  const updatedInquiry = req.body;

  const sql = `
    UPDATE inbound_leads
    SET name = ?,
        email = ?,
        phone = ?,
        address = ?,
        city = ?,
        state = ?,
        zip_code = ?,
        equipment_type = ?,
        description = ?,
        estimated_value = ?
    WHERE id = ?;
  `;

  const values = [
    updatedInquiry.name,
    updatedInquiry.email,
    updatedInquiry.phone,
    updatedInquiry.address,
    updatedInquiry.city,
    updatedInquiry.state,
    updatedInquiry.zip_code,
    updatedInquiry.equipment_type,
    updatedInquiry.description,
    updatedInquiry.estimated_value,
    id,
  ];

  db.run(sql, values, (err) => {
    if (err) {
      console.error('Error updating inquiry:', err.message);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ message: 'Inquiry updated successfully!' });
    }
  });
});



// Delete an inquiry by ID
app.delete('/api/inquiries/:id', (req, res) => {
  const id = req.params.id;

  db.run('DELETE FROM inbound_leads WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Error deleting inquiry:', err.message);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ message: 'Inquiry deleted successfully!' });
    }
  });
});

  
  
// This needs to be the last route defined so that it does not
// block the other defined routes since it is a wildcard match.
//app.get('*', (req, res) => {
//    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
//});

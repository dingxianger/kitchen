const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
require('dotenv').config();

const bcryptSalt = bcrypt.genSaltSync(10); 
const jwtSecret = 'fasfji40dhvci4&*cda90f@dja';

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}));
app.use('/uploads', express.static(__dirname+'/uploads'));

mongoose.connect(process.env.MONGO_URL);

app.post('/register', async (req, res) => {
  const {name, email, password} = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json;
  }
});

app.post('/login', async (req, res) => {
  const {email, password} = req.body;
  const userDoc = await User.findOne({email: email});
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      // sign cookie with
      jwt.sign({
        email: userDoc.email, 
        id: userDoc._id
      }, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json(userDoc);
      });
    } else {
      res.status(422).json('pass not ok');
    }
  } else {
    res.json('not found');
  }
});

app.get('/profile', (req, res) => {
  const {token} = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const {name, email, _id} = await User.findById(userData.id);
      res.json({name, email, _id});
    });
  } else {
    res.json(null);
  }
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true);
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory to store uploaded files
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
    cb(null, filename); // Unique filename
  }
});

const upload = multer({ storage: storage });
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // File information
  const file = req.file;
  const fileUrl = `http://localhost:4000/uploads/${file.filename}`;
  res.json({ imageUrl: fileUrl });
});

app.post('/recipes', (req, res) => {
  console.log("post recipe called")
  const { token } = req.cookies;
  const {
    title,
    coverImage,
    ingredients,
    instructions
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    try {
      const recipeDoc = await Recipe.create({
        owner: userData.id,
        title,
        coverImage, 
        ingredients, 
        instructions
      });
      res.json(recipeDoc);
    } catch (error) {
      res.status(500).json({ error: 'Error creating recipe' });
    }
  });
});



app.listen(4000);
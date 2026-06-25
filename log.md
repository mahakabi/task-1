# Common Practices for Express

## Code Order

// Third-party middleware
app.use(morgan('dev'));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static('public'));

// Custom middleware
app.use(requestLogger);

// Routers
app.use('/users', usersRouter);

// Routes
app.get(...);

// Error middleware
app.use((err, req, res, next) => {
    ...
});

// Server start
app.listen(...);

## Response Methods

res.send()
res.json()
res.status()
res.redirect()
res.sendFile()
res.resnder()

## Project Structures
project/
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── routes/
│   └── users.js
│
├── views/
│   ├── pages/
│   └── partials/
│
├── index.js
└── package.json

## Errors

### Typical Error Flow
Route
↓
Error Created
↓
next(error)
↓
Error Middleware
↓
Response
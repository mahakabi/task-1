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

- res.send()
- res.json()
- res.status()
- res.redirect()
- res.sendFile()
- res.resnder()

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

## Environment

### Common Variables
- PORT
- NODE_ENV
- DEBUG
- DATABASE_URL
- API_KEY
- JWT_SECRET

Example:
const port = process.env.PORT || 3000;

## Debugging

### Debug Checklist
1. Did the request arrive?
2. Did middleware execute?
3. Did the route execute?
4. Was req.body correct?
5. Did an error occur?
6. Did the error middleware run?

### Use Debugging to Answer These
- Did the request arrive?
- Did middleware run?
- Did the route run?
- Did the data look correct?
- Did an error occur?
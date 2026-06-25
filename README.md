

<!-- Maha was here -->

<!-- Hamzah was here -->

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
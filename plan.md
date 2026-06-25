1. Routing
1.1 Basic Routes
	•	GET
	•	POST
	•	PUT
	•	DELETE
1.2 Route Paths
	•	Strings
	•	Route patterns
	•	Regular expressions
1.3 Route Parameters
	•	req.params
	•	Dynamic URLs
1.4 Route Handlers
	•	Single callback
	•	Multiple callbacks
	•	next()
1.5 Response Methods
	•	res.send()
	•	res.json()
	•	res.sendFile()
	•	res.redirect()
	•	res.status()
1.6 Express Router
	•	Creating routers
	•	Mounting routers
	•	Modular routes

⸻

2. Writing Middleware
2.1 Middleware Fundamentals
	•	What middleware is
	•	Request lifecycle
2.2 Middleware Function Structure
	•	req
	•	res
	•	next
2.3 Creating Custom Middleware
	•	Logging middleware
	•	Validation middleware
2.4 Using
next()
	•	Passing control
	•	Common mistakes
2.5 Error Middleware
	•	Error-first middleware
	•	Handling exceptions

⸻

3. Using Middleware
3.1 Application-Level Middleware
	•	app.use()
	•	Route-specific middleware
3.2 Built-in Middleware
	•	express.json()
	•	express.urlencoded()
	•	express.static()
3.3 Third-Party Middleware
	•	Installing packages
	•	Common examples
3.4 Router-Level Middleware
	•	Middleware inside routers
3.5 Middleware Execution Order
	•	Request flow
	•	Importance of order

⸻

4. Using Template Engines
4.1 What Template Engines Are
4.2 Configuring a Template Engine
4.3 Rendering Views
4.4 Passing Data to Views
4.5 View Directory Structure

⸻

5. Error Handling
5.1 Basic Error Handling
5.2 Error Middleware
5.3 Handling Async Errors
5.4 Custom Error Responses
5.5 Production vs Development Errors

⸻

6. Debugging
6.1 Debug Module
6.2 Running Debug Mode
6.3 Reading Debug Output
6.4 Common Debugging Workflows

⸻

7. Behind Proxies
7.1 What a Proxy Is
7.2 Trust Proxy Setting
7.3 Client IP Addresses
7.4 HTTPS Behind Proxies
7.5 Deployment Considerations

⸻

8. Database Integration
8.1 Database Concepts
8.2 Connecting to a Database
8.3 Organizing Database Code
8.4 CRUD Operations
8.5 Connection Management
8.6 Environment Variables

⸻

9. Overriding the Express API
9.1 Extending Request Objects
9.2 Extending Response Objects
9.3 Custom Methods
9.4 When to Override
9.5 Risks and Best Practices

DONE
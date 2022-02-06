# Cars-app home assignment

This app is built with React and node.js to handle a car selection process. 

# Main issues

The server attached to this assignment holds json files as mock-dbs to fetch data from, and 
describes the endpoints from which this data can be fecthed, using HTTP protocol. 

The above-mentioned json files hold numerous results for 3 different queries of makes, models
and vehicles, which brings upon 2 main issues:
1. There is a big amount of data, hence it is better to make the requests as minimal as possible,
so as not to overload the front-end with too much data and too many requests. 

- In order to address this, the server doesn't respond with the full array of results (strings, objects) but rather limits the response size according to its relevance, either accepting a search
term to filter with or pagination values to send a more lean and relevant response back to the front-end. By doing this, the server handles the heavier part of the request-response cycle, allowing the front end to stay fast and performant, and handling only the data that's needed. 

2. Though all 3 requests respond with the data in full, not all requests actually result with valid data and in some cases an empty response will return. This means the front-end has to be notified about this from the server and in turn notify the end-user that a certain selected car manufacturer doesn't have a corresponding car model, or that a certain model doesn't have any actual available vehicles and so on.

- To handle this case, the front end checks the response that was received and raises a friendly message to the user, stating the problem and letting the user search again or click another model and so on.  

3. The given server would sometimes return an error, which is unavoidable but needs to be handled with retry attempts. If the retries fail as well, once again the front end needs to notify the end-user about this. 

- This problem is integral in any system that communicates with external services, as we don't have full control of what can go wrong at times. The retry mechanism mentioned above was implemented in order to try another request. If 3 attempts still failed and the request still yields an error, a modal stops the app's flow to notify the end-user that unfortunately somethings has gone wrong and they must try the same action again. 

# General notes

1. Both desktop and mobile views were taken under consideration during development. Since some components shared CSS attributes, a main file to draw styles from was put in place, so as to not repeat code, keep styling consistency throughout the app and to quickly find solutions for future considerations. 


2. This project was boostrapped through the create-react-app project which provides a starting point for React apps. While it does come with a few external libraries, while developing it was attempted to integrate external libraries into the project only if there are grounds for it. 

For example, `axios` was brought in to handle the request-response cycle, as this sort of actions are the building blocks of every event-driven app and will be used numerous times. Likewise, the `react-router-dom` package was selected to handle routing in the app, as that action is essential to the flow that was chosen. 

In contrast to that, other libraries were avoided since the use of them was thought as one-time or a mere convenience. Instead, helper functions were put in place to address these cases and keep the app as lean and fast as possible. 

In addition, it's worth noting that the node server is handling requests through `express`. 

# Running this project

- A shell script was written to run the instances. In order to run, when on the root of the project's file tree, please run:
`./init.sh`

You should be able to access the app on `localhost:3000`

The node.js server runs on port 8081. 
If needed to be run independently, please run: 

1. `cd server`
2. `node index.js`





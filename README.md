# React Rest DOM

This library allows to make requests to Rest APIs and render them easily in the DOM. It also allows rendering components in case there is an error and another while the request is loading.

## ToDo

- [x] Rest context.
- [x] Rest client.  
- [x] Authentication.
- [x] Error handler.
- [x] Loading handler.
- [x] Data handler. 
- [ ] Error with Data handler.
- [ ] Cache.

## How to use

### 1. Context

In order to use the library you must first create an execution context which will specify the URL of the API.

```javascript
// index.js
import { RestContext } from "react-rest-dom";

ReactDOM.render(
  <React.StrictMode>
    <RestContext.Provider url="https://jsonplaceholder.typicode.com/" >
      <App />
    </RestContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

### 2. Authentication

In case of requiring authentication in the requests, it can be specified in the context.

```javascript
// index.js
import { RestContext } from "react-rest-dom";

const authFactory = () => {
  const token = localStorage.getItem("token");
  return token ? "Bearer " + token : null;
};

ReactDOM.render(
  <React.StrictMode>
    <RestContext.Provider 
      url="https://jsonplaceholder.typicode.com/" 
      auth={authFactory}
     >
      <App />
    </RestContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

### 3. GET Request

Here is an example of how to make a GET request to an endpoint, in this case to "/todos" (from the API which url we have specified in the context)

```javascript
// App.js or any component
import { RequestRenderer } from "react-rest-dom";

function App() {
  return (
    <RequestRenderer
      path="/todos"  // Slash (/) at the start is optional.
      onData={(data, statusCode /* Example: 200, 201, 400, 404, 500... */) =>
        data.map((item, index) => {
          return (
            <div id={index}>
              ID: {item.id} <br />
              Title: {item.title} <br />
              Completed: {item.completed}
              <hr />
            </div>
          );
        })
      }
    />
  );
}
```

### 4. POST Request

We can make a POST request declaring the method as a property of the component, we can do the same with the Body.

```javascript
<RequestRenderer
  path="/todos"
  method="POST" // Can be any valid method, like PUT, PATCH, DELETE...
  body={{ yourBody: "content" }}
  onData={...}
/>;

```

### 5. Custom Headers

You can declare custom headers to send on request by passing them in the "headers" property in the component.

```javascript
<RequestRenderer
  path="/todos"
  headers={{ myHeader: "Your Value" }}
  onData={...}
/>;
```

### 6. Loading Handling

You can render a component while the request is loading, for example a text, an animation or any type of component.

```javascript
<RequestRenderer
  path="/todos"
  headers={{ myHeader: "Your Value" }}
  onLoading={() => (
    <h1>Loading...</h1>
  )}
  onData={...}
/>;
```

### 7. Error Handling

You can also render a component in case there is some kind of error when sending the request.

```javascript
<RequestRenderer
  path="/todos"
  headers={{ myHeader: "Your Value" }}
  onError={(e) => (
    <h1>Error: { e.toString() } </h1>
  )}
  onData={...}
/>;
```

## Contribute

I made this library to manage my projects so it is not well developed but it does the job. If you think it can improve, I invite you to create a pull request so we all benefit.  

If you want to donate to the project you can do it through [PayPal](https://paypal.me/sammwy).

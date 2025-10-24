# hello-express-ts

```shell
npm install
npm start
```

## CRUD operations through a REST interface

### Create

```shell
# curl --json defaults to the POST method
curl -v --json '{"name":"Hello"}' http://localhost:8000/customer

```
### Retrieve

```shell
# Retrieve all customers
curl http://localhost:8000/customer

# Retrieve a single customer
curl http://localhost:8000/customer/1
```

### Update

```shell
curl -v -X PUT --json '{"name":"Hello1"}' http://localhost:8000/customer/1

```

### Delete

```shell
curl -v -X DELETE http://localhost:8000/customer/1

```

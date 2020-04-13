# DSR
Node based Restful API for Daily Status Reporting App.

### Installation Steps:

1. Clone repository
2. npm install
3. npm start

### API Doc:

1. GET all data
`http://localhost/api/dsr`

2. GET data by Id
`http://localhost/api/dsr/_Id`

3. POST new DSR
```json
{
  "rsrc": "John Doe",
  "tid": "ABC-100",
  "ttitle": "Login Module",
  "status": "Completed",
  "comments": "Deployed to Production",
  "ts": "2020-04-02"
}
```

4. Replace existing DSR:
```json
{
  "_id": "dsrId",
  "rsrc": "John Miller",
  "tid": "ABC-101",
  "ttitle": "Login Module Beta",
  "status": "Completed",
  "comments": "Deployed to Production",
  "ts": "2020-04-02"
}
```

5. PATCH DSR
```json
{
   "_id": "dsrId",
  "rsrc": "John Doe",
}
```

6. DELETE DSR by ID
```json
{
   "_id": "dsrId"
}
```

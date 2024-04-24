# api.freepethealth.com

## Installation

### System requirements

* Docker
* Git

```shell
# Clone repository
git clone git@github.com:ejarnutowski/api.freepethealth.com.git

# Change directory to repository
cd api.freepethealth.com

# Start Docker container
docker compose up
```

### Usage

Test from a browser at: http://localhost:3000

### User Endpoints

#### Create User

POST /user
```
# BODY
{
  "name": "Fritz Wetherbee"
}
```

#### Get All Pets

GET /pets
```
# HEADER
"x-user-id": "{YOUR DB USER ID}"
```

#### Create One Pet

POST /pets
```
# HEADER
"x-user-id": "{YOUR DB USER ID}"

# BODY
{
  "name": "Rover",
  "type": "Dog",
  "dateOfBirth": "2022-12-12"
}
```

#### Get One Pet

GET /pets/:id
```
# HEADER
"x-user-id": "{YOUR DB USER ID}"
```

#### Get All Pet Records

GET /pets/:id/records
```
# HEADER
"x-user-id": "{YOUR DB USER ID}"
```

#### Create One Pet Record

POST /pets/:id/records
```
# HEADER
"x-user-id": "{YOUR DB USER ID}"

# BODY
{
  "type": "Allergy",
  "details": {
    "name": "Pollen",
    "reactions": [
      {
        "name": "Hives",
        "severity": "Mild"
      }
    ]
  }
}
```

### Admin Endpoints

#### Get All Pets

GET /admin/pets
```
# HEADER
"x-user-id": "{YOUR DB USER ID}"
```

#### Get One Pet

GET /admin/pets/:id
```
# HEADER
"x-user-id": "{YOUR DB USER ID}"
```

#### Get All Pet Records

GET /admin/pets/:id/records
```
# HEADER
"x-user-id": "{YOUR DB USER ID}"
```

#### Purge Data

> :warning: **WARNING:** THIS WILL DELETE ALL DATABASE DATA

POST /admin/purge-data
```
# HEADER
"x-user-id": "{YOUR DB USER ID}"

# BODY
{
  "confirm": true
}
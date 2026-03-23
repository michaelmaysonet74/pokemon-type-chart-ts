# pokemon-type-chart-ts

Microservice for retrieving Pokémon type effectiveness chart.

## Getting Started

### Requirements

- Bun `v1.3.11`

### Usage

Install dependencies:

```sh
bun install
```

Start the server:

```sh
bun run dev
```

Send a POST request to `/pokemon/effectiveness` with a JSON body:

```json
{
   "pokemon": {
     "name": "Dragonite",
     "types": [
        "Dragon",
        "Flying"
     ]
   }
}
```

Example using `curl`:

```sh
curl -X POST http://localhost:4001/pokemon/effectiveness \
  -H "Content-Type: application/json" \
  -d '{"pokemon": {"name": "Dragonite", "types": ["Dragon", "Flying"]}}'
```

### Docker

If you prefer to run this service in a Docker container, you can do so by following these steps:

Build the Docker image:
```sh
docker build -t pokemon-type-chart-ts .
```

Run the Docker container:
```sh
docker run -p 4001:4001 pokemon-type-chart-ts
```

### API

- **POST /pokemon/effectiveness**

    Request body:
    ```json
    {
        "pokemon": {
            "name": "string",
            "types": ["string"]
        }
    }
    ```
    Response:
    ```json
    {
        "pokemon": {
            "name": "string",
            "types": ["string"]
        },
        "effectiveness": {
            "weaknesses": ["string"],
            "resitances": ["string"],
            "immunities": ["string"]
        }
    }
    ```

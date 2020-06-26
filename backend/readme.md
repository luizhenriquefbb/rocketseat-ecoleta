# E-coleta

# Description

# Notes related to Typescript

- install dependencies
```sh
yarn add -D ts-node ts-node-dev typescript
```

-  create `tsconfig.json`
```sh
npx tsc --init
```

# Notes related to database

- Using sqLite3 but with knex, so we can change to any relational database

- migrations
    - create a Migrations (file with timestamp and default functions)
    ```sh
    npx knex migrate:make <migration_name>
    ```

    - execute migrations
    ```sh
    npx knex migrate:latest
    ```

    - populate default database
    ```sh
    npx knex seed:run
    ```

- database structure
    - points
        - table
            - id
            - image
            - name
            - email
            - whatsapp
            - latitude
            - longitude
            - city
            - UF
    - items
        - table
            - id
            - image
            - title
    - point_items
        - relation between `points` and `items`
        - table
            - points_id
            - items_id
# Activity Evidence: Products REST API

## Point 1: General query and query by ID
General query of active products:
![General query](./capturas/consulta.png)

Specific query by ID:
![Query by ID](./capturas/consID.png)

## Point 2: Product creation
A new product was inserted returning a 201 status.
![Product creation](./capturas/creacion.png)

## Point 3: Complete update and price change
Product price update (PATCH):
![Price change](./capturas/preciomod.png)

## Point 4: Logical deletion of the product
The active status was changed to false instead of deleting the record.
![Logical deletion](./capturas/baja.png)

## Point 5: Logical deletion verification
Verification that the deleted product no longer appears in getAll query:
![Verification getAll](./capturas/comprobacion.png)

Verification that the deleted product is not found in getById query:
![Verification getById](./capturas/false.png)

## Point 6: Non-existent ID and invalid data cases
Response when entering a negative price (400 Bad Request):
![Invalid data](./capturas/400.png)

Response when searching for a non-existent ID (200 Status due to special rule):
![Non-existent ID](./capturas/200.png)
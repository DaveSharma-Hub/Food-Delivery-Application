docker run \
  --name deliverDB \
  -p 5432:5432 \
  -e POSTGRES_PASSWORD=summer1winter\
  -e POSTGRES_USER=mainuser  \
  -e POSTGRES_DB=database \
  -v ~/data:/var/lib/postgresql/data \
  -d \
  postgres
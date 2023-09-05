docker run \
  -it --rm \
  --link deliverDB:postgres \
  postgres \
  psql \
  -h postgres \ 
  -U mainuser \
  database
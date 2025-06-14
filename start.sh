#!/bin/bash

echo "------ DEBUT DU BUILD------"
docker build -t backend ./backend
echo "------FIN DE BUILD"
echo "-------DEBUT DU RUN--------"
docker compose up backend -d
echo "------FIN DU RUN ---------"
sleep 15
echo "-------TEST DU REVERSE PROXY"
curl -X POST http://localhost:8081/items \
  -H "Content-Type: application/json" \
  -d '{"name": "name", "value": "value"}'

docker tag backend localhost:50000/backend
echo "----------STOCKAGE DE L'IMAGE-----"
docker push localhost:50000/backend
echo "FIN DU SCRIPT"

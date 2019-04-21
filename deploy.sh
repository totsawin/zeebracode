docker build -t totsawin/zebracode-client:latest -t totsawin/zebracode-client:$SHA -f ./client/Dockerfile ./client
docker build -t totsawin/zebracode-server:latest -t totsawin/zebracode-server:$SHA -f ./server/Dockerfile ./server

docker push totsawin/zebracode-client:latest
docker push totsawin/zebracode-server:latest

docker push totsawin/zebracode-client:$SHA
docker push totsawin/zebracode-server:$SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=totsawin/zebracode-server:$SHA
kubectl set image deployments/client-deployment client=totsawin/zebracode-client:$SHA
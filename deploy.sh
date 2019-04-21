docker build -t totsawin/multi-client:latest -t totsawin/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t totsawin/multi-server:latest -t totsawin/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t totsawin/multi-worker:latest -t totsawin/multi-worker:$SHA -f ./worker/Dockerfile ./worker

docker push totsawin/multi-client:latest
docker push totsawin/multi-server:latest
docker push totsawin/multi-worker:latest

docker push totsawin/multi-client:$SHA
docker push totsawin/multi-server:$SHA
docker push totsawin/multi-worker:$SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=totsawin/multi-server:$SHA
kubectl set image deployments/client-deployment client=totsawin/multi-client:$SHA
kubectl set image deployments/worker-deployment worker=totsawin/multi-worker:$SHA
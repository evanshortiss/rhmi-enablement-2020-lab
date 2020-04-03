QUAY_USER=${QUAY_USER:-evanshortiss}
TAG=${TAG:-latest}

docker tag rhmi-enablement-2020-lab-nodejs-backend quay.io/$QUAY_USER/rhmi-enablement-2020-lab-nodejs-backend:$TAG
docker push quay.io/$QUAY_USER/rhmi-enablement-2020-lab-nodejs-backend:$TAG

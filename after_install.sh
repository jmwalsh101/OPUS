cd /home/ubuntu/client
echo "in directory"
echo nodejs -v
echo npm -v
npm i
npm install --save react react-dom react-scripts react-particles-js
echo "react installed"
npm install
echo "npm installed"
cd .. 
cd server
npm install

cd ..
npm install pm2 -g
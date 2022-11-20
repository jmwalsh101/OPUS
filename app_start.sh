cd /home/ubuntu/client
npm run remote-test
pm2 start --name "covidapp"
pm2 startup
pm2 save
pm2 restart all
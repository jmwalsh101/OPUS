cd /home/ec2-user/client
npm start
pm2 start npm --name "opus" -- start
pm2 startup
pm2 save
pm2 restart all
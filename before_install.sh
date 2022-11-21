cd /home/ubuntu/nodejs
sudo apt-get remove nodejs
sudo apt-get remove npm

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
chmod +x ~/.nvm/nvm.sh
source ~/.bashrc 

nvm install 17
# apt sources & keys
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
source /etc/lsb-release && echo "deb http://download.rethinkdb.com/apt $DISTRIB_CODENAME main" | sudo tee /etc/apt/sources.list.d/rethinkdb.list
wget --no-check-certificate -qO- https://download.rethinkdb.com/apt/pubkey.gpg | sudo apt-key add -

# update software list
sudo apt-get update

# install software
sudo apt-get install -y nodejs
sudo apt-get install -y rethinkdb

# smartflow symlink
sudo ln -sf /vagrant /var/rethinkdb-migration

# configure rethinkdb
sudo cp /var/rethinkdb-migration/scripts/vagrant/rethinkdb.conf /etc/rethinkdb/instances.d/instance1.conf
sudo service rethinkdb restart

# environment variables
sudo echo "QT_QPA_PLATFORM=offscreen" >> /etc/environment
sudo timedatectl set-timezone Europe/Warsaw

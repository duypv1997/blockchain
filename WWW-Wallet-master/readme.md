# WWW_wallet

### Pre-requisites
- yum
- MySQL 5.7.22
- PHP7 with extenstions: `mbstring`, `dom`
- Apache
- Composer
- make
- libpng-dev
- Node JS
- supervisor
- git

### 1. Update yum
```
sudo yum update
```

### 2. Install mysql
- Install mysql
```
wget http://repo.mysql.com/mysql-community-release-el7-5.noarch.rpm
sudo rpm -ivh mysql-community-release-el7-5.noarch.rpm
```
Check available version
```
yum repolist all | grep mysql
```
If latest version is 5.6
```
sudo yum-config-manager --disable mysql56-community
sudo yum-config-manager --enable mysql57-community-dmr
yum -y install mysql-server
```

Config MySQL server

```
DB_CONNECTION=mysql
DB_PORT=3306
DB_DATABASE=wbc_wallet
DB_USERNAME=root
DB_PASSWORD=1
```
- Start mysql server
```
service mysqld start
sudo systemctl start mysqld
```
- Change some mysql default setting to make it more secure. Please answer YES to any question and change the mysql root password as you wish(1)
```
mysql_secure_installation
````
- Create wbc_wallet database and user
```
mysql -u root -p
```
- When prompted, please enter the root password you set in the previous step(1) then enter the following queries:
```
create database wbc_wallet;
```


### 3. Install php7.2
`https://www.cyberciti.biz/faq/how-to-install-php-7-2-on-centos-7-rhel-7/`
``` 
sudo yum install epel-release
rpm -Uvh https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm

sudo yum install yum-utils
sudo yum-config-manager --enable remi-php72
sudo yum update
sudo yum install php72 php7.2-mbstring php7.2-xml
```

### 4. Install apache
```
yum -y install httpd
service httpd start
```

### 5. Install composer
```
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php --filename=composer --install-dir=/usr/local/bin
php -r "unlink('composer-setup.php');"
```
### 6. Install git

```
sudo yum install git
```

### 7. clone the project from git to your home folder
```
cd ~
https://github.com/admin-bitkoex/WWW-Wallet.git
```

### 8. Change owner and permission
```
sudo chown -R apache:apache ~/WWW-Wallet/storage
sudo chown -R apache:apache ~/WWW-Wallet/bootstrap/cache
sudo chmod -R +w ~/WWW-Wallet/storage
sudo chmod -R +w ~/WWW-Wallet/bootstrap/cache
```

### 9. Deploy to target folder
`rsync -a ~/WWW-Wallet/ /var/www/WWW-Wallet`

### 10. Install `make`

`https://stackoverflow.com/a/3523405/4165443`
```
yum groupinstall "Development Tools"
```
or
```
yum install gcc gcc-c++ kernel-devel
```

##11. Go to deployed folder and config production environment
```
$ make init-app
$ make link-storage
```

- edit .env to your settings
```
vim .env
```

- edit that file to something like this
```
APP_NAME=WWW-Wallet
APP_ENV=production
APP_KEY=generated in above step, don't edit this line
APP_DEBUG=false
APP_LOG_LEVEL=info
APP_URL=

LOG_CHANNEL=daily

DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=wbc_wallet
DB_USERNAME=root
DB_PASSWORD=1

BROADCAST_DRIVER=log
CACHE_DRIVER=file
SESSION_DRIVER=file
SESSION_LIFETIME=120
QUEUE_DRIVER=sync

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_DRIVER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_FROM_NAME="Wynbow Wallet"
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_ENCRYPTION=tls

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1

MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

MIX_ETH_NETWORK=rinkeby
MIX_ETH_SYMBOL=eth

```

- Use your mail to config `MAIL_USERNAME` and `MAIL_PASSWORD`
(Example: 
`MAIL_USERNAME`=`admin.wallet@gmail.com`
`MAIL_PASSWORD`=`abcd1234`
)

### 12. Migrate database
`php artisan migrate`

### 13. Seed database 
- Notice: seeding should be done only once when deploy the first time only
```
php artisan db:seed
```

### 14. Setup apache virtual host
`vim /etc/httpd/conf.d/wallet.conf`
- copy and paste the following content
```
    <VirtualHost *:80>
        ServerName www.wallet.com
        ServerAlias wallet.com
        DocumentRoot /var/www/WWW-Wallet/public
        ErrorLog /var/www/WWW-Wallet/storage/logs/error.log
        CustomLog /var/www/WWW-Wallet/storage/logs/requests.log combined
        <Directory /var/www/WWW-Wallet/public>
            Options FollowSymlinks
            AllowOverride All
            Allow from all
        </Directory>
    </VirtualHost>
```
- open up port
```
iptables -F
iptables -A INPUT -i lo -j ACCEPT
iptables -A INPUT -p tcp -m tcp --dport 80 -j ACCEPT
```
### 15. Test the apache config
`apachectl configtest`
### 16. Restart apache
`apachectl restart`
### 17. Install nodejs
`sudo yum install nodejs npm --enablerepo=epel`
### 18. Install forever
`npm install forever -g`
### 19. Install nvm
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
source ~/.bash_profile
nvm install 6.9.0
nvm use 6.9.0
nvm alias default 6.9.0
```
### 20. Install supervisor
`https://gist.github.com/tanksuzuki/cbef7abfa70888895534`
```
yum install epel-release
yum install supervisor
```

### 21. Config supervisor
`https://laravel.com/docs/5.6/queues#supervisor-configuration`
- Create file /etc/supervisord.conf
- vim /etc/supervisord.conf
- edit supervisor like this
```
[program:www-wallet-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/WWW-Wallet/artisan queue:work --daemon --tries=10 --queue=default
autostart=true
autorestart=true
user=apache
numprocs=1
redirect_stderr=true
stdout_logfile=/var/www/WWW-Wallet/storage/logs/worker.log
```

### 22. Run supervisor
```
sudo supervisorctl reread

sudo supervisorctl update

sudo supervisorctl start www-wallet-worker:*
```

### 23. Install pm2 package:
```
npm install -g pm2
```

### 24. Run crawlers:
Local/Staging
```
pm2 start crawlers-rinkeby.json
```

Production
```
pm2 start crawlers-mainnet.json
```

### 25. Run production configuration
```
npm run prod
```

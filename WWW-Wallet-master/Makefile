ifndef u
u:=sotatek
endif

ifndef env
env:=dev
endif

start:
	php artisan serve --port=8001

init-app:
	cp .env.example .env
	composer install
	rm -rf node_modules
	rm -f package-lock.json
	npm install
	php artisan key:generate
	php artisan migrate
	php artisan db:seed

init-db-full:
	make autoload
	php artisan migrate:fresh --seed

link-storage:
	php artisan storage:link

log:
	tail -f "./storage/logs/$(shell ls ./storage/logs/ | sed 's/\([0-9]\+\).*/\1/g' | sort -n | tail -1)"

deploy:
	ssh $(u)@$(h) "mkdir -p $(dir)"
	rsync -avhzL --delete \
				--no-perms --no-owner --no-group \
				--exclude .git \
				--exclude .idea \
				--exclude echo.json \
				--exclude .env \
				--exclude laravel-echo-server.json \
				--exclude node_modules \
				--exclude /vendor \
				--exclude bootstrap/cache \
				--exclude storage/logs \
				--exclude storage/framework \
				--exclude storage/app \
				--exclude public/storage \
				. $(u)@$(h):$(dir)/

deploy-dev:
	make deploy h=192.168.1.20$(n) dir=/var/www/wbc_wallet
	ssh $(u)@192.168.1.20$(n) "cd /var/www/wbc_wallet && make cache"

deploy-prod:
	NODE_ENV=production MIX_ETH_NETWORK=mainnet npm run prod
	make deploy u=ec2-user h=13.125.194.27 dir=/var/www/wbc_wallet
	ssh ec2-user@13.125.194.27 "cd /var/www/wbc_wallet && make cache"

deploy-crawler:
	make deploy u=ec2-user h=13.209.43.243 dir=/home/ec2-user/wbc_wallet

watch:
	npm run watch

autoload:
	composer dump-autoload

cache:
	php artisan cache:clear && php artisan view:clear && npm cache clean --force

docker-cache:
	make cache

init-modules:
	npm install

route-list:
	php artisan route:list

refresh-db:
	php artisan migrate:fresh --seed

seed:
	php artisan db:seed --class=$(c)
migrate:
	php artisan migrate
php-artisan:
	# Ex: make php-artisan cmd='db:seed --class=RolePermissionsTableSeeder'
	php artisan $(cmd)
create-table:
	# Ex: make create-alter n=create_users_table t=users
	php artisan make:migration $(n) --create=$(t)
create-model:
	# Ex: make create-model n=Test
	# Result: app/Models/Test.php
	#         database/migrations/2018_01_05_102531_create_tests_table.php
	php artisan make:model Models/$(n) -m
create-alter:
	# Ex: make create-alter n=add_votes_to_users_table t=users
	php artisan make:migration $(n) --table=$(t)

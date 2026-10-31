CONTADOR DE RECIBIDA — TÉCNICA EN FARMACIA HOSPITALARIA

Agregá junto a index.html:
imagen1.jpg = bebé / Inicio
imagen2.jpg = Soñando grande
imagen3.jpg = Casi Técnica en Farmacia Hospitalaria
musica.mp3 = música

Fecha: 17/11/2026 a las 16:00 (Argentina UTC-3).

Ubuntu 22.04 + Nginx:
sudo apt update
sudo apt install nginx -y
sudo mkdir -p /var/www/recibida
Subí los archivos a /var/www/recibida/

sudo nano /etc/nginx/sites-available/recibida

server {
    listen 80;
    server_name _;
    root /var/www/recibida;
    index index.html;
    location / { try_files $uri $uri/ =404; }
}

sudo ln -s /etc/nginx/sites-available/recibida /etc/nginx/sites-enabled/recibida
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

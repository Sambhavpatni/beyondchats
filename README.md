
# BeyondChats Technical Assignment

## Overview
Full-stack system using Laravel, NodeJS, ReactJS and LLMs.

## Setup
Backend:
composer install
php artisan migrate
php artisan scrape:beyondchats
php artisan serve

Node:
npm install
node index.js

Frontend:
npm install
npm start

## Architecture
Scraper → DB → LLM → DB → React UI

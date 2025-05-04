# 1. 使用輕量 Node.js 18
FROM node:18-alpine

# 2. 設定工作目錄
WORKDIR /usr/src/app

# 3. 複製並安裝（沒有 express，不會安裝額外套件）
COPY package.json package-lock.json ./
RUN npm ci --only=production

# 4. 複製所有專案檔案
COPY . .

# 5. 對外開放 3000 埠
EXPOSE 3000

# 6. 啟動指令
CMD ["npm", "start"]

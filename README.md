<h1 align="center">
  短網址產生器 ShortenURL
</h1>

![image](https://github.com/user-attachments/assets/d36ea5d3-2736-4421-bc9a-d476f0e5cf5e)

## 簡介

這是一個簡單快速的短網址生成器，能夠幫助用戶將長網址縮短，不僅提高了可讀性，也更方便使用和分享。

用戶只需輸入長網址，系統就會生成一個獨特的短網址，並提供一鍵複製的功能。

除了生成短網址之外，網站也提供了獲取頁面資訊的功能，讓用戶能夠查看原始網址的基本資訊（標題、描述）。

## 功能說明

#### 1. 生成短網址：
+ 用戶輸入長網址後，系統將自動生成一個唯一的短網址，方便用戶分享和使用。
+ 用戶也可以自定義輸入短網址，提升靈活性。
+ 提供一鍵複製功能，讓用戶輕鬆獲取短網址。
+ 用戶可根據需要自行決定是否啟用該短網址。
  
![image](https://github.com/user-attachments/assets/0b18a5e7-e413-4c9a-8d23-75f4df7c1ae8)
![image](https://github.com/user-attachments/assets/70d13aaa-3c66-4481-aa9b-46882ca41086)


#### 2. 獲取頁面資訊：
+ 提供了獲取頁面資訊的功能，夠查看原始網址的基本資訊(標題、描述)

![image](https://github.com/user-attachments/assets/888c8650-92a6-4e25-a9b9-e14964d3266a)


#### 3. 簡單的用戶介面：
+ 界面設計直觀易用，確保用戶能快速完成操作，無需繁瑣的步驟。
+ 提供清楚的提示信息，給予用戶明瞭的互動回饋。
+ 適配各種設備，包括桌面電腦、平板和手機，確保在所有屏幕上都能提供良好的可用性和互動體驗。

![image](https://github.com/user-attachments/assets/96450719-7ac3-43cd-a879-bb8a853ef632)


## 安裝環境

1. `git clone https://github.com/Ellen9543/Py_ShortenURL.git`(將專案複製到本地)
2. `cd Py_ShortenURL`(進入專案目錄)
3. `poetry install`(安裝 Poetry 相關套件)
4. `npm install`(安裝 npm 相關套件)
5. 建立`.env`(設定環境變數)

## 執行環境

- `npm run dev`
- `python manage.py runserver`

## 技術使用

- 前端：SweetAlert2、daisyUI、TailwindCSS、Alpine.js
- 後端：Python、Django
- 資料庫：PostgreSQL
- 版本控制：Git
- 部署：zeabur

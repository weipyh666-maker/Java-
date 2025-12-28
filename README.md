<h1>项目说明</h1>
<h2>一、项目简介</h2>

外卖自取程序是一个基于 React + TypeScript + Vite 构建的前端项目，主要用于外卖/配送类应用的界面展示与交互。项目采用组件化与页面化结构，包含地址管理、订单流程、支付方式、地图模式等功能页面，适合二次开发与功能扩展。

<h2>二、技术栈</h2>

前端框架：React 19

开发语言：TypeScript

构建工具：Vite 6

图标库：lucide-react

<img width="444" height="625" alt="image" src="https://github.com/user-attachments/assets/0600941f-feab-4f10-9211-7264df72502e" />

<h2>四、环境要求</h2>

在运行项目前，请确保本地已安装以下环境：

Node.js ≥ 18（推荐使用 LTS 版本）

npm ≥ 9

可通过以下命令检查：

<img width="1121" height="220" alt="image" src="https://github.com/user-attachments/assets/217bbade-8c94-4e43-a990-3ee2e1fbce3f" />


<h2>五、项目依赖说明</h2>
<img width="1045" height="379" alt="image" src="https://github.com/user-attachments/assets/cd0b7fc1-7847-46d5-b9fa-8e0e1fef63c3" />

<img width="1261" height="464" alt="image" src="https://github.com/user-attachments/assets/5ea263d5-c29b-4609-904b-e134c9f973f9" />

<h2>六、安装与运行</h2>
1. 安装依赖
在项目根目录下执行：

<img width="1177" height="180" alt="image" src="https://github.com/user-attachments/assets/6562bc0b-2445-49b8-ade6-084c78fa7e61" />


2. 启动开发环境
<img width="1344" height="99" alt="image" src="https://github.com/user-attachments/assets/25b1a712-f411-49fb-8035-2984a2a1ec5e" />



启动成功后，终端会显示本地访问地址，例如：

<img width="1344" height="99" alt="image" src="https://github.com/user-attachments/assets/b7374a2a-2ea1-4596-b89e-b17e378d74b0" />



在浏览器中打开即可预览项目。

3. 构建生产环境代码
<img width="1344" height="99" alt="image" src="https://github.com/user-attachments/assets/77014b12-b218-4795-b6dd-5f17452fcb63" />



构建完成后，会在 dist/ 目录生成生产环境文件。

4. 本地预览生产环境
<img width="1344" height="99" alt="image" src="https://github.com/user-attachments/assets/920a29eb-3d92-4e8b-be9d-c3be74f4b388" />



用于模拟生产环境效果。

<h2>七、环境变量说明</h2>

项目支持通过 .env.local 文件配置本地环境变量，例如：

<img width="1344" height="174" alt="image" src="https://github.com/user-attachments/assets/b64378ad-f998-4321-ac3f-9a4baaa1312c" />


<h2>八、开发说明</h2>

页面级功能统一放在 pages/ 目录

可复用组件建议放在 components/

全局类型统一维护在 types.ts

全局常量放在 constants.ts

路由与页面切换逻辑可在 App.tsx 中扩展

<h2>九、适用场景</h2>

外卖 / 同城配送前端项目

React + Vite + TS 学习示例


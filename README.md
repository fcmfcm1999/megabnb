# Megabnb领水脚本

本脚本用于批量调用 [mbscan.io](https://mbscan.io) 的 Airdrop 接口，为多个钱包地址领取测试代币。支持通过 SOCKS 代理进行请求。

## 🧾 地址文件格式

地址文件位于 `data/addresses.txt`，每一行为一个地址和代理，用英文逗号分隔. 代理可以不填。如需代理购买，可以选择: [iproyal](https://iproyal.cn/?r=382579) 或者 [proxy6](https://proxy6.net/e/607638)

## 使用方法

1. 克隆代码 
```bash
git clone https://github.com/fcmfcm1999/megabnb.git
```

2. 进入项目
``` bash
cd megabnb
```

3. 安装依赖
```
npm install
```
4. 填写配置文件
5. 运行脚本
```bash
node src/index.js
5. ```
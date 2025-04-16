const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { SocksProxyAgent } = require('socks-proxy-agent');

/**
 * 查询 Airdrop 信息
 * @param {string} address - 钱包地址
 * @param {string} proxy - 代理
 * @returns {Promise<any>}
 */
async function claimFaucet(address, proxy) {
    const url = 'https://mbscan.io/airdrop'
    let httpsAgent;
    if (proxy) {
        httpsAgent = new SocksProxyAgent(`socks://${proxy}`);
    }
    const headers = {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9,zh;q=0.8,zh-HK;q=0.7,zh-CN;q=0.6,zh-TW;q=0.5',
        'content-type': 'application/json',
        'dnt': '1',
        'origin': 'https://www.megabnb.world',
        'priority': 'u=1, i',
        'referer': 'https://www.megabnb.world/',
        'sec-ch-ua': '"Chromium";v="135", "Not-A.Brand";v="8"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
    };

    const data = {
        address: address
    };

    try {
        const response = await axios.post(url, data, {headers, httpsAgent});
        return response.data;
    } catch (error) {
        console.error('领取测试代币失败:', error.response?.data || error.message);
        throw error;
    }
}

async function main() {
    const filePath = path.resolve(__dirname, '../data/addresses.txt');

    const content = fs.readFileSync(filePath, 'utf-8');

    const addresses = content
        .split(/\r?\n/)
        .map(line => line.split(',')[0])
    const proxies = content
        .split(/\r?\n/)
        .map(line => line.split(',')[1])

    for (let i = 0; i < addresses.length; i++) {
        const address = addresses[i]
        for (let j = 0; j < 10; j++) {
            const res = await claimFaucet(address, proxies[i])
            if (res.success) {
                console.log(`${address}领取测试代币成功 | 交易哈希: ${res.tx_hash}`);
            } else {
                console.log(`${address}领取测试代币失败`)
            }
        }
    }
}

main()
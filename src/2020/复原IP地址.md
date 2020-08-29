### [复原IP地址](https://leetcode-cn.com/problems/restore-ip-addresses/)

给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。

有效的 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。

例如："0.1.2.201" 和 "192.168.1.1" 是 有效的 IP 地址，但是 "0.011.255.245"、"192.168.1.312" 和 "192.168@1.1" 是 无效的 IP 地址。

示例1：
```html
输入：s = "25525511135"
输出：["255.255.11.135","255.255.111.35"]
```
示例2：
```html
输入：s = "010010"
输出：["0.10.0.10","0.100.1.0"]
```

#### 回溯算法
```javascript
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
  if (s.length < 4) return []
  var res = []
  const dp = (str, self) => {
    // 长度为4
    if(self.length === 4) {
      // 全部选择完，去重
      if (!str && !res.includes(self.join('.'))) {
        res.push(self.join('.'))
      }
      return
    }
    // 每一项ip地址是1到3位
    for (let k = 1; k < 3; k++) {
      const ip = str.substr(0, k)
      // 合法的ip
      if (!ip || /^0\d+/.test(ip) || ip > 255) {
        continue
      }
      const another = str.substr(k)
      self.push(ip)
      dp(another, self)
      self.pop()
    }
  }
  dp(s, [])
  return res
};
```

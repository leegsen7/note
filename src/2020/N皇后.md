### N皇后

n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击（皇后的攻击范围是同一行、同一列、其对角线）。

给定一个整数 n，返回所有不同的 n 皇后问题的解决方案。

每一种解法包含一个明确的 n 皇后问题的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

示例：
```html
输入: 4
输出: [
 [".Q..",  // 解法 1
  "...Q",
  "Q...",
  "..Q."],

 ["..Q.",  // 解法 2
  "Q...",
  "...Q",
  ".Q.."]
]
```

#### 回溯算法
```javascript
/**
 * 回溯算法之n皇后问题
 * @param n
 */
var solveNQueens = function (n) {
  if (n === 1) {
    return [['Q']]
  }
  if (n < 3) {
    return []
  }
  const res = []
  // 初始化n*n的二维数组棋盘，注意引用对象问题
  const emptyBoard = Array(n).fill(1).map(() => Array(n).fill('.'))
  // 判断第row行，第col列是否能放置皇后
  const isValid = function (board, row, col) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] === 'Q') {
          // 同一行同一列不能放置
          if (row === i || col === j) {
            return false
          }
          // 自身两条45度斜线不能放置
          if (Math.abs(row - i) === Math.abs(col - j)) {
            return false
          }
        }
      }
    }
    return true
  }
  const backtrack = function (board, row) {
    if (row === n) {
      res.push(board.map(item => item.join('')))
      return
    }
    for (let col = 0; col < n; col++) {
      if (!isValid(board, row, col)) {
        continue
      }
      // 做选择，放置皇后
      board[row][col] = 'Q'
      // 进入下一个决策
      backtrack(board, row + 1)
      // 撤销选择
      board[row][col] = '.'
    }
  }
  backtrack(emptyBoard, 0)
  return res
}
```

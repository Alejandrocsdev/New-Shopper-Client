// 當前的請求處理狀態
let isProcessing = null

// 任務列隊
const queue = []

export const promiseQueue = promise => {
  return new Promise((resolve, reject) => {
    // 將請求推入列隊中
    queue.push({ promise, resolve, reject })

    // 處理完, 處理下一個
    if (!isProcessing) {
      executeNext()
    }
  })
}

const executeNext = () => {
  // 如列隊無任務, 停止執行
  if (queue.length === 0) return

  // 返回第一順位任務並將其刪除
  const { promise, resolve, reject } = queue.shift()

  isProcessing = promise()
    .then(result => {
      resolve(result)
    })
    .catch(error => {
      reject(error)
    })
    .finally(() => {
      // 無論成功失敗, 顯示[無處理中]狀態, 執行下一個任務
      isProcessing = null
      executeNext()
    })
}

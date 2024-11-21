// 函式庫 (library)
import { useState, useEffect, useRef } from 'react'

const useCountdown = (initialCount, onFinish, options = { once: true }) => {
  const { once } = options
  const [count, setCount] = useState(initialCount)
  const [isCounting, setIsCounting] = useState(false)
  // 歸零觸發函式(只觸發1次: 未觸發)
  const isFinished = useRef(false)

  useEffect(() => {
    let timer
    // 倒數中
    if (isCounting && count > 0) {
      timer = setInterval(() => {
        setCount(prevCount => prevCount - 1)
      }, 1000)
    }
    // 歸零
    else if (count === 0) {
      if (onFinish && once && !isFinished.current) {
        // 只觸發1次
        isFinished.current = true
        onFinish()
      } else if (onFinish && !once) {
        // 歸零就觸發
        onFinish()
      }
      setIsCounting(false)
    }

    return () => clearInterval(timer)
  }, [isCounting, count])

  // 倒數開始
  const startCountdown = () => {
    setCount(initialCount)
    setIsCounting(true)
    isFinished.current = false
  }

  // 倒數暫停
  // const stopCountdown = () => {
  //   setIsCounting(false)
  // }

  // 倒數重置
  // const resetCountdown = () => {
  //   setCount(initialCount)
  //   setIsCounting(false)
  //   isFinished.current = false
  // }

  return {
    count,
    isCounting,
    startCountdown
    // stopCountdown,
    // resetCountdown
  }
}

export default useCountdown

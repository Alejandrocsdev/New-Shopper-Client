function useLocalStorage() {
  const getValue = key => {
    return localStorage.getItem(key)
  }

  const setValue = (key, value) => {
    if (value === null) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, value)
    }
  }

  return { getValue, setValue }
}

export default useLocalStorage

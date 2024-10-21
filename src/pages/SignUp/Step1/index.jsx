// 自訂函式 (custom function)
import { useAuthStep } from '../../../context/AuthStepContext'

function Step1() {
  const { user } = useAuthStep()
  console.log('This is Step 1 from Sign Up flow')
  console.log('user', user)
  return <div>This is Step 1 from Sign Up flow</div>
}

export default Step1

import {useUser,UserButton} from '@clerk/clerk-react'
import AddExpense from './components/AddExpense.jsx'
import ExpenseTable from './components/ExpenseTable.jsx'
import { useState,useEffect } from 'react'
import ExpenseChart from './components/ExpenseChart.jsx'

function App() {
  const {user} = useUser()
  const [triggerRerender,setTriggerRerender] = useState(0)
  const [expenseData,setExpenseData] = useState([])

  useEffect(() => {
    async function fetchData() {
        try {
            const response = await fetch(`http://localhost:8080/api/expenses/${user.id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setExpenseData(data);
        } catch (error) {
            console.error('Cannot fetch data:', error);
        }
    }

    fetchData();
}, [triggerRerender]);

console.log(expenseData)

  function rerender(){
    setTriggerRerender(prev=>prev+1)
  }
  return (
    <>
    <div className='nav'>
    <div className='title'>Track<span className='title-span'>It.</span></div>
    <UserButton className='user-button'/>
    </div>
      
      <div className='welcome-text'>Welcome {user.firstName},here are your Expenses</div>
      <div className='add-data-chart'>
         <AddExpense rerender={rerender} triggerRerender={triggerRerender}/>
          <ExpenseChart expenseData={expenseData}/>
      </div>
      <ExpenseTable expenseData={expenseData} rerender={rerender} triggerRerender={triggerRerender}/>
    </>
  )
}

export default App

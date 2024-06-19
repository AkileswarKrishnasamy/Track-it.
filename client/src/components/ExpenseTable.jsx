import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js'
import {Line} from 'react-chartjs-2'


ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

export default function ExpenseTable({expenseData,rerender,triggerRerender}){
    // const [expenseData,setExpenseData] = useState([])
    const {user} = useUser()


    
    console.log(expenseData)
    async function deleteExpense(id){
        const response = await fetch(`http://localhost:8080/api/delete/${id}`,{
            method:'DELETE'
        })
        rerender()
    }
    let total=0
    const expenseElements = expenseData.map(expense=>{
        total=total+Number(expense.amount)

        return(
            <tr key={expense._id}>
                <td>{expense.name}</td>
                <td>{expense.amount}</td>
                <td>{expense.method}</td>
                <td>
                    <div className="edit-delete">
                        <div><Link  className='edit-button' to={`/edit/${expense._id}`}>Edit</Link></div>
                        <div className="delete-button" onClick={(e)=>deleteExpense(expense._id)}>Delete</div>
                    </div>
                </td>
            </tr>
        )
    })

    return(
        
        <div>
            <div className="total-expense">Total Expense : {total}</div>
            <table>
                <thead>
                    <tr>
                        <td>Expense Title</td>
                        <td>Expense Amount</td>
                        <td>Payment Method</td>
                        <td>Edit/Delete Expense</td>
                    </tr>
                </thead>
                <tbody>
                    {expenseElements}
                </tbody>
            </table>
        </div>
    )
}
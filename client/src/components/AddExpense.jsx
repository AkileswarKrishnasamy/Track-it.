import { useState } from "react"
import { useUser } from "@clerk/clerk-react"

export default function AddExpense(props){

    const {user} = useUser()
    const [formData,setFormData] = useState({
        userId:user.id,
        name:"",
        amount:"",
        method:""
    })


    async function submitForm(e){
        e.preventDefault()
        await fetch('http://localhost:8080/api/create',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(formData)
        })
        setFormData({
            userId:user.id,
            name:"",
            amount:"",
            method:""
        })

        props.rerender()
    }

    function handleChange(e){
        const {name,value} = e.target
        setFormData(prev=>({
            ...prev,
            [name]:value
    }))
    }

     function deleteAllExpenses(){
        console.log('clicked')
         fetch(`http://localhost:8080/api/reset/${user.id}`,
            {
                method:'DELETE'
            }
         )
         props.rerender()
    }
    
    return(
        <>
            <div>
            <form onSubmit={(e)=>submitForm(e)} className="expense-form">
                    <h3 className="add-expense-title">Add your new Expenses</h3>
                    <div className="label-input">
                        <label htmlFor="name">Title:</label>
                        <input 
                            className="input title-input"
                            placeholder="Title"
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={(e)=>handleChange(e)}
                            required autoComplete="off"/>
                    </div>
                <div className="label-input">
                    <label htmlFor="amount">Amount:</label>
                    <input 
                        className="input amount-input"
                        placeholder="Amount"
                        name="amount"
                        id="amount"
                        type="number"
                        value={formData.amount}
                        onChange={(e)=>handleChange(e)}
                        required autoComplete="off"/>
                </div>

                    <div className="label-input">
                        <label htmlFor="method">Payment Method:</label>
                        <input 
                            className="input payment-input"
                            placeholder="Payment Method"
                            name="method"
                            type="text"
                            id="method"
                            value={formData.method}
                            onChange={(e)=>handleChange(e)}
                            required autoComplete="off"/>
                    </div>
                <div>
                    <button type="submit" className="submit-expense">Add Expense</button>
                </div>  
            </form>
            <button className='delete-expense' onClick={deleteAllExpenses}>Delete All Expenses</button>
            </div>
        </>
    )
}


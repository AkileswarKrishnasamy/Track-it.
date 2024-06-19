import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export default function EditExpense(){



    const [formData,setFormData] = useState({
        name:"",
        amount:"",
        method:""
    })
    
    const navigate = useNavigate()
    const params = useParams()
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:8080/api/expenses/one/${params.id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.error('Cannot fetch data:', error);
            }
        }
    
        fetchData();
    }, [params.id]);
    async function updateChanges(e){
        e.preventDefault()
        await fetch(`http://localhost:8080/api/update/${params.id}`,
            {
                method:'PUT',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(formData)
            }
        )
        navigate('/')
    }
    
    
    
    function handleChange(e){
        const {name,value} = e.target
        setFormData(prev=>({
            ...prev,
            [name]:value
    }))
    }
    
    return(
        <>
            <form onSubmit={(e)=>updateChanges(e)} className="update-form">
                <h3>Update your Expense</h3>
                    <div className="label-input">
                        <label htmlFor="name">Title:</label>
                        <input
                            className="input" 
                            placeholder="Title"
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={(e)=>handleChange(e)}
                            required/>
                    </div>
                <div className="label-input">
                    <label htmlFor="amount">Amount:</label>
                    <input
                        className="input" 
                        placeholder="Amount"
                        name="amount"
                        id="amount"
                        type="number"
                        value={formData.amount}
                        onChange={(e)=>handleChange(e)}
                        required/>
                </div>
    
                    <div className="label-input">
                        <label htmlFor="method">Payment Method:</label>
                        <input
                            className="input" 
                            placeholder="Title"
                            name="method"
                            type="text"
                            id="method"
                            value={formData.method}
                            onChange={(e)=>handleChange(e)}
                            required/>
                    </div>
                <div>
                    <button className='submit-expense'type="submit">Update Expense</button>
                </div>
            </form>
        </>
    )
}




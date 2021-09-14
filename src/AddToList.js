import { useState } from 'react'

const AddToList = ({ onAdd }) => {
  const [fname, setFName] = useState('')
  const [lname, setLName] = useState('')
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (!fname) {
      alert('Please add your name')
      return
    }

    onAdd({ fname, lname, age, weight })
    setFName('')
    setLName('')
    setAge('')
    setWeight('')
  }

  return (
    <form className="myform" onSubmit={onSubmit}>
        <p><input type="text" placeholder="First Name" required onChange={(e) => setFName(e.target.value)}/></p>
        <p><input type="text" placeholder="Last Name" required onChange={(e) => setLName(e.target.value)}/></p>
        <p><input type="radio" name="gender"/> Male
        <input type="radio" name="gender"/> Female</p>
        <p><input type="text" placeholder="Age" required onChange={(e) => setAge(e.target.value)}/></p>
        <p><input type="text" placeholder="Weight" required onChange={(e) => setWeight(e.target.value)}/></p>
        <p>Have you been diagnosed by COVID-19 ?</p>
        <p><input type="radio" name="ques"/> Yes
        <input type="radio" name="ques"/> No</p>
        <p><input type="submit" value="Submit"/></p>
    </form>
  )
}

export default AddToList;
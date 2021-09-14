import AddToList from './AddToList';
import { useState, useEffect } from 'react'
import Lists from './Lists';
import Header from './Header';

const App = () => {
  const [showAddList, setShowAddList] = useState(false)
  const [lists, setLists] = useState([])

  useEffect(() => {
    const getLists = async () => {
      const listsFromServer = await fetchLists()
      setLists(listsFromServer)
    }

    getLists()
  }, [])

  // Fetch lists
  const fetchLists = async () => {
    const res = await fetch('http://localhost:5000/lists')
    const data = await res.json()

    return data
  }

  // Fetch list
  const fetchList = async (id) => {
    const res = await fetch(`http://localhost:5000/lists/${id}`)
    const data = await res.json()

    return data
  }

  // Add list
  const addToList = async (list) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(list),
    })

    const data = await res.json()

    setLists([...lists, data])

  }

  // Delete list
  const deleteList = async (id) => {
    const res = await fetch(`http://localhost:5000/lists/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setLists(lists.filter((list) => list.id !== id))
      : alert('Error Deleting This List')
  }

  return (
      <div className='container'>
         <Header
          onAdd={() => setShowAddList(!showAddList)}
          showAdd={showAddList}
        />
            <>
              {showAddList && <AddToList onAdd={addToList} />}
              {lists.length > 0 ? (
                <Lists
                  lists={lists}
                  onDelete={deleteList}
                />
              ) : (
                'No List To Show'
              )}
            </>
      </div>
  )
}
export default App;

const {useEffect, useState} = React

function Table(props) {
    const [table,setTable] = useState([])

    function FetchTable() {
        fetch("/table?channel=800178161664786473")
        .then(data=>data.json())
        .then(data=>{
            setTable(data)
        })
        setTimeout(FetchTable, 60000)
    }

    useEffect(()=>{
        FetchTable()
    }, [])

    return <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Sins</th>
            </tr>
        </thead>

        <tbody>
            {table.map(t=>{
                return <tr>
                    <td>{t.name}</td>
                    <td>{t.count}</td>
                </tr>
            })}
        </tbody>
    </table>
}

function App() {
    let [count, setCount] = useState(0)
    let [player, setPlayer] = useState()

    function FetchNumber() {
        fetch("/count?channel=800178161664786473")
        .then(data=>data.json())
        .then(json=>{
            setCount(json.count)
            setPlayer(json.player)
        })
        setTimeout(FetchNumber, 5000)
    }

    useEffect(()=>{
        FetchNumber()
    },[])

    return <div>
        <h1>Counting Channel</h1>
        <h4>Live Update</h4>
        <h2>{count}</h2>
        <i>{player}</i>
        <h3>Wall of Shame</h3>
        <Table/>
        <div><i>Powered by CountBot</i></div>
    </div>
}

ReactDOM.render(<App/>, document.querySelector("#App"))
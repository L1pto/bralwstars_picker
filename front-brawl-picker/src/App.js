import React from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Profile from "./components/Profile";
import MapTierList from "./components/MapTierList";
import BrawlTierList from "./components/BrawlTierList";

function App () {

    const [tag, setTag] = React.useState({
        ent_tag: ''
    })

    const [show_tag, setShow_tag] = React.useState(false)

    const [data, setData] = React.useState(JSON.parse(localStorage.getItem("data_tag")) || {
        data: ''
    })

    //const [best_try, setBest_try] = React.useState(JSON.parse(localStorage.getItem("data_tag")) || {data: ''})


    // if (roll_count<best_try) {
    //     localStorage.setItem("data_tag", JSON.stringify(roll_count))
    // }

    function Keep_tag (event) {
        const {name, value} = event.target
        setTag(prev => {
            return{
                ...prev,
                [name]: value
            }
        })
    }

    const API_URL = 'http://127.0.0.1:8000/api/'

    //Отпрака тега на backend
    function sendToBack() {
        axios({
            method: 'post',
            url: API_URL,
            data: tag,
        })
            //.then(res => console.log(res))
            .then(res => setData(res))
            .catch(err => console.error(err))
        setShow_tag(prev => !prev)
        //console.log(show_tag)
        //localStorage.setItem("data_tag", JSON.stringify(data))
        //console.log(data.data[0])
    }

    React.useEffect ( () => {
        localStorage.setItem("data_tag", JSON.stringify(data))
        //localStorage.clear()
    }, [data])



    //Сбор данных с сервера backend
    // React.useEffect( () => {
    //     async function getFromBAck() {
    //         await axios({
    //             method: 'get',
    //             url: API_URL
    //         })
    //             .then(res => setData(res))
    //             .catch(err => console.error(err))
    //     }
    //     getFromBAck()
    //     console.log(data.data[0])
    //     localStorage.setItem("data_tag", JSON.stringify(data))
    //     console.log("state_from_back:", data)
    // }, [])

    return(
        <div>
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            name={"ent_tag"}
                            value={tag.ent_tag}
                            handleChange={Keep_tag}
                            handleClick={sendToBack}
                            //data={data.data[0]}
                        />}
                />
                <Route
                    path="/Profile"
                    element={<Profile data={data.data[0]} />}
                />
                <Route
                    path="/BrawlTierList"
                    element={<BrawlTierList/>}
                />
                <Route
                    path="/MapTierList"
                    element={<MapTierList/>}
                />
            </Routes>
        </div>
    )
}

 export default App
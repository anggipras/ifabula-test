import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import sha256 from "crypto-js/sha256";
import moment from 'moment';
import { Container, Nav, Navbar } from 'react-bootstrap';

function App() {
  const [userData, setuserData] = useState([
    {
      name: null,
      age: null,
      address: null
    }
  ])
  const [jsonPost, setjsonPost] = useState([
    {
      userId: null,
      id: null,
      title: null,
      body: null
    }
  ])
  const [deletedUserid, setdeletedUserid] = useState(false)
  const [login, setlogin] = useState(false)
  const [username, setusername] = useState(null)
  const [password, setpassword] = useState(null)

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("login_data"))) {
      setlogin(true)
    }

    let initialUserData = [ //Soal Interview Nomor 1
      {
        name: "anggi",
        age: 28,
        address: "bekasi"
      },
      {
        name: "bernardus",
        age: 27,
        address: "tangerang"
      },
      {
        name: "prastianto",
        age: 26,
        address: "depok"
      }
    ]
    setuserData(initialUserData)

    axios.get(`http://jsonplaceholder.typicode.com/posts`) //Soal Interview Nomor 3
    .then((res) => {
      console.log(res.data)

      //Soal Interview Nomor 4
      let getTenData = res.data.filter((val, ind) => ind < 10)
      setjsonPost(getTenData)
    })
    .catch(err => console.log(err))
  }, [])

  const changeUserData = () => { //Soal Interview Nomor 2
    setuserData([
      {
        name: "ajit",
        age: 32,
        address: "bekasi"
      },
      {
        name: "ajat",
        age: 31,
        address: "tangerang"
      },
      {
        name: "ajot",
        age: 30,
        address: "depok"
      }
    ])
  }

  const listTable = () => { //Soal Interview Nomor 4
    return jsonPost.map(val => {
      return (
        <tr>
            <td hidden={deletedUserid ? true : false} style={{border: "1px solid #dddddd", textAlign: "left", padding: "8px"}}>{val.userId}</td>
            <td style={{border: "1px solid #dddddd", textAlign: "left", padding: "8px"}}>{val.id}</td>
            <td style={{border: "1px solid #dddddd", textAlign: "left", padding: "8px"}}>{val.title}</td>
            <td style={{border: "1px solid #dddddd", textAlign: "left", padding: "8px"}}>{val.body}</td>
        </tr>
      )
    })
  }

  const onDeleteData = () => { //Soal Interview Nomor 5
    let removedData = [...jsonPost]
    removedData.pop()
    setjsonPost(removedData)
  }

  const onDeleteObjProp = () => { //Soal Interview Nomor 6
    let removedData = [...jsonPost]
    removedData.forEach((v) => delete v.userId)
    setdeletedUserid(true)
    setjsonPost(removedData)
  }

  const onHashingString = () => { //Soal Interview Nomor 7
    let hashedString = sha256(moment(new Date()).format("DDMMYYYY") + "bernardus" + "pria" + "ifabula")
    console.log(hashedString);
  }

  const logToHome = () => { //Soal Interview Nomor 9
    localStorage.setItem("login_data", JSON.stringify({ username, password }))
    setlogin(true)
  }

  const loginForm = () => { //Soal Interview Nomor 9
    if (login) {
      return <></>
    } 
    return (
      <form style={{backgroundColor: 'gainsboro', padding: '50px', width: '40vw'}}>
            <h3>Login</h3>
            <div className="mb-3">
                <label>Username</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter username"
                    onChange={(e) => setusername(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={(e) => setpassword(e.target.value)}
                />
            </div>
            <div className="d-grid">
                <button onClick={() => logToHome()} type="button" className="btn btn-primary">
                    Login
                </button>
            </div>
        </form>
    )
  }

  const onLogout = () => { //Soal Interview Nomor 9
    localStorage.removeItem("login_data")
    setlogin(false)
  }

  const navBar = () => { //Soal Interview Nomor 9
    if (!login) {
      return <></>
    } 
    let nameOfUser = JSON.parse(localStorage.getItem("login_data"))
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{width: "100%"}}>
        <Container>
        <Navbar.Brand href="#home">{`Selamat Datang, ` + nameOfUser.username}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features"></Nav.Link>
            <Nav.Link href="#pricing"></Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link eventKey={2} onClick={() => onLogout()}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }

  const onGetDataFromAPI = () => {
    let options = {
      method: "get",
      url: "http://localhost:5000/user",
      headers: { //Soal Interview Nomor 11
        "userid": "ifabulas",
        "scope": "user",
      }
    };

    axios(options)
    .then(res => console.log(res.data))
    .catch(err => console.log(err.response.data))
  }

  const onSubmitDataToAPI = () => {
    let nameOfUser = JSON.parse(localStorage.getItem("login_data"))
    let options = {
      method: "post",
      url: "http://localhost:5000/postuser",
      headers: { //Soal Interview Nomor 11
        "userid": "ifabula",
        "scope": "user",
      },
      data: { username: nameOfUser.username, password: nameOfUser.password }
    };

    axios(options)
    .then(res => console.log(res.data))
    .catch(err => console.log(err.response.data))
  }

  return (
    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
      {navBar()}

      {
        login?
        <>
          <div className='mb-5'>
            {
              userData.map((val) => {
                return (
                  <div className='mb-2'>
                    <div>{val.name}</div>
                    <div>{val.age}</div>
                    <div>{val.address}</div>
                  </div>
                )
              })
            }
    
            <button onClick={() => changeUserData()}>Ubah Data</button>
          </div>
    
          <div>
            <table style={{borderCollapse: "collapse"}}>
              <tr>
                <th hidden={deletedUserid ? true : false} style={{border: "1px solid #dddddd", textAlign: "left", padding: "8px"}}>Userid</th>
                <th style={{border: "1px solid #dddddd", textAlign: "left", padding: "8px"}}>Id</th>
                <th style={{border: "1px solid #dddddd", textAlign: "left", padding: "8px"}}>Title</th>
                <th style={{border: "1px solid #dddddd", textAlign: "left", padding: "8px"}}>Body</th>
              </tr>
              
              {listTable()}
            </table>
            <button onClick={() => onDeleteData()}>Delete Data</button>
            <button onClick={() => onDeleteObjProp()}>Delete Prop Object</button>
          </div>
    
          <button className='mt-3 mb-3' onClick={() => onHashingString()}>Hash String</button>
          <button className='mt-3 mb-3' onClick={() => onGetDataFromAPI()}>Get Data</button>
          <button className='mt-3 mb-3' onClick={() => onSubmitDataToAPI()}>Submit Data</button>
        </>:null
      }

      {loginForm()}
    </div>
  );
}

export default App;

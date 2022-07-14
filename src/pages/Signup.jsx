import { InputLabel, MenuItem, Select } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { db, realtimeDatabase } from '../firebase';
import { ref, set } from 'firebase/database';

const Signup = () => {
  const [data, setdata] = useState({});
  const [dropdown, setdropdown] = useState('simple');
  const [disableBtn, setdisableBtn] = useState(false);
  const [myGoodRefferal, setmyGoodRefferal] = useState();
  const [myGoodId, setmyGoodId] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  //   Keep distance due to corona
  console.log(location.search);
  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setdata({ ...data, [id]: value, category: dropdown });
  };

  const SubmitToDb = async (e) => {
    e.preventDefault();
    try {
      const reference = ref(realtimeDatabase, 'users/' + data.username);

      set(reference, data);

      navigate('/');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
  console.log(data);

  useEffect(() => {
    const run = () => {
      if (location.search) {
        const loc = location.search;
        const newStr = loc.split('&')[0];
        const newId = loc.split('&')[1];
        const userIdplitted = newId.split('=')[1];
        setmyGoodId(userIdplitted);
        setdata({ ...data, refferedby: userIdplitted ? userIdplitted : null });
        const usernameSplitted = newStr.split('=')[1];
        setmyGoodRefferal(usernameSplitted);
      }
    };
    run();
  }, []);

  console.log(data);
  return (
    <div className="flex items-center  justify-center h-screen bg-slate-200  backdrop-blur-sm">
      <div className="p-4 rounded-md shadow-md  ">
        <form className="flex flex-col gap-5 p-2" onSubmit={SubmitToDb}>
          <div>
            <input
              className="rounded-md bg-transparent border-2 border-black outline-none p-2"
              type="username"
              id="username"
              required
              placeholder="Username"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className="rounded-md bg-transparent border-2 border-black outline-none p-2"
              type="email"
              id="email"
              required
              placeholder="Email Address"
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              className="rounded-md bg-transparent border-2 border-black outline-none p-2"
              type="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className="rounded-md bg-transparent border-2 border-black outline-none p-2"
              type="text"
              id="refferedby"
              value={myGoodRefferal ? myGoodRefferal : ''}
              placeholder="Reffered by"
              disabled
            />
          </div>
          <div>
            {' '}
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={dropdown}
              label="Category"
              className="w-full"
              onChange={(e) => {
                setdata({ ...data, category: e.target.value });
                setdropdown(e.target.value);
              }}
            >
              <MenuItem value="simple">Please select category</MenuItem>
              <MenuItem value="singer">Singer</MenuItem>
              <MenuItem value="artist">Artist</MenuItem>
            </Select>
          </div>

          <div className="flex flex-col items-center gap-2 justify-center ">
            <button className="rounded-xl p-1 w-full">Tutorial</button>
            <button
              type="submit"
              disabled={disableBtn ? true : false}
              className={` rounded-xl p-1 w-full ${
                disableBtn ? 'cursor-not-allowed bg-red-600' : 'cursor-pointer'
              }`}
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

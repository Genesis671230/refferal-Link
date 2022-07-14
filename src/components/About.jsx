import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db, realtimeDatabase } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, set, onValue } from 'firebase/database';
import { MenuItem, Select } from '@mui/material';

const About = () => {
  const [data, setdata] = useState([]);
  const [generateLink, setgenerateLink] = useState(false);
  const [getRefCount, setgetRefCount] = useState();
  const querryData = async () => {
    const arr = [];

    const reference = ref(realtimeDatabase, 'users/');
    onValue(reference, (snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.val();
        const obj = data;
        arr.push(obj);
      });
    });

    setdata(arr);
  };

  useEffect(() => {
    querryData();
  }, []);

  return (
    <div name="about" className="w-full my-32">
      <div className="max-w-[1240px] mx-auto">
        <div className="text-center">
          <h2 className="text-5xl font-bold">
            Trusted by developers across the world
          </h2>
          <div>
            <button
              onClick={() => setgenerateLink((prev) => !prev)}
              className="p-2 mt-20 mb-10"
            >
              Generate Links
            </button>
          </div>

          <div className="md:grid hidden grid-cols-2 content-center  group overflow-auto gap-8 ">
            {data?.map((item, index) => (
              <div
                key={index}
                className="rounded-lg content-center bg-[#bd4183c9]   flex flex-col gap-5 items-center justify-evenly p-10  border-2 border-black m-2 shadow-lg"
              >
                <div>
                  <img
                    src={
                      item.userProfile
                        ? item.userProfile
                        : 'https://source.unsplash.com/random/?boy'
                    }
                    className="w-32 h-32 rounded-full hover:scale-105 overflow-hidden transition-transform duration-300 object-cover"
                    alt=""
                  />
                </div>
                <div
                  key={index}
                  className="text-black p-2 text-lg font-bold font-mono "
                >
                  {item.userName}
                </div>
                {generateLink && (
                  <a
                    href={`/signup?user=${item.emailAddress}&ref=${item.userID}`}
                    target="_blank"
                  >
                    <div className="border p-2 bg-purple-400 rounded-xl shadow-xl">
                      {`/signup?user=${item.emailAddress}&ref=${item.userID}`}{' '}
                    </div>
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="md:hidden grid-cols-2 content-center  group overflow-auto gap-8 ">
            {data?.map((item, index) => (
              <a
                href={`/signup?user=${item.emailAddress}&ref=${item.userID}`}
                target="_blank"
              >
                <div
                  key={index}
                  className="rounded-lg content-center bg-[#bd4183c9]   flex flex-col gap-5 items-center justify-evenly p-10  border-2 border-black m-2 shadow-lg"
                >
                  <div>
                    <img
                      src={
                        item.userProfile
                          ? item.userProfile
                          : 'https://source.unsplash.com/random/?boy'
                      }
                      className="w-32 h-32 rounded-full hover:scale-105 overflow-hidden transition-transform duration-300 object-cover"
                      alt=""
                    />
                  </div>
                  <div
                    key={index}
                    className="text-black p-2 text-lg font-bold font-mono "
                  >
                    {item.userName}
                  </div>
                  <div
                    key={index}
                    className="text-black p-2 text-lg font-bold font-mono "
                  >
                    {item.emailAddress}
                  </div>
                </div>
              </a>
            ))}
          </div>
          <p className="text-3xl py-6 text-gray-500">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque
            asperiores earum placeat veritatis dignissimos itaque.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-1 px-2 text-center">
          <div className="border py-8 rounded-xl shadow-xl">
            <p className="text-6xl font-bold text-indigo-600">100%</p>
            <p className="text-gray-400 mt-2">Completion</p>
          </div>
          <div className="border py-8 rounded-xl shadow-xl">
            <p className="text-6xl font-bold text-indigo-600">24/7</p>
            <p className="text-gray-400 mt-2">Delivery</p>
          </div>
          <div className="border py-8 rounded-xl shadow-xl">
            <p className="text-6xl font-bold text-indigo-600">100K</p>
            <p className="text-gray-400 mt-2">Transactions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

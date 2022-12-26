import React, { useState, useEffect } from "react";
import { Content, Layer } from "./TableContentStyle";
import { PostType } from "../../../type/userPost";
import authAxios from "../../../axios/authAxios";
import axios from "axios";
import { Link } from "react-router-dom";

const MyPageTable: React.FC = () => {
  const [data, setData] = useState<PostType[]>([]);
  const [status, setStatus] = useState(true);
  // const selectRef = useRef<HTMLSelectElement>(null);

  //const baseUrl = "34.64.156.80:3003";

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchData = await authAxios.get(`/api/main/mypage/posts`);
        console.log(data);
        setData(fetchData.data);
      } catch (err: unknown) {
        console.error(err);
      }
    };

    getData();
  }, [data]);
  //console.log(data);
  const handleChangeValue = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    const value = e.target.value;
    console.log(value);
    const boolean = value === "모집중" ? true : false;
    console.log(boolean);

    // try {
    //   await authAxios
    //     .put("http://localhost:4000/postUserInfo", { status: boolean })
    //     .then((res) => res.data);
    // } catch (err: unknown) {
    //   console.log(err);
    // }

    // const upDateData = {
    //   status: value === "모집중" ? setStatus(status) : setStatus(!status),
    // };

    // const putData = async () => {
    //   const fetchData = await axios.put("http://localhost:4000/postUserInfo", {
    //     status: value === "모집중" ? setStatus(status) : setStatus(!status),
    //   });

    //   setData(fetchData.data[0]);
    // };
    // putData();
  };

  return (
    <>
      <Content>
        <Layer>
          <table>
            <thead>
              <tr id="first">
                <th>제목</th>
                <th>지역</th>
                <th>여행기간</th>
                <th>상태</th>
              </tr>
            </thead>

            <tbody>
              {data &&
                data.map((item) => {
                  return (
                    <tr key={item?.postId}>
                      <td id="title">
                        <Link to={`/mypage/mycontents/${item.postId}`}>
                          {item?.title}
                        </Link>
                      </td>
                      <td>{item?.region}</td>
                      <td>
                        {item?.duration[0]} ~ {item?.duration[1]}
                      </td>
                      <td id="last">
                        <select onChange={handleChangeValue}>
                          <option value="모집중">모집중</option>
                          <option value="모집마감">모집마감</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
        </Layer>
      </Content>
    </>
  );
};

export default MyPageTable;

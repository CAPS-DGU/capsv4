import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function WikiRecent() {

  const [recentModify, setRecentModify] = useState([]);

  useEffect(() => {
    const fetchRecentModify = async () => {
      try {
        const res = await axios.get("/api/wiki/recent");
        setRecentModify(res.data.data);
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchRecentModify();
  }, []);


  return (
    <div className="flex flex-wrap justify-center gap-1.5 mt-0 max-w-lg mx-auto">
      {recentModify.length > 0 ? (
        recentModify.map((wiki) => (
          <Link
            key={wiki.title}
            to={`/wiki/${wiki.title}`}
            className="bg-[#a7e9fb] px-[15px] py-[6px] m-[2px_4px] rounded-[20px] text-base"
          >
            {wiki.title}
          </Link>
        ))
      ) : (
        <p>최근 수정된 인물이 없습니다.</p>
      )}
    </div>

  )
}

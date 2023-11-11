import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";

let colors: string[] = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-pink-500",
  "bg-green-500",
  "bg-violet-500",
  "bg-fuchsia-600",
  "bg-purple-800",
  "bg-emerald-500",
  "bg-rose-500",
];

interface Songs {
  title: string;
  videoId: string;
  duration: string;
  artists: string;
  thumbnails: string;
}

function LeaderboardCard() {
  const [data, setdata] = useState([] as any);

  useEffect(() => {
    fetchDetails();
  }, [data]);

  const fetchDetails = async () => {
    const url = "https://ytmusic-tau.vercel.app/?search=faded";
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      setdata(result.songs);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Reorder.Group as="table" axis="y" values={data} onReorder={setdata}>
      <thead>
        <tr className="flex justify-between mx-5 mr-6">
          <td className="font-semibold text-xl font-poppins">Rank</td>
          <td className="font-semibold text-xl font-poppins">Team name</td>
          <td className="font-semibold text-xl font-poppins">Score</td>
        </tr>
      </thead>
      {data.map((e: Songs, index: number) => (
        <Reorder.Item
          as="tr"
          value={e}
          key={e.videoId}
          className={`${
            colors[index % 10]
          } w-[500px] rounded-full flex my-5`}
        >
          <td className="w-24 h-20 flex justify-center items-center">
            {index === 0 && (
              <div className="w-12 h-12 mx-5 rounded-[50%] flex justify-center items-center text-2xl font-bold">
                <img
                  className="scale-125"
                  src="https://png.pngtree.com/png-vector/20220731/ourmid/pngtree-gold-medal-1st-place-award-icon-png-image_6093703.png"
                  alt="first"
                />
              </div>
            )}
            {index === 1 && (
              <div className="w-12 h-12 mx-5 rounded-[50%] flex justify-center items-center text-2xl font-bold">
                <img
                  className="scale-125"
                  src="https://png.pngtree.com/png-vector/20220731/ourmid/pngtree-silver-medal-2nd-place-award-icon-png-image_6093704.png"
                  alt="second"
                />
              </div>
            )}
            {index === 2 && (
              <div className="w-12 h-12 mx-5 rounded-[50%] flex justify-center items-center text-2xl font-bold">
                <img
                  className="scale-125"
                  src="https://png.pngtree.com/png-vector/20220731/ourmid/pngtree-3rd-place-bronze-medal-award-icon-png-image_6093735.png"
                  alt="third"
                />
              </div>
            )}
            {index != 0 && index != 1 && index != 2 && (
              <div className="w-12 h-12 mx-5 rounded-[50%] flex justify-center items-center text-2xl font-bold">
                {/* <img
                  className="scale-125 rounded-full"
                  src={e.thumbnails}
                  alt="third"
                /> */}
                {index+1}
              </div>
            )}
          </td>
          <td className="flex justify-between items-center w-full">
            <div className="flex flex-col text-left">
              <span className="font-bold text-xl">{e.title}</span>
              <span className="font-semibold text-lg">{e.artists}</span>
            </div>
          </td>
          <td className="flex items-center mx-10 text-2xl font-bold">
            {(index + 1) * 10}
          </td>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}

export default LeaderboardCard;

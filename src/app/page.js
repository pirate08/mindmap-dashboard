import CollapsibleTree from "./components/layout/CollapsibleTree";
import { data } from "./components/Data2";

export default function Home() {
  return (
    <main className="h-screen w-full flex p-10 md:p-24 justify-center items-center bg-gradient-to-b from-violet-700 to-fuchsia-900 text-white">
      <div>
        {/* <Diagram /> */}
        <CollapsibleTree data={data} />
      </div>
     </main>
  );
}

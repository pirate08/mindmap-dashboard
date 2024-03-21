'use client';

import { useState } from 'react';
import CollapsibleTree from "@/components/layout/CollapsibleTree";
import { data } from "@/components/Data2";
import NodeManager from "@/components/layout/NodeManager";


export default function Home() {
  const [treeData, setTreeData] = useState(data);

  const handleNodeManagerSubmit = (newData) => {
    setTreeData(newData);
  };

  return (
    <main className="h-full w-full flex p-10 md:p-24 justify-center items-center bg-gradient-to-b from-violet-700 to-fuchsia-900 text-white">
      <div>
        <CollapsibleTree data={treeData} />
        <div className="mt-10">
          <NodeManager data={treeData} setData={setTreeData} onSubmit={handleNodeManagerSubmit} />
        </div>
      </div>
    </main>
  );
}


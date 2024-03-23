'use client';

import { useState } from 'react';

const NodeManager = ({ data, setData, onSubmit }) => {
  const [nodeNameToAdd, setNodeNameToAdd] = useState('');
  const [parentNodeToAdd, setParentNodeToAdd] = useState('');
  const [nodeNameToDelete, setNodeNameToDelete] = useState('');
  const [parentNodeToDelete, setParentNodeToDelete] = useState('');

  // {--function to handle for finding parent node..--}
  const findParentNode = (parentNodeName, node) => {
    if (node.name === parentNodeName) {
      return node;
    } else if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        const result = findParentNode(parentNodeName, node.children[i]);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  // {--function to handle add node..--}
  const handleAddNode = () => {
    const newData = { ...data };
    const parentNodeObj = findParentNode(parentNodeToAdd, newData);
    if (parentNodeObj) {
      parentNodeObj.children.push({ name: nodeNameToAdd, children: [] });
      setData(newData);
      onSubmit(newData);
      setNodeNameToAdd('');
      setParentNodeToAdd('');
    } else {
      console.error('Parent node not found.');
    }
  };

  // {--function to handle delete node..--}
  const handleDeleteNode = () => {
    const newData = { ...data };
    const parentNodeObj = findParentNode(parentNodeToDelete, newData);
    if (parentNodeObj) {
      parentNodeObj.children = parentNodeObj.children.filter(
        (child) => child.name !== nodeNameToDelete
      );
      setData(newData);
      onSubmit(newData);
      setNodeNameToDelete('');
      setParentNodeToDelete('');
    } else {
      console.error('Parent node not found.');
    }
  };

  return (
    <div className='bg-transparent px-6 py-4 rounded-lg flex flex-col md:flex-row md:flex-wrap md:justify-center'>
      {/* --Design of the form..-- */}
      <div className='w-full md:w-auto md:mr-6'>
        <div>
          <h2 className='text-center text-xl mb-4 border-b'>Add Node</h2>
        </div>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <label>
            Node Name:
            <input
              type='text'
              value={nodeNameToAdd}
              className='text-black ml-0 md:ml-3 px-2 rounded-md py-1 mb-2 md:mb-0'
              placeholder='Enter Node Name...'
              onChange={(e) => setNodeNameToAdd(e.target.value)}
            />
          </label>
          <label>
            Parent Node:
            <input
              type='text'
              value={parentNodeToAdd}
              placeholder='Enter Parent Node...'
              className='text-black ml-0 md:ml-3 px-2 rounded-md py-1 mb-2 md:mb-0'
              onChange={(e) => setParentNodeToAdd(e.target.value)}
            />
          </label>
        </div>
        <div className='flex justify-center md:justify-end mt-4'>
          <button
            onClick={handleAddNode}
            className='bg-green-800 px-3 py-1 hover:bg-green-700 duration-200 cursor-pointer rounded-md'>
            Add Node
          </button>
        </div>
      </div>

      <div className='w-full md:w-auto mt-4 md:mt-0'>
        <div>
          <h2 className='text-center text-xl mb-4 border-b'>Delete Node</h2>
        </div>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <label>
            Node Name:
            <input
              type='text'
              value={nodeNameToDelete}
              className='text-black ml-0 md:ml-3 px-2 rounded-md py-1 mb-2 md:mb-0'
              placeholder='Enter Node Name...'
              onChange={(e) => setNodeNameToDelete(e.target.value)}
            />
          </label>
          <label>
            Parent Node:
            <input
              type='text'
              value={parentNodeToDelete}
              className='text-black ml-0 md:ml-3 px-2 rounded-md py-1 mb-2 md:mb-0'
              placeholder='Enter Parent Node...'
              onChange={(e) => setParentNodeToDelete(e.target.value)}
            />
          </label>
        </div>
        <div className='flex justify-center md:justify-end mt-4'>
          <button
            onClick={handleDeleteNode}
            className='bg-red-800 px-3 py-1 hover:bg-red-700 duration-200 cursor-pointer rounded-md'>
            Delete Node
          </button>
        </div>
      </div>
    </div>
  );
};

export default NodeManager;

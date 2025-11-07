import React from 'react';
import Head from 'next/head';
import KanbanBoard from '../../components/kanban/KanbanBoard';

export default function Index({ loadedUser }) {
  return (
    <>
      <Head>
        <title>AuthScape | Kanban Board</title>
      </Head>

      <KanbanBoard />
    </>
  );
}

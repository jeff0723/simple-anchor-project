import dynamic from 'next/dynamic';
const EntryPoint = dynamic(() => import('../App'), {
  ssr: false,
});

function App() {
  return <EntryPoint />;
}

export default App;

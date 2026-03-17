import SearchBar from './SearchBar.jsx';

export default function Nav( props ) {
  return (
    <>
        <SearchBar onSearch={props.onSearch} />
    </>
  )
}

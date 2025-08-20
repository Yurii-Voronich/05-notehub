import css from "./SearchBox.module.css";
interface SearchBoxProps {
  query: string;
  setQuery: (value: string) => void;
}

function SearchBox({ query, setQuery }: SearchBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(event.target.value);

  return (
    <input
      defaultValue={query}
      onChange={handleChange}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}

export default SearchBox;

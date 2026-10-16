export function SearchBar({
  handleSubmit,
  setCityName,
  cityName,
}: {
  handleSubmit: (e: { preventDefault: () => void }) => void;
  setCityName: (value: string) => void;
  cityName: string;
}) {
  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        type="text"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        placeholder="Enter City Name"
      />
      <button type="submit">Search</button>
    </form>
  );
}

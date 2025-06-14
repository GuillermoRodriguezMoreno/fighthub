import { UseGetFightingMatchingQuery } from "@/hooks/fighting-matching/use-get-fighting-matching-query";

export function Example() {
  const query = UseGetFightingMatchingQuery(1);

  if (query.isLoading) {
    return <div>Loading...</div>;
  }
  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }
  if (!query.data) {
    return <div>No data found</div>;
  }

  return (
    <>
      {query.data.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>Rank: {item.name}</p>
          <p>Style: {item.score}</p>
        </div>
      ))}
    </>
  );
}

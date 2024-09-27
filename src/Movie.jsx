// Movie.js
export default function Movie({ title, overview }) {
  return (
    <li>
      <h2>{title}</h2>
      <p>{overview}</p>
    </li>
  );
}

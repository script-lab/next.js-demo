import Link from "next/link";


const Index = ({ data }) => {
  return (
    <div>
      <h1>POST一覧</h1>
      <ul>
        {data.map((post) => {
          return (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}>
                <a>{post.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}


export default Index


export async function getStaticProps() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await res.json();

  return {
    props: { data },
    revalidate: 1
  };
}
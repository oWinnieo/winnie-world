import Home from './home/page'
// export async function getServerSideProps(context) {
//   const { req } = context;
//   const protocol = req.headers['x-forwarded-proto'] || req.connection.encrypted ? 'https' : 'http';

//   return {
//     props: {
//       protocol,
//     },
//   };
// }
// import { useSession, signIn, signOut } from "next-auth/react";
export default function Wrap() {
  return (
    <Home />
  );
}

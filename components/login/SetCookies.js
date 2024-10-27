// export function setCookie(name, value, days) {
//   let expires = "";
//   if (days) {
//     const date = new Date();
//     date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//     expires = "; expires=" + date.toUTCString();
//   }
//   document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
// }

'use server'
 
import { cookies } from 'next/headers'
export async function setCookie(name, value) {
  const cookieStore = await cookies()
  console.log("see value >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", value)
  cookieStore().set(`${name}`, `${value}`)
  // or
  // cookieStore().set('name', 'lee', { secure: true })
  // // or
  // cookieStore().set({
  //   name: 'name',
  //   value: 'lee',
  //   httpOnly: true,
  //   path: '/',
  // })
}
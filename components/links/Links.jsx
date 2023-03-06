import Link from "next/link";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const links = [
  [
    "all",
    <Link key={"link-1"} href={"/search/[..searchid]"} as={`/search/all`}>
      all
    </Link>,
  ],
  [
    "id",
    <Link key={"link-2"} href={"/search/[..searchid]"} as={`/search/id`}>
      id
    </Link>,
  ],
  [
    "city",
    <Link key={"link-3"} href={"/search/[..searchid]"} as={`/search/city`}>
      city
    </Link>,
  ],
  [
    "state",
    <Link key={"link-4"} href={"/search/[..searchid]"} as={`/search/state`}>
      state
    </Link>,
  ],
  [
    "county",
    <Link key={"link-5"} href={"/search/[..searchid]"} as={`/search/county`}>
      county
    </Link>,
  ],
  [
    "citystate",
    <Link key={"link-6"} href={"/search/[..searchid]"} as={`/search/citystate`}>
      citystate
    </Link>,
  ],
  [
    "name",
    <Link key={"link-7"} href={"/search/[..searchid]"} as={`/search/name`}>
      name
    </Link>,
  ],
];

const adminLinks = [
  [
    "add",
    <Link key={"admin-1"} href={"/admin/[..searchid]"} as={`/admin/add`}>
      add
    </Link>,
  ],
  [
    "replace",
    <Link key={"admin-2"} href={"/admin/[..searchid]"} as={`/admin/replace`}>
      replace
    </Link>,
  ],
  [
    "delete",
    <Link key={"admin-3"} href={"/admin/[..searchid]"} as={`/admin/delete`}>
      delete
    </Link>,
  ],
];

/**
 * Search links for all api routes. Current page is is hidden from the links to prevent nextjs throwing a routing error / look nicer
 */
export default function SearchLinks(props) {
  const handleSignin = (e) => {
    e.preventDefault();
    signIn();
  };

  const handleSignout = (e) => {
    e.preventDefault();
    signOut();
  };

  const { data: session } = useSession();
  return (
    <div>
      {session && (
        <a href="#" onClick={handleSignout} className="btn-signin">
          SIGN OUT
        </a>
      )}
      {/*!session && (
        <a href="#" onClick={handleSignin} className="btn-signin">
          SIGN IN
        </a>
      )*/}

      {session?.isAdmin === true && (
        <>
          <h2>Admin Functions:</h2>
          <p>
            {adminLinks.flatMap((value, index, array) =>
              //If route is the same, don't show link
              value[0] === props.currentVal
                ? null
                : //if it isn't, then add delimiters
                index < array.length - 2 ||
                  (index === array.length - 2 &&
                    props.currentVal !== array[array.length - 1][0]) // check for the last item
                ? [value[1], " | "]
                : value[1]
            )}
          </p>
        </>
      )}

      <h2>Search by:</h2>
      <p>
        {links.flatMap((value, index, array) =>
          //If route is the same, don't show link
          value[0] === props.currentVal
            ? null
            : //if it isn't, then add delimiters
            index < array.length - 2 ||
              (index === array.length - 2 &&
                props.currentVal !== array[array.length - 1][0]) // check for the last item
            ? [value[1], " | "]
            : value[1]
        )}
      </p>
    </div>
  );
}

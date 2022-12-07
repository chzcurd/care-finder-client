import Link from "next/link";
import React from "react";

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

/**
 * Search links for all api routes. Current page is is hidden from the links to prevent nextjs throwing a routing error / look nicer
 */
export default function SearchLinks(props) {
  return (
    <div>
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

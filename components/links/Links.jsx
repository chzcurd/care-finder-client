import Link from "next/link";
import React from "react";


const links = [
  ["all",<Link href={'/search/[..searchid]'} as={`/search/all`}>all</Link>] ,
  ["id",<Link href={'/search/[..searchid]'} as={`/search/id`}>id</Link>],
  ["city",<Link href={'/search/[..searchid]'} as={`/search/city`}>city</Link>],
  ["state",<Link href={'/search/[..searchid]'} as={`/search/state`}>state</Link>],
  ["county",<Link href={'/search/[..searchid]'} as={`/search/county`}>county</Link>],
  ["citystate",<Link href={'/search/[..searchid]'} as={`/search/citystate`}>citystate</Link>],
  ["name",<Link href={'/search/[..searchid]'} as={`/search/name`}>name</Link>]
]


export default function SearchLinks(props) { 
    return (
        <div>
          {props.currentVal}
          <h2>Search by:</h2>
          <p>{links.flatMap(
              (value, index, array) =>
              //If route is the same, don't show link
              value[0] === props.currentVal ? null :
              //if it isn't, then add delimiters
              ((index < array.length - 2) || (index === array.length -2 && props.currentVal !== array[array.length - 1][0]))// check for the last item
              ? [value[1], " | "]
              : value[1],
)}</p>
        </div>
      );
}
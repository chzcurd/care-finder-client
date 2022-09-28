import Link from "next/link";
import React from "react";


export default function SearchLinks() { 
    return (
        <div>
          <h2>Search by:</h2>
          <p><Link href={'/search/[..searchid]'} as={`/search/all`}>all</Link> | <Link href={'/search/[..searchid]'} as={`/search/id`}>id</Link> | <Link href={'/search/[..searchid]'} as={`/search/city`}>city</Link> | <Link href={'/search/[..searchid]'} as={`/search/state`}>state</Link> | <Link href={'/search/[..searchid]'} as={`/search/county`}>county</Link> | <Link href={'/search/[..searchid]'} as={`/search/citystates`}>citystate</Link> | <Link href={'/search/[..searchid]'} as={`/search/name`}>name</Link></p>
        </div>
      );
}
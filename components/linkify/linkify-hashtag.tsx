import Link from "next/link";

import { LinkIt } from "react-linkify-it";

const LinkifyHashtag = ({ children }: ChildrenProp) => {
  return (
    <LinkIt
      regex={/(#[a-zA-Z0-9_]+)/}
      component={(match, key) => (
        <Link
          key={key}
          href={`/hashtag/${match.slice(1)}`}
          className="text-primary hover:underline"
        >
          {match}
        </Link>
      )}
    >
      {children}
    </LinkIt>
  );
};

export default LinkifyHashtag;

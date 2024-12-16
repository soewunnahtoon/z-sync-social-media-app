import LinkifyUsernameWithTooltip from "@/components/linkify/linkify-username-with-tooltip";

import { LinkIt } from "react-linkify-it";

const LinkifyUsername = ({ children }: ChildrenProp) => {
  return (
    <LinkIt
      regex={/(@[a-zA-Z0-9_-]+)/}
      component={(match, key) => (
        <LinkifyUsernameWithTooltip key={key} username={match.slice(1)}>
          {match}
        </LinkifyUsernameWithTooltip>
      )}
    >
      {children}
    </LinkIt>
  );
};
export default LinkifyUsername;

import { LinkItUrl } from "react-linkify-it";

const LinkifyUrl = ({ children }: ChildrenProp) => {
  return (
    <LinkItUrl className="text-primary hover:underline">{children}</LinkItUrl>
  );
};
export default LinkifyUrl;

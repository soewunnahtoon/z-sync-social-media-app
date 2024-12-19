import LinkifyHashtag from "@/components/linkify/LinkifyHashtag";
import LinkifyUrl from "@/components/linkify/LinkifyUrl";
import LinkifyUsername from "@/components/linkify/LinkifyUsername";

const Linkify = ({ children }: ChildrenProp) => {
  return (
    <LinkifyUsername>
      <LinkifyHashtag>
        <LinkifyUrl>{children}</LinkifyUrl>
      </LinkifyHashtag>
    </LinkifyUsername>
  );
};
export default Linkify;

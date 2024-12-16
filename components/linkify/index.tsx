import LinkifyHashtag from "@/components/linkify/linkify-hashtag";
import LinkifyUrl from "@/components/linkify/linkify-url";
import LinkifyUsername from "@/components/linkify/linkify-username";

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

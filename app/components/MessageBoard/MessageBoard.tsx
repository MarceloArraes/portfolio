import { getServerSideProps } from "@/app/lib/sanity";
import { MessageBoardUseQuery } from "./MessageBoardUseQuery";

export const MessageBoard = async () => {
  // const { props } = await getServerSideProps();

  // console.log("props", props);

  return <MessageBoardUseQuery /* initialData={props} */ />;
};

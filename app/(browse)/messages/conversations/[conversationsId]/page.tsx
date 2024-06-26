// import { getConversationById } from "@/data/conversation";
// import getMessages from "@/action/message";
// import EmptyState from "@/components/browse/empty-state";
// import {Header} from "@/components/auth/header";
//
// interface IParams {
//     conversationId: string;
// }
//
// const ChatId = async ({ params }: { params: IParams }) => {
//     const conversation = await getConversationById(params.conversationId);
//     const messages = await getMessages(params.conversationId);
//
//     if (!conversation) {
//         return (
//             <div className="lg:pl-80 h-full">
//                 <div className="h-full flex flex-col">
//                     <EmptyState />
//                 </div>
//             </div>
//         )
//     }
//
//     return (
//         <div className="lg:pl-80 h-full">
//             <div className="h-full flex flex-col">
//                 <Header conversation={conversation} />
//                 <Body initialMessages={messages} />
//                 <Form />
//             </div>
//         </div>
//     );
// }
//
// export default ChatId;
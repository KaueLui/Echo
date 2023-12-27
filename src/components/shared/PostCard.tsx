import { useUserContext } from "@/context/AuthContext";
import { formatDateString } from "@/lib/utils";
import { Models } from "appwrite"
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type PostCardProps = {
    post: Models.Document;
}

const PostCard = ({ post }: PostCardProps) => {
    const { user } = useUserContext();

    if(!post.creator) return;
  return (
    <div className="post-card">
        <div className="flex-between">
            <div className="flex items-center gap-3">
                <Link to={`/profile/${post.creator.$id}`}>
                    <img src={post?.creator?.imageUrl || "/assets/images/profile.png"} alt="profile-image" className="rounded-full w-12 lg:h-12"/>
                </Link>
                <div className="flex flex-col">
                    <p className="base-medium lg:body-bold text-light-1">{post.creator.name}</p>
                    <p className="base-medium lg:body-bold text-light-4">@{post.creator.username}</p>
                
                <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lb:small-regular">{formatDateString(post.$createdAt)}</p>
                    -
                    <p className="subtle-semibold lb:small-regular">
                        {post.location}
                    </p>
                </div>
                </div>
            </div>

            <Link to={`/update-post/${post.$id}`} className={`${user.id !== post.creator.$id && "hidden" }`}>
                <img src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
            </Link>
        </div>

        <Link to={`/post/${post.$id}`}>
            <div className="small-mediam lg:base-medium py-5">
                <p>{post.caption}</p>
                <ul className="flex gap-1 mt-2">
                    {post.tags?.map((tag: string) => (
                        <li className="subtle-semibold lb:small-regular text-light-3" key={tag}>
                            #{tag}
                        </li>
                    ))}
                </ul>
            </div>
            <img src={post.imageUrl || "/assets/icons/profile.png" } alt="image-post" className="post-card_img" />
        </Link>

        <PostStats post={post} userId={user.id} />
    </div>
  )
}

export default PostCard
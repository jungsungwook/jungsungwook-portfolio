import { useRouter } from "next/router";

const BlogIdIndex = () => {
    const router = useRouter();
    const { id } = router.query;
    return (
        <>
            {id}
        </>
    );
};

export default BlogIdIndex;